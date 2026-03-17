// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ''; });
    return obj;
  });
}

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; }
    else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
    else { cur += c; }
  }
  result.push(cur.trim());
  return result;
}

// ─── Load & cache ─────────────────────────────────────────────────────────────
let _cache = null;

export async function loadDataset() {
  if (_cache) return _cache;
  const res = await fetch('/HRDataset_Expanded_v2.csv');
  const text = await res.text();
  const raw = parseCSV(text);

  const employees = raw.map((r, idx) => ({
    index:        idx + 1,
    empId:        r['EmpID'],
    name:         r['Employee_Name']?.replace(/,\s*/, ' ') ?? '',
    position:     r['Position'],
    department:   r['Department']?.trim(),
    sex:          r['Sex']?.trim(),
    salary:       parseInt(r['Salary']) || 0,
    termd:        parseInt(r['Termd']) || 0,
    termReason:   r['TermReason'],
    empStatus:    r['EmploymentStatus'],
    perfScore:    r['PerformanceScore'],
    engagement:   parseFloat(r['EngagementSurvey']) || 0,
    satisfaction: parseInt(r['EmpSatisfaction']) || 0,
    absences:     parseInt(r['Absences']) || 0,
    daysLate:     parseInt(r['DaysLateLast30']) || 0,
    dateOfHire:   r['DateofHire'],
    dateOfTerm:   r['DateofTermination'],
    manager:      r['ManagerName'],
    recruit:      r['RecruitmentSource'],
    marital:      r['MaritalDesc'],
    race:         r['RaceDesc'],
    hispanic:     r['HispanicLatino'],
    specialProj:  parseInt(r['SpecialProjectsCount']) || 0,
  }));

  _cache = employees;
  return employees;
}

// ─── Risk score ───────────────────────────────────────────────────────────────
const PERF_RISK = { 'PIP': 1.0, 'Needs Improvement': 0.7, 'Fully Meets': 0.2, 'Exceeds': 0.0 };

export function computeRisk(emp) {
  const absScore   = emp.absences / 20;                     // 0–1
  const lateScore  = emp.daysLate / 6;                      // 0–1
  const satScore   = (5 - emp.satisfaction) / 4;            // 0–1 (low sat → high risk)
  const engScore   = (5 - emp.engagement)   / 3.9;          // 0–1
  const perfScore  = PERF_RISK[emp.perfScore] ?? 0.3;

  const raw =
    absScore  * 0.28 +
    satScore  * 0.24 +
    engScore  * 0.22 +
    perfScore * 0.16 +
    lateScore * 0.10;

  return Math.min(Math.round(raw * 100), 99);
}

function topFactors(emp) {
  const factors = [
    { name: 'Absences',    score: emp.absences / 20,                  detail: `${emp.absences} absences (avg 6.2)` },
    { name: 'Satisfaction',score: (5 - emp.satisfaction) / 4,         detail: `Satisfaction score ${emp.satisfaction}/5` },
    { name: 'Engagement',  score: (5 - emp.engagement) / 3.9,         detail: `Engagement survey ${emp.engagement.toFixed(1)}/5.0` },
    { name: 'Performance', score: PERF_RISK[emp.perfScore] ?? 0.3,    detail: `Performance: ${emp.perfScore}` },
    { name: 'Days Late',   score: emp.daysLate / 6,                   detail: `${emp.daysLate} days late (last 30d)` },
  ];
  return factors.sort((a, b) => b.score - a.score);
}

export function buildExplanation(emp) {
  const facts = topFactors(emp);
  const [f1, f2] = facts;

  const parts = [`Risk score driven primarily by ${f1.name.toLowerCase()} (${f1.detail}).`];

  if (f2.score > 0.15) parts.push(`Secondary signal: ${f2.name.toLowerCase()} (${f2.detail}).`);

  if (emp.termd) {
    parts.push(`Employee was terminated — reason recorded: "${emp.termReason}".`);
  } else {
    parts.push('Employee is currently active.');
  }

  if (emp.absences > 12) parts.push('Absence count is in the top 10% of the workforce.');
  if (emp.satisfaction <= 2) parts.push('Very low satisfaction score is a strong predictor of voluntary departure.');
  if (emp.perfScore === 'PIP') parts.push('Employee is currently on a Performance Improvement Plan.');
  if (emp.engagement < 2.5) parts.push('Engagement score is below the critical threshold of 2.5.');

  return parts.join(' ');
}

export function buildSolutions(emp) {
  const solutions = [];

  if (emp.absences > 12) {
    solutions.push({ factor: 'Absences', action: 'Schedule a 1-on-1 to identify underlying causes (health, personal circumstances). Consider offering flexible work arrangements or a temporary remote option.' });
  } else if (emp.absences > 8) {
    solutions.push({ factor: 'Absences', action: 'Monitor attendance trend over the next 30 days. Proactively check in with the employee about workload and well-being.' });
  }

  if (emp.satisfaction <= 2) {
    solutions.push({ factor: 'Satisfaction', action: 'Conduct an urgent stay interview to identify pain points. Review role scope, team dynamics, and workload distribution. Prioritize a compensation or benefit adjustment if applicable.' });
  } else if (emp.satisfaction === 3) {
    solutions.push({ factor: 'Satisfaction', action: 'Explore what would increase the employee\'s satisfaction — potential levers include career growth, recognition programs, or role clarity.' });
  }

  if (emp.engagement < 2.5) {
    solutions.push({ factor: 'Engagement', action: 'Assign to a high-visibility cross-team project. Set up a mentorship relationship with a senior leader. Re-evaluate the employee\'s role alignment with their stated career goals.' });
  }

  if (emp.perfScore === 'PIP') {
    solutions.push({ factor: 'Performance', action: 'Escalate to HR for structured support. Define clear, measurable 30/60/90-day milestones. Assign a dedicated coach and schedule bi-weekly check-ins.' });
  } else if (emp.perfScore === 'Needs Improvement') {
    solutions.push({ factor: 'Performance', action: 'Provide targeted coaching and identify skill gaps. Consider a lighter project load with more focused objectives to rebuild confidence and momentum.' });
  }

  if (emp.daysLate > 3) {
    solutions.push({ factor: 'Punctuality', action: 'Have a direct conversation about scheduling expectations. Explore a flexible start-time arrangement if commuting or personal obligations are a factor.' });
  }

  if (solutions.length === 0) {
    solutions.push({ factor: 'Retention', action: 'Risk is currently low. Maintain regular check-ins to keep satisfaction and engagement stable. Consider a proactive recognition moment or a development opportunity to reinforce commitment.' });
  }

  return solutions;
}

