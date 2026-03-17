import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg-base': '#f0f2f5',
    '--grid-line': '#d1d5db',
    '--ink-main': '#0f172a',
    '--ink-muted': '#64748b',
    '--accent-green-solid': '#2563eb',
    '--accent-green-text': '#1e40af',
    '--accent-green-wash': 'rgba(37, 99, 235, 0.1)',
  },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f0f2f5',
    color: '#0f172a',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    WebkitFontSmoothing: 'antialiased',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr 300px',
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
  panel: {
    backgroundColor: 'rgba(240, 242, 245, 0.85)',
    border: '1px solid #d1d5db',
    backdropFilter: 'blur(4px)',
    position: 'relative',
  },
  crosshairBase: {
    position: 'absolute',
    width: '9px',
    height: '9px',
    pointerEvents: 'none',
    zIndex: 10,
  },
  header: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid #d1d5db',
    backgroundColor: '#f0f2f5',
    zIndex: 5,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandLogo: {
    backgroundColor: '#0f172a',
    color: '#fff',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  brandName: {
    fontWeight: 700,
    letterSpacing: '-0.02em',
    fontSize: '1.1rem',
  },
  headerMetrics: {
    display: 'flex',
    gap: '24px',
    alignItems: 'baseline',
  },
  metricGroup: {
    display: 'flex',
    gap: '4px',
    alignItems: 'baseline',
  },
  badgeGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  badgeAlert: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 600,
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    backgroundColor: '#0f172a',
    color: '#ffffff',
  },
  textLabel: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    color: '#64748b',
    letterSpacing: '0.05em',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
  },
  textData: {
    fontSize: '0.85rem',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 600,
  },
  ticks: {
    fontFamily: 'monospace',
    color: '#64748b',
    letterSpacing: '1px',
    fontSize: '0.6rem',
    userSelect: 'none',
    opacity: 0.4,
  },
  auditPanel: {
    gridColumn: '1 / 2',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    borderRight: '1px solid #d1d5db',
    backgroundColor: 'rgba(240, 242, 245, 0.85)',
    border: '1px solid #d1d5db',
    backdropFilter: 'blur(4px)',
    position: 'relative',
  },
  chartContainer: {
    position: 'relative',
    height: '120px',
    borderBottom: '1px solid #d1d5db',
    borderLeft: '1px solid #d1d5db',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    paddingLeft: '10px',
  },
  chartLineBg: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: '#d1d5db',
  },
  bar: {
    width: '24px',
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    border: '1px solid rgba(15, 23, 42, 0.15)',
    position: 'relative',
    zIndex: 1,
  },
  barActive: {
    width: '24px',
    backgroundColor: '#0f172a',
    border: '1px solid #0f172a',
    position: 'relative',
    zIndex: 1,
  },
  barLabel: {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    fontSize: '10px',
    color: '#64748b',
  },
  nlpBox: {
    border: '1px solid #d1d5db',
    padding: '16px',
    background: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    fontSize: '0.75rem',
    lineHeight: 1.4,
    color: '#0f172a',
  },
  listPanel: {
    gridColumn: '2 / 3',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'rgba(240, 242, 245, 0.85)',
    border: '1px solid #d1d5db',
    backdropFilter: 'blur(4px)',
    overflow: 'hidden',
  },
  listPanelGlow: {
    content: '',
    position: 'absolute',
    top: '10%',
    left: '40%',
    width: '70%',
    height: '50%',
    background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
    transform: 'translate(-50%, 0)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  listHeaderRow: {
    padding: '24px',
    borderBottom: '1px solid #d1d5db',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    background: 'rgba(255,255,255,0.4)',
  },
  textHuge: {
    fontSize: '2.5rem',
    letterSpacing: '-0.04em',
    lineHeight: 1,
    fontWeight: 700,
    margin: 0,
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    position: 'relative',
    zIndex: 1,
  },
  tableHeader: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    color: '#64748b',
    letterSpacing: '0.05em',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    fontWeight: 600,
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: '16px 24px',
    textAlign: 'left',
    borderBottom: '1px solid #d1d5db',
  },
  tableCell: {
    padding: '16px 24px',
    textAlign: 'left',
    borderBottom: '1px solid #d1d5db',
  },
  empName: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  empRole: {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '2px',
  },
  factorBarContainer: {
    width: '100px',
    height: '4px',
    backgroundColor: '#d1d5db',
    marginTop: '4px',
    position: 'relative',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  factorBarFill: {
    height: '100%',
    backgroundColor: '#0f172a',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  factorMarker: {
    position: 'absolute',
    top: '-3px',
    width: '1px',
    height: '10px',
    backgroundColor: '#64748b',
    zIndex: 2,
    left: '50%',
  },
  textAlert: {
    fontWeight: 'bold',
    color: '#0f172a',
    borderBottom: '2px solid #2563eb',
  },
  insightPanel: {
    gridColumn: '3 / 4',
    padding: '24px',
    borderLeft: '1px solid #d1d5db',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: 'rgba(240, 242, 245, 0.85)',
    border: '1px solid #d1d5db',
    backdropFilter: 'blur(4px)',
    position: 'relative',
  },
  insightCard: {
    border: '1px solid #d1d5db',
    padding: '16px',
    position: 'relative',
    background: '#ffffff',
  },
  keyValue: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    borderBottom: '1px solid #f0f2f5',
    paddingBottom: '4px',
  },
  explanationText: {
    fontSize: '0.8rem',
    color: '#64748b',
    lineHeight: 1.5,
    marginTop: '16px',
  },
  footer: {
    gridColumn: '1 / -1',
    borderTop: '1px solid #d1d5db',
    padding: '8px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
    fontSize: '0.65rem',
    color: '#64748b',
    backgroundColor: '#f0f2f5',
    zIndex: 5,
  },
  footerGroup: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  statusDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    backgroundColor: '#2563eb',
    borderRadius: '50%',
    marginRight: '4px',
    boxShadow: '0 0 4px #2563eb',
  },
};

