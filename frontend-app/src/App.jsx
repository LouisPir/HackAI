import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { loadDataset, computeRisk, buildExplanation, buildSolutions, computeAnalytics } from './data.js';

// ─── Design tokens ────────────────────────────────────────────────────────────
const S = {
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '420px 1fr',   // 2 columns — no right panel on home
    gridTemplateRows: 'auto 1fr auto',
    minHeight: '100vh',
    borderLeft: '1px solid #d1d5db',
    borderRight: '1px solid #d1d5db',
    margin: '0 24px',
    backgroundImage:
      'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    backgroundPosition: '-1px -1px',
    boxShadow: 'inset 0 0 0 1px #d1d5db',
  },
  header: {
    gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #d1d5db',
    backgroundColor: '#f0f2f5', zIndex: 5, gap: '16px',
  },
  footer: {
    gridColumn: '1 / -1', borderTop: '1px solid #d1d5db', padding: '8px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",
    fontSize: '0.65rem', color: '#64748b', backgroundColor: '#f0f2f5', zIndex: 5,
  },
  brand:        { display: 'flex', alignItems: 'center', gap: '8px' },
  brandLogo:    { backgroundColor: '#0f172a', color: '#fff', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' },
  brandName:    { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem' },
  nav:          { display: 'flex', gap: '4px', alignItems: 'center' },
  navLink:      { fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', padding: '4px 12px', border: '1px solid transparent', color: '#64748b' },
  navLinkActive:{ fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', padding: '4px 12px', border: '1px solid #0f172a', color: '#0f172a', backgroundColor: 'rgba(15,23,42,0.05)' },
  badgeGreen:   { display:'inline-flex',alignItems:'center',gap:'4px',padding:'2px 8px',borderRadius:'4px',fontSize:'0.75rem',fontWeight:600,fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",backgroundColor:'#2563eb',color:'#ffffff' },
  badgeAlert:   { display:'inline-flex',alignItems:'center',gap:'4px',padding:'2px 8px',borderRadius:'4px',fontSize:'0.75rem',fontWeight:600,fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",backgroundColor:'#0f172a',color:'#ffffff' },
  badgeWarn:    { display:'inline-flex',alignItems:'center',gap:'4px',padding:'2px 8px',borderRadius:'4px',fontSize:'0.75rem',fontWeight:600,fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",backgroundColor:'#d97706',color:'#ffffff' },
  badgeLow:     { display:'inline-flex',alignItems:'center',gap:'4px',padding:'2px 8px',borderRadius:'4px',fontSize:'0.75rem',fontWeight:600,fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",backgroundColor:'#16a34a',color:'#ffffff' },
  label:        { fontSize:'0.65rem',textTransform:'uppercase',color:'#64748b',letterSpacing:'0.05em',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace" },
  data:         { fontSize:'0.85rem',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",fontVariantNumeric:'tabular-nums',fontWeight:600 },
  ticks:        { fontFamily:'monospace',color:'#64748b',letterSpacing:'1px',fontSize:'0.6rem',userSelect:'none',opacity:0.4 },
  huge:         { fontSize:'2.5rem',letterSpacing:'-0.04em',lineHeight:1,fontWeight:700,margin:0 },
  // panels
  leftPanel:    { gridColumn:'1 / 2', padding:'24px', display:'flex', flexDirection:'column', gap:'24px', backgroundColor:'rgba(240,242,245,0.85)', border:'1px solid #d1d5db', backdropFilter:'blur(4px)', position:'relative', overflowY:'auto' },
  listPanel:    { gridColumn:'2 / -1', padding:0, display:'flex', flexDirection:'column', position:'relative', backgroundColor:'rgba(240,242,245,0.85)', border:'1px solid #d1d5db', backdropFilter:'blur(4px)', overflow:'hidden' },
  // table
  dataTable:    { width:'100%',borderCollapse:'collapse',position:'relative',zIndex:1 },
  tableHeader:  { fontSize:'0.65rem',textTransform:'uppercase',color:'#64748b',letterSpacing:'0.05em',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",fontWeight:600,backgroundColor:'rgba(255,255,255,0.5)',padding:'12px 16px',textAlign:'left',borderBottom:'1px solid #d1d5db' },
  tableCell:    { padding:'12px 16px',textAlign:'left',borderBottom:'1px solid #d1d5db' },
  // cards
  insightCard:  { border:'1px solid #d1d5db',padding:'16px',position:'relative',background:'#ffffff' },
  keyValue:     { display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px',borderBottom:'1px solid #f0f2f5',paddingBottom:'4px' },
  explanationText:{ fontSize:'0.8rem',color:'#64748b',lineHeight:1.6,marginTop:'12px' },
  nlpBox:       { border:'1px solid #d1d5db',padding:'16px',background:'#ffffff',boxShadow:'0 2px 4px rgba(0,0,0,0.02)',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",fontSize:'0.75rem',lineHeight:1.4,color:'#0f172a' },
  // search
  searchInput:  { flex:1,border:'1px solid #d1d5db',padding:'10px 14px',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",fontSize:'0.85rem',backgroundColor:'#ffffff',color:'#0f172a',outline:'none' },
  searchBtn:    { padding:'10px 18px',backgroundColor:'#0f172a',color:'#fff',border:'none',cursor:'pointer',fontFamily:"ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,monospace",fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase' },
  // misc
  statusDot:    { display:'inline-block',width:'6px',height:'6px',backgroundColor:'#2563eb',borderRadius:'50%',marginRight:'4px',boxShadow:'0 0 4px #2563eb' },
  crosshairBase:{ position:'absolute',width:'9px',height:'9px',pointerEvents:'none',zIndex:10 },
  metricGroup:  { display:'flex',gap:'4px',alignItems:'baseline' },
  headerMetrics:{ display:'flex',gap:'24px',alignItems:'baseline' },
  footerGroup:  { display:'flex',gap:'24px',alignItems:'center' },
  textAlert:    { fontWeight:'bold',color:'#0f172a',borderBottom:'2px solid #2563eb' },
  empName:      { fontWeight:600,fontSize:'0.9rem' },
  empRole:      { fontSize:'0.72rem',color:'#64748b',marginTop:'2px' },
  listHeaderRow:{ padding:'24px',borderBottom:'1px solid #d1d5db',position:'relative',zIndex:1,display:'flex',justifyContent:'space-between',alignItems:'flex-end',background:'rgba(255,255,255,0.4)' },
  listPanelGlow:{ position:'absolute',top:'10%',left:'40%',width:'70%',height:'50%',background:'radial-gradient(ellipse at center,rgba(37,99,235,0.1) 0%,transparent 70%)',transform:'translate(-50%,0)',pointerEvents:'none',zIndex:0 },
};

// ─── Shared primitives ────────────────────────────────────────────────────────
const Crosshair = ({ position }) => {
  const pos = { tl:{top:'-5px',left:'-5px'}, tr:{top:'-5px',right:'-5px'}, bl:{bottom:'-5px',left:'-5px'}, br:{bottom:'-5px',right:'-5px'} }[position];
  return (
    <div style={{ ...S.crosshairBase, ...pos }}>
      <div style={{ position:'absolute',top:'4px',left:0,width:'9px',height:'1px',backgroundColor:'#0f172a' }} />
      <div style={{ position:'absolute',top:0,left:'4px',width:'1px',height:'9px',backgroundColor:'#0f172a' }} />
    </div>
  );
};

const riskBadge = (pct) => {
  if (pct >= 70) return <span style={S.badgeAlert}>{pct}%</span>;
  if (pct >= 45) return <span style={S.badgeWarn}>{pct}%</span>;
  return <span style={S.badgeLow}>{pct}%</span>;
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const NavMenu = () => {
  const loc = useLocation();
  return (
    <nav style={S.nav}>
      {[['/', 'HOME'], ['/analytics', 'ANALYTICS']].map(([to, label]) => (
        <Link key={to} to={to} style={loc.pathname === to ? S.navLinkActive : S.navLink}>{label}</Link>
      ))}
    </nav>
  );
};

// ─── Search panel ─────────────────────────────────────────────────────────────
const SearchPanel = ({ employees, onResult }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const run = () => {
    const q = query.trim();
    if (!q) { setError('Enter an employee ID or row index.'); return; }
    let emp = employees.find(e => e.empId === q);
    if (!emp) {
      const idx = parseInt(q, 10);
      if (!isNaN(idx) && idx >= 1 && idx <= employees.length) emp = employees[idx - 1];
    }
    if (!emp) { setError(`No employee found for "${q}".`); onResult(null); return; }
    setError('');
    onResult(emp);
  };

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
      <div>
        <div style={S.label}>Employee Lookup</div>
        <h2 style={{ margin:'2px 0 0',fontWeight:700,letterSpacing:'-0.02em' }}>Search</h2>
        <div style={{ ...S.label,marginTop:'4px' }}>EmpID (e.g. 10003) or row index (1 – {employees.length})</div>
      </div>
      <div style={{ display:'flex' }}>
        <input
          style={S.searchInput}
          placeholder="e.g. 10005"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
        />
        <button style={S.searchBtn} onClick={run}>RUN</button>
      </div>
      {error && <div style={{ ...S.label, color:'#dc2626' }}>{error}</div>}
      <div style={S.nlpBox}>
        <span style={{ ...S.label, color:'#1e40af' }}>&gt; LOOKUP READY</span>
        <br /><br />
        Query by EmpID or row index. Risk score is computed from absences, satisfaction, engagement, performance, and days late.
      </div>
      <div style={{ ...S.ticks, marginTop:'2px' }}>|||||| ||| ||||</div>
    </div>
  );
};

// ─── Result card (explanation + solutions) ────────────────────────────────────
const ResultCard = ({ emp }) => {
  if (!emp) return null;
  const risk      = computeRisk(emp);
  const expl      = buildExplanation(emp);
  const solutions = buildSolutions(emp);
  const initials  = emp.name.split(' ').map(p => p[0]).join('');

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>

      {/* ── Prediction result ── */}
      <div style={S.label}>Prediction Result</div>
      <div style={{ ...S.insightCard, borderColor: risk >= 70 ? '#0f172a' : '#d1d5db' }}>
        <div style={{ position:'absolute',top:'5px',right:'8px',fontFamily:'monospace',fontSize:'14px',color:'#2563eb' }}>•</div>
        <div style={{ ...S.label, marginBottom:'10px', color:'#0f172a' }}>TARGET: {initials} · #{emp.empId}</div>
        <div style={S.keyValue}><span style={S.label}>Name</span><span style={{ ...S.data,fontSize:'0.8rem' }}>{emp.name}</span></div>
        <div style={S.keyValue}><span style={S.label}>Position</span><span style={{ ...S.data,fontSize:'0.75rem' }}>{emp.position}</span></div>
        <div style={S.keyValue}><span style={S.label}>Department</span><span style={{ ...S.data,fontSize:'0.75rem' }}>{emp.department}</span></div>
        <div style={S.keyValue}><span style={S.label}>Termination Risk</span>{riskBadge(risk)}</div>
        <div style={S.keyValue}><span style={S.label}>Absences</span><span style={{ ...S.data, color: emp.absences > 12 ? '#dc2626' : 'inherit' }}>{emp.absences}</span></div>
        <div style={S.keyValue}><span style={S.label}>Satisfaction</span><span style={S.data}>{emp.satisfaction}/5</span></div>
        <div style={S.keyValue}><span style={S.label}>Engagement</span><span style={S.data}>{emp.engagement.toFixed(1)}/5.0</span></div>
        <div style={S.keyValue}><span style={S.label}>Performance</span><span style={{ ...S.data, color: emp.perfScore === 'PIP' ? '#dc2626' : 'inherit' }}>{emp.perfScore}</span></div>
        <div style={S.keyValue}><span style={S.label}>Status</span><span style={{ ...S.data,fontSize:'0.75rem' }}>{emp.empStatus}</span></div>
        {emp.termd === 1 && (
          <div style={S.keyValue}><span style={S.label}>Term. Reason</span><span style={{ ...S.data,fontSize:'0.72rem' }}>{emp.termReason}</span></div>
        )}

        {/* Explanation of causes */}
        <div style={{ ...S.label, marginTop:'14px', marginBottom:'6px', color:'#0f172a' }}>Why this score?</div>
        <div style={S.explanationText}>{expl}</div>
      </div>

      {/* ── Recommended solutions ── */}
      <div style={S.label}>Recommended Actions</div>
      <div style={{ ...S.insightCard, borderLeft: '3px solid #2563eb' }}>
        <div style={{ position:'absolute',top:'5px',right:'8px',fontFamily:'monospace',fontSize:'14px',color:'#2563eb' }}>→</div>
        <div style={{ ...S.label, marginBottom:'12px', color:'#0f172a' }}>HOW TO ADDRESS THESE RISKS</div>
        {solutions.map((s, i) => (
          <div key={i} style={{ marginBottom: i < solutions.length - 1 ? '14px' : 0 }}>
            <div style={{ ...S.label, color:'#0f172a', marginBottom:'4px' }}>
              {i + 1}. {s.factor}
            </div>
            <div style={{ fontSize:'0.8rem', color:'#374151', lineHeight:1.6 }}>
              {s.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Risk table ───────────────────────────────────────────────────────────────
const RiskTable = ({ employees, onSelect }) => {
  const topAtRisk = employees
    .filter(e => e.termd === 0)
    .map(e => ({ ...e, risk: computeRisk(e) }))
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 10);

  return (
    <div style={{ overflowY:'auto', flex:1 }}>
      <table style={S.dataTable}>
        <thead>
          <tr>
            {['Employee','Dept','Risk %','Absences','Performance','Action'].map(h => (
              <th key={h} style={S.tableHeader}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {topAtRisk.map((emp, i) => (
            <tr
              key={i} style={{ cursor:'pointer' }}
              onMouseEnter={e => Array.from(e.currentTarget.querySelectorAll('td')).forEach(td => (td.style.backgroundColor = 'rgba(255,255,255,0.6)'))}
              onMouseLeave={e => Array.from(e.currentTarget.querySelectorAll('td')).forEach(td => (td.style.backgroundColor = ''))}
            >
              <td style={S.tableCell}>
                <div style={S.empName}>{emp.name}</div>
                <div style={S.empRole}>#{emp.empId}</div>
              </td>
              <td style={S.tableCell}><div style={{ ...S.label,fontSize:'0.6rem' }}>{emp.department}</div></td>
              <td style={S.tableCell}>{riskBadge(emp.risk)}</td>
              <td style={S.tableCell}>
                {emp.absences > 12
                  ? <><div style={S.textAlert}>{emp.absences}</div><div style={S.label}>HIGH</div></>
                  : <div style={S.data}>{emp.absences}</div>}
              </td>
              <td style={S.tableCell}>
                <div style={{ ...S.data,fontSize:'0.75rem',color: emp.perfScore === 'PIP' ? '#dc2626' : 'inherit' }}>{emp.perfScore}</div>
              </td>
              <td style={S.tableCell}>
                <span
                  style={{ ...S.label, cursor:'pointer', borderBottom:'1px solid', color:'#2563eb' }}
                  onClick={() => onSelect(emp)}
                >
                  AUDIT
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Home page ────────────────────────────────────────────────────────────────
const HomePage = ({ employees }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display:'contents' }}>
      {/* Left: search + result (explanation + solutions) */}
      <div style={S.leftPanel}>
        <Crosshair position="tr" />
        <SearchPanel employees={employees} onResult={setSelected} />
        {selected && <ResultCard emp={selected} />}
      </div>

      {/* Right: risk prediction table */}
      <div style={S.listPanel}>
        <div style={S.listPanelGlow} />
        <Crosshair position="tl" />
        <Crosshair position="tr" />
        <div style={S.listHeaderRow}>
          <h1 style={S.huge}>Risk Prediction</h1>
          <div style={S.label}>Top 10 at-risk · active employees</div>
        </div>
        <RiskTable employees={employees} onSelect={setSelected} />
      </div>
    </div>
  );
};

// ─── Analytics components ─────────────────────────────────────────────────────

// Horizontal bar — used for feature importance AND department rates
const HorizBar = ({ label, value, maxVal, showPct = false }) => {
  const pct   = Math.min((value / (maxVal || 1)) * 100, 100);
  const color = pct > 66 ? '#0f172a' : pct > 33 ? '#2563eb' : '#94a3b8';
  const display = showPct ? `${(value * 100).toFixed(0)}%` : (value * 100).toFixed(0);
  return (
    <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px' }}>
      <div style={{ ...S.label,width:'160px',textAlign:'right',flexShrink:0 }}>{label}</div>
      <div style={{ flex:1,height:'16px',backgroundColor:'#e5e7eb',position:'relative',border:'1px solid #d1d5db' }}>
        <div style={{ position:'absolute',left:0,top:0,height:'100%',width:`${pct}%`,backgroundColor:color }} />
      </div>
      <div style={{ ...S.data,width:'40px',textAlign:'right',fontSize:'0.72rem' }}>{display}</div>
    </div>
  );
};

// Vertical bar — used for performance score & satisfaction (few bars, short labels)
const VertBarGroup = ({ data, title, subtitle }) => {
  const maxVal = Math.max(...data.map(d => d.rate), 0.01);
  return (
    <div style={{ border:'1px solid #d1d5db',padding:'24px',backgroundColor:'rgba(255,255,255,0.6)',position:'relative' }}>
      <Crosshair position="tl" /><Crosshair position="tr" />
      <div style={S.label}>{subtitle}</div>
      <h3 style={{ margin:'2px 0 24px',fontWeight:700,letterSpacing:'-0.02em' }}>{title}</h3>
      <div style={{ display:'flex',alignItems:'flex-end',gap:'0',height:'140px',borderBottom:'1px solid #d1d5db',borderLeft:'1px solid #d1d5db',paddingLeft:'16px',paddingRight:'8px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',flex:1 }}>
            <div style={{ ...S.data,fontSize:'0.7rem' }}>{(d.rate * 100).toFixed(0)}%</div>
            <div style={{
              width:'36px',
              height:`${Math.max((d.rate / maxVal) * 116, 4)}px`,
              backgroundColor: d.rate === maxVal ? '#0f172a' : '#94a3b8',
              border:'1px solid',
              borderColor: d.rate === maxVal ? '#0f172a' : '#d1d5db',
            }} />
            <div style={{ ...S.label,fontSize:'0.6rem',textAlign:'center',lineHeight:1.3,paddingTop:'6px' }}>{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsPage = ({ analytics }) => {
  if (!analytics) return <div style={{ gridColumn:'1 / -1',padding:'32px',color:'#64748b' }}>Loading…</div>;
  const {
    byDept, byPerf, bySat, featureImportance,
    attritionRate, terminated, total,
    avgAbsTermd, avgAbsActive, avgSalTermd, avgSalActive, avgEngTermd, avgEngActive,
  } = analytics;
  const maxFI   = Math.max(...featureImportance.map(f => f.normalized));
  const maxDept = Math.max(...byDept.map(d => d.rate));

  return (
    <div style={{ gridColumn:'1 / -1',padding:'32px',display:'flex',flexDirection:'column',gap:'28px',overflowY:'auto' }}>

      {/* Title */}
      <div style={{ borderBottom:'1px solid #d1d5db',paddingBottom:'16px' }}>
        <div style={S.label}>Section 2</div>
        <h1 style={{ ...S.huge,fontSize:'2rem',marginTop:'4px' }}>Dataset Analytics</h1>
        <div style={{ ...S.label,marginTop:'6px' }}>Key drivers of contract termination · HRDataset_Expanded_v2 (n={total})</div>
      </div>

      {/* Key stats strip */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',border:'1px solid #d1d5db',backgroundColor:'#d1d5db' }}>
        {[
          { label:'Overall Attrition Rate', value:`${(attritionRate*100).toFixed(1)}%` },
          { label:'Total Terminated',       value:terminated },
          { label:'Avg Absences · Termd',   value:avgAbsTermd.toFixed(1) },
          { label:'Avg Absences · Active',  value:avgAbsActive.toFixed(1) },
        ].map(({ label, value }) => (
          <div key={label} style={{ backgroundColor:'rgba(255,255,255,0.8)',padding:'16px 24px' }}>
            <div style={S.label}>{label}</div>
            <div style={{ ...S.data,fontSize:'1.4rem',marginTop:'6px',letterSpacing:'-0.02em' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Feature importance — full width */}
      <div style={{ border:'1px solid #d1d5db',padding:'24px',backgroundColor:'rgba(255,255,255,0.6)',position:'relative' }}>
        <Crosshair position="tl" /><Crosshair position="tr" /><Crosshair position="bl" /><Crosshair position="br" />
        <div style={S.label}>Model XAI · Mean difference (terminated vs active)</div>
        <h3 style={{ margin:'2px 0 6px',fontWeight:700,letterSpacing:'-0.02em' }}>Feature Importance</h3>
        <div style={{ ...S.label,marginBottom:'20px' }}>Relative contribution of each feature to termination probability</div>
        {featureImportance.map((f, i) => (
          <HorizBar key={i} label={f.label} value={f.normalized} maxVal={maxFI} />
        ))}
        <div style={{ marginTop:'16px',display:'flex',gap:'24px' }}>
          {[['#0f172a','High impact'],['#2563eb','Medium impact'],['#94a3b8','Lower impact']].map(([c,l]) => (
            <div key={l} style={{ display:'flex',alignItems:'center',gap:'6px' }}>
              <div style={{ width:'12px',height:'12px',backgroundColor:c }} />
              <span style={S.label}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Dept rate (horizontal, 2/3) + Avg metrics (1/3) */}
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:'24px' }}>

        {/* Dept — horizontal bars so long names fit */}
        <div style={{ border:'1px solid #d1d5db',padding:'24px',backgroundColor:'rgba(255,255,255,0.6)',position:'relative' }}>
          <Crosshair position="tl" /><Crosshair position="tr" />
          <div style={S.label}>Dataset Overview</div>
          <h3 style={{ margin:'2px 0 20px',fontWeight:700,letterSpacing:'-0.02em' }}>Termination Rate by Department</h3>
          {byDept.map((d, i) => (
            <HorizBar key={i} label={d.label} value={d.rate} maxVal={maxDept} showPct />
          ))}
        </div>

        {/* Avg metrics comparison */}
        <div style={{ border:'1px solid #d1d5db',padding:'24px',backgroundColor:'rgba(255,255,255,0.6)',position:'relative' }}>
          <Crosshair position="tl" /><Crosshair position="tr" />
          <div style={S.label}>Comparative Analysis</div>
          <h3 style={{ margin:'2px 0 24px',fontWeight:700,letterSpacing:'-0.02em' }}>Terminated vs Active</h3>
          {[
            { label:'Avg Absences',   termd: avgAbsTermd.toFixed(1),                         active: avgAbsActive.toFixed(1) },
            { label:'Avg Salary',     termd: `$${Math.round(avgSalTermd/1000).toFixed(0)}k`,  active: `$${Math.round(avgSalActive/1000).toFixed(0)}k` },
            { label:'Avg Engagement', termd: avgEngTermd.toFixed(2),                          active: avgEngActive.toFixed(2) },
          ].map(r => (
            <div key={r.label} style={{ marginBottom:'20px' }}>
              <div style={{ ...S.label,marginBottom:'8px' }}>{r.label}</div>
              <div style={{ display:'flex',gap:'12px' }}>
                <div style={{ flex:1,padding:'8px',border:'1px solid #fca5a5',backgroundColor:'rgba(220,38,38,0.04)',textAlign:'center' }}>
                  <div style={{ ...S.label,color:'#dc2626',fontSize:'0.58rem' }}>TERMINATED</div>
                  <div style={{ ...S.data,fontSize:'1rem',color:'#dc2626',marginTop:'4px' }}>{r.termd}</div>
                </div>
                <div style={{ flex:1,padding:'8px',border:'1px solid #86efac',backgroundColor:'rgba(22,163,74,0.04)',textAlign:'center' }}>
                  <div style={{ ...S.label,color:'#16a34a',fontSize:'0.58rem' }}>ACTIVE</div>
                  <div style={{ ...S.data,fontSize:'1rem',color:'#16a34a',marginTop:'4px' }}>{r.active}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Performance + Satisfaction vertical bar charts */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px' }}>
        <VertBarGroup
          title="Termination Rate by Performance"
          subtitle="Performance Score"
          data={byPerf.map(d => ({ ...d, label: d.label.replace('Needs Improvement','Needs Improv.').replace('Fully Meets','Fully Meets') }))}
        />
        <VertBarGroup
          title="Termination Rate by Satisfaction"
          subtitle="Employee Satisfaction (1–5)"
          data={bySat.map(d => ({ ...d, label: `Score ${d.label}` }))}
        />
      </div>

      <div style={{ ...S.ticks,textAlign:'center' }}>||||||||||||||||||||||||||||||||||||||||</div>
    </div>
  );
};

// ─── App shell ────────────────────────────────────────────────────────────────
const AppShell = () => {
  const [employees, setEmployees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    loadDataset().then(data => {
      setEmployees(data);
      setAnalytics(computeAnalytics(data));
      setLoading(false);
    });
  }, []);

  const attrition = analytics ? `${(analytics.attritionRate * 100).toFixed(1)}%` : '—';

  return (
    <div style={S.layoutGrid}>
      <header style={S.header}>
        <div style={S.brand}>
          <div style={S.brandLogo}>H</div>
          <div style={S.brandName}>ETHICS_AI</div>
          <div style={S.badgeGreen}>↑ 0.94</div>
          <span style={{ ...S.data,...S.label,marginLeft:'8px' }}>CONFIDENCE</span>
        </div>
        <NavMenu />
        <div style={{ ...S.ticks,flex:1,textAlign:'center' }}>||||||||||||||||||||</div>
        <div style={S.headerMetrics}>
          <div style={S.metricGroup}><span style={S.label}>CHURN RISK</span><span style={S.data}>{attrition}</span></div>
          <div style={S.metricGroup}><span style={S.label}>EMPLOYEES</span><span style={S.data}>{employees.length || '—'}</span></div>
          <div style={S.metricGroup}><span style={S.label}>DATASET</span><span style={S.data}>v2</span></div>
        </div>
      </header>

      {loading ? (
        <div style={{ gridColumn:'1 / -1',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b',fontFamily:'monospace',fontSize:'0.8rem' }}>
          LOADING DATASET…
        </div>
      ) : (
        <Routes>
          <Route path="/"          element={<HomePage employees={employees} />} />
          <Route path="/analytics" element={<AnalyticsPage analytics={analytics} />} />
        </Routes>
      )}

      <footer style={S.footer}>
        <div style={S.footerGroup}>
          <span><span style={S.statusDot} />GDPR COMPLIANT NODE</span>
          <span>PII DATA: ANONYMIZED</span>
        </div>
        <div style={{ ...S.ticks,fontSize:'0.5rem' }}>||||||||||||||||||||||||||||||||</div>
        <div style={S.footerGroup}>
          <span>COMPUTE RESOURCES</span>
          <span style={{ color:'#1e40af',fontWeight:'bold' }}>FRUGAL (45W)</span>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#f0f2f5';
    document.body.style.overflowX = 'hidden';
  }, []);
  return (
    <Router basename="/"><AppShell /></Router>
  );
};

export default App;