// ─── Analytics helpers ────────────────────────────────────────────────────────
function mean(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }

export function computeAnalytics(employees) {
  // Termination rate by department
  const deptMap = {};
  employees.forEach(e => {
    if (!deptMap[e.department]) deptMap[e.department] = { total: 0, termd: 0 };
    deptMap[e.department].total++;
    if (e.termd) deptMap[e.department].termd++;
  });
  const byDept = Object.entries(deptMap)
    .map(([dept, v]) => ({ label: dept, rate: v.termd / v.total, count: v.total, termd: v.termd }))
    .filter(d => d.count >= 10)
    .sort((a, b) => b.rate - a.rate);

  // Termination rate by performance
  const perfMap = {};
  employees.forEach(e => {
    if (!perfMap[e.perfScore]) perfMap[e.perfScore] = { total: 0, termd: 0 };
    perfMap[e.perfScore].total++;
    if (e.termd) perfMap[e.perfScore].termd++;
  });
  const perfOrder = ['PIP', 'Needs Improvement', 'Fully Meets', 'Exceeds'];
  const byPerf = perfOrder.map(p => ({
    label: p, rate: perfMap[p] ? perfMap[p].termd / perfMap[p].total : 0,
    count: perfMap[p]?.total ?? 0,
  }));

  // Termination rate by satisfaction
  const satMap = {};
  employees.forEach(e => {
    if (!satMap[e.satisfaction]) satMap[e.satisfaction] = { total: 0, termd: 0 };
    satMap[e.satisfaction].total++;
    if (e.termd) satMap[e.satisfaction].termd++;
  });
  const bySat = [1,2,3,4,5].map(s => ({
    label: `${s}`, rate: satMap[s] ? satMap[s].termd / satMap[s].total : 0,
    count: satMap[s]?.total ?? 0,
  }));

  // Termination rate by gender
  const sexMap = {};
  employees.forEach(e => {
    const g = e.sex || 'Unknown';
    if (!sexMap[g]) sexMap[g] = { total: 0, termd: 0 };
    sexMap[g].total++;
    if (e.termd) sexMap[g].termd++;
  });
  const bySex = Object.entries(sexMap).map(([g, v]) => ({ label: g, rate: v.termd / v.total, count: v.total }));

  // Key stats
  const terminated = employees.filter(e => e.termd);
  const active     = employees.filter(e => !e.termd);
  const attritionRate   = terminated.length / employees.length;
  const avgAbsTermd     = mean(terminated.map(e => e.absences));
  const avgAbsActive    = mean(active.map(e => e.absences));
  const avgSalTermd     = mean(terminated.map(e => e.salary));
  const avgSalActive    = mean(active.map(e => e.salary));
  const avgEngTermd     = mean(terminated.map(e => e.engagement));
  const avgEngActive    = mean(active.map(e => e.engagement));

  // Feature importance (point-biserial proxy: |mean_termd - mean_active| / overall_std)
  const features = [
    { label: 'Absences',       termd: avgAbsTermd,  active: avgAbsActive,  max: 20 },
    { label: 'Satisfaction',   termd: mean(terminated.map(e => e.satisfaction)), active: mean(active.map(e => e.satisfaction)), max: 5,  invert: true },
    { label: 'Engagement',     termd: avgEngTermd,  active: avgEngActive,  max: 5,  invert: true },
    { label: 'Salary',         termd: avgSalTermd,  active: avgSalActive,  max: 250000, invert: true },
    { label: 'Days Late',      termd: mean(terminated.map(e => e.daysLate)),  active: mean(active.map(e => e.daysLate)),  max: 6 },
    { label: 'Spec. Projects', termd: mean(terminated.map(e => e.specialProj)), active: mean(active.map(e => e.specialProj)), max: 9, invert: true },
  ];
  const featureImportance = features.map(f => {
    const diff = Math.abs(f.termd - f.active) / f.max;
    return { label: f.label, value: diff };
  });
  const maxFI = Math.max(...featureImportance.map(f => f.value));
  featureImportance.forEach(f => { f.normalized = f.value / maxFI; });
  featureImportance.sort((a, b) => b.normalized - a.normalized);

  // Add performance as top feature (it's categorical, already known to be strong)
  const pipRate    = byPerf.find(p => p.label === 'PIP')?.rate ?? 0;
  const excRate    = byPerf.find(p => p.label === 'Exceeds')?.rate ?? 0;
  featureImportance.unshift({ label: 'Performance Score', normalized: Math.min((pipRate - excRate) / 0.6, 1), value: pipRate - excRate });
  featureImportance.sort((a, b) => b.normalized - a.normalized);

  return { byDept, byPerf, bySat, bySex, featureImportance, attritionRate, terminated: terminated.length, total: employees.length, avgAbsTermd, avgAbsActive, avgSalTermd, avgSalActive, avgEngTermd, avgEngActive };
}