const Crosshair = ({ position }) => {
  const positionStyles = {
    tl: { top: '-5px', left: '-5px' },
    tr: { top: '-5px', right: '-5px' },
    bl: { bottom: '-5px', left: '-5px' },
    br: { bottom: '-5px', right: '-5px' },
  };
  return (
    <div style={{ ...customStyles.crosshairBase, ...positionStyles[position] }}>
      <div style={{ position: 'absolute', top: '4px', left: 0, width: '9px', height: '1px', backgroundColor: '#0f172a' }} />
      <div style={{ position: 'absolute', top: 0, left: '4px', width: '1px', height: '9px', backgroundColor: '#0f172a' }} />
    </div>
  );
};

const BarChart = () => {
  const bars = [
    { height: '45%', label: 'AGE', active: false },
    { height: '15%', label: 'GND', active: true },
    { height: '30%', label: 'DEP', active: false },
    { height: '25%', label: 'TEN', active: false },
    { height: '10%', label: 'ETH', active: false },
  ];

  return (
    <div style={customStyles.chartContainer}>
      <div style={{ ...customStyles.chartLineBg, top: '20%' }} />
      <div style={{ ...customStyles.chartLineBg, top: '50%' }} />
      <div style={{ ...customStyles.chartLineBg, top: '80%' }} />
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{ ...(bar.active ? customStyles.barActive : customStyles.bar), height: bar.height }}
        >
          <span style={customStyles.barLabel}>{bar.label}</span>
        </div>
      ))}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        preserveAspectRatio="none"
      >
        <path
          d="M10,70 L46,105 L82,85 L118,90 L154,110"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

const FactorBar = ({ width, color }) => (
  <div style={customStyles.factorBarContainer}>
    <div style={customStyles.factorMarker} />
    <div style={{ ...customStyles.factorBarFill, width, backgroundColor: color || '#0f172a' }} />
  </div>
);

const AuditPanel = () => (
  <div style={customStyles.auditPanel}>
    <Crosshair position="tr" />
    <div>
      <div style={customStyles.textLabel}>Section 1</div>
      <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>Fairness Audit</h2>
      <div style={{ ...customStyles.textLabel, marginTop: '4px' }}>Discrimination Delta by Group</div>
      <BarChart />
    </div>
    <div style={{ marginTop: '24px' }}>
      <div style={customStyles.textLabel}>NLP Insights</div>
      <div style={customStyles.nlpBox}>
        <span style={{ ...customStyles.textLabel, color: '#1e40af' }}>&gt; ANALYSIS COMPLETE</span>
        <br />
        <br />
        Exit interview data indicates a +42% frequency of keyword clusters relating to "compensation parity" among senior engineering staff within the last quarter.
      </div>
      <div style={{ ...customStyles.ticks, marginTop: '8px' }}>|||||| ||| ||||</div>
    </div>
  </div>
);

const RiskTable = ({ onAuditClick, selectedEmployee }) => {
  const employees = [
    {
      name: 'Sarah Jenkins',
      role: 'Lead Developer (ENG)',
      risk: '89%',
      riskType: 'alert',
      absence: '14 Days',
      absenceAlert: true,
      salary: '€72,400',
      barWidth: '35%',
      barColor: '#0f172a',
      action: 'AUDIT',
      actionColor: '#2563eb',
    },
    {
      name: 'Marcus Chen',
      role: 'Product Manager (PROD)',
      risk: '76%',
      riskType: 'alert',
      absence: '2 Days',
      absenceAlert: false,
      salary: '€68,000',
      barWidth: '48%',
      barColor: '#0f172a',
      action: 'AUDIT',
      actionColor: '#2563eb',
    },
    {
      name: 'Elena Rostova',
      role: 'Systems Architect (ENG)',
      risk: '42%',
      riskType: 'green',
      absence: '4 Days',
      absenceAlert: false,
      salary: '€91,000',
      barWidth: '55%',
      barColor: '#2563eb',
      action: 'VIEW',
      actionColor: '#64748b',
    },
  ];

  return (
    <table style={customStyles.dataTable}>
      <thead>
        <tr>
          {['Employee / Role', 'Risk %', 'Absence Days', 'Salary vs Peer Avg', 'Action'].map((h) => (
            <th key={h} style={customStyles.tableHeader}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, i) => (
          <tr
            key={i}
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              Array.from(e.currentTarget.querySelectorAll('td')).forEach(
                (td) => (td.style.backgroundColor = 'rgba(255, 255, 255, 0.6)')
              );
            }}
            onMouseLeave={(e) => {
              Array.from(e.currentTarget.querySelectorAll('td')).forEach(
                (td) => (td.style.backgroundColor = '')
              );
            }}
          >
            <td style={customStyles.tableCell}>
              <div style={customStyles.empName}>{emp.name}</div>
              <div style={customStyles.empRole}>{emp.role}</div>
            </td>
            <td style={customStyles.tableCell}>
              <div style={emp.riskType === 'alert' ? customStyles.badgeAlert : customStyles.badgeGreen}>
                {emp.risk}
              </div>
            </td>
            <td style={customStyles.tableCell}>
              {emp.absenceAlert ? (
                <>
                  <div style={customStyles.textAlert}>{emp.absence}</div>
                  <div style={customStyles.textLabel}>Trailing 90d</div>
                </>
              ) : (
                <div style={customStyles.textData}>{emp.absence}</div>
              )}
            </td>
            <td style={customStyles.tableCell}>
              <div style={customStyles.textData}>{emp.salary}</div>
              <FactorBar width={emp.barWidth} color={emp.barColor} />
            </td>
            <td style={customStyles.tableCell}>
              <span
                style={{
                  ...customStyles.textLabel,
                  cursor: 'pointer',
                  borderBottom: '1px solid',
                  color: emp.actionColor,
                }}
                onClick={() => onAuditClick && onAuditClick(emp)}
              >
                {emp.action}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ListPanel = ({ onAuditClick }) => (
  <div style={customStyles.listPanel}>
    <div style={customStyles.listPanelGlow} />
    <Crosshair position="tl" />
    <Crosshair position="tr" />
    <div style={customStyles.listHeaderRow}>
      <h1 style={customStyles.textHuge}>Risk Prediction</h1>
      <div style={customStyles.textLabel}>Filtered: High Probability &gt; 70%</div>
    </div>
    <RiskTable onAuditClick={onAuditClick} />
  </div>
);

const InsightPanel = ({ selectedEmployee }) => {
  const data = selectedEmployee || {
    name: 'S. JENKINS',
    primaryFactor: 'Compensation',
    deviation: '-18.4%',
    secondaryFactor: 'Absence Spike',
    explanation:
      "Model detects a compounded risk pattern. Salary is below the median for \"Lead Developer\" peer group (n=12). Recent absence spike correlates highly (r=0.74) with historical pre-resignation behaviors in this department.",
  };

  return (
    <div style={customStyles.insightPanel}>
      <Crosshair position="tl" />
      <div>
        <div style={customStyles.textLabel}>Explainable AI</div>
        <h2 style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>Reasoning</h2>
      </div>
      <div style={customStyles.insightCard}>
        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '8px',
            fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
            fontSize: '14px',
            color: '#2563eb',
          }}
        >
          •
        </div>
        <div style={{ ...customStyles.textLabel, marginBottom: '8px', color: '#0f172a' }}>
          TARGET: {data.name ? (data.name.split(' ')[0][0] + '. ' + data.name.split(' ')[1]) : 'S. JENKINS'}
        </div>
        <div style={customStyles.keyValue}>
          <span style={customStyles.textLabel}>Primary Factor</span>
          <span style={customStyles.textData}>{data.primaryFactor || 'Compensation'}</span>
        </div>
        <div style={customStyles.keyValue}>
          <span style={customStyles.textLabel}>Deviation</span>
          <span style={customStyles.textData}>{data.deviation || '-18.4%'}</span>
        </div>
        <div style={customStyles.keyValue}>
          <span style={customStyles.textLabel}>Secondary Factor</span>
          <span style={customStyles.textData}>{data.secondaryFactor || 'Absence Spike'}</span>
        </div>
        <div style={customStyles.explanationText}>{data.explanation}</div>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          opacity: 0.15,
          paddingTop: '20px',
        }}
      >
        {[30, 50, 80, 40, 90].map((h, i) => (
          <div key={i} style={{ width: '15%', height: `${h}%`, background: '#2563eb' }} />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAuditClick = (emp) => {
    const insights = {
      'Sarah Jenkins': {
        name: 'Sarah Jenkins',
        primaryFactor: 'Compensation',
        deviation: '-18.4%',
        secondaryFactor: 'Absence Spike',
        explanation:
          'Model detects a compounded risk pattern. Salary is below the median for "Lead Developer" peer group (n=12). Recent absence spike correlates highly (r=0.74) with historical pre-resignation behaviors in this department.',
      },
      'Marcus Chen': {
        name: 'Marcus Chen',
        primaryFactor: 'Engagement',
        deviation: '-12.1%',
        secondaryFactor: 'Growth Stall',
        explanation:
          'Risk driven primarily by low engagement scores over the last two quarters. Role advancement has plateaued for 14 months. Peer comparison shows 2.3x higher promotion rate for similar tenure.',
      },
      'Elena Rostova': {
        name: 'Elena Rostova',
        primaryFactor: 'Market Rate',
        deviation: '+5.2%',
        secondaryFactor: 'Workload',
        explanation:
          'Compensation is above peer median. Risk is moderate and driven by workload indicators. Cross-functional project assignments have increased by 40% this quarter without corresponding role adjustment.',
      },
    };
    setSelectedEmployee(insights[emp.name] || null);
  };

  return (
    <div style={{ display: 'contents' }}>
      <AuditPanel />
      <ListPanel onAuditClick={handleAuditClick} />
      <InsightPanel selectedEmployee={selectedEmployee} />
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
    <Router basename="/">
      <div style={customStyles.layoutGrid}>
        <header style={customStyles.header}>
          <div style={customStyles.brand}>
            <div style={customStyles.brandLogo}>H</div>
            <div style={customStyles.brandName}>ETHICS_AI</div>
            <div style={customStyles.badgeGreen}>↑ 0.94</div>
            <span
              style={{
                ...customStyles.textData,
                ...customStyles.textLabel,
                marginLeft: '8px',
              }}
            >
              CONFIDENCE
            </span>
          </div>
          <div style={customStyles.ticks}>||||||||||||||||||||</div>
          <div style={customStyles.headerMetrics}>
            <div style={customStyles.metricGroup}>
              <span style={customStyles.textLabel}>CHURN RISK</span>
              <span style={customStyles.textData}>14.2%</span>
            </div>
            <div style={customStyles.metricGroup}>
              <span style={customStyles.textLabel}>BIAS INDEX</span>
              <span style={customStyles.textData}>0.02</span>
            </div>
            <div style={customStyles.metricGroup}>
              <span style={customStyles.textLabel}>MODEL VER</span>
              <span style={customStyles.textData}>4.1.9b</span>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        <footer style={customStyles.footer}>
          <div style={customStyles.footerGroup}>
            <span>
              <span style={customStyles.statusDot} />
              GDPR COMPLIANT NODE
            </span>
            <span>PII DATA: ANONYMIZED</span>
          </div>
          <div style={{ ...customStyles.ticks, fontSize: '0.5rem' }}>
            ||||||||||||||||||||||||||||||||
          </div>
          <div style={customStyles.footerGroup}>
            <span>COMPUTE RESOURCES</span>
            <span style={{ color: '#1e40af', fontWeight: 'bold' }}>FRUGAL (45W)</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;