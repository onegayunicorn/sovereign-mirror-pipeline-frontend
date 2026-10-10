import { useMemo, useState } from 'react';
import {
  Activity, Archive, ArrowDownToLine, ArrowLeft, ArrowRight, Box, Check,
  ChevronRight, Circle, Clock3, Cloud, Code2, FileArchive, Folder, GitBranch,
  Home, Layers3, LockKeyhole, Package, Play, RotateCcw, ScanSearch, Shield, ShieldCheck,
  Terminal, X, Zap
} from 'lucide-react';

type Screen = 'home' | 'sources' | 'pipeline' | 'approvals' | 'rollback' | 'security' | 'artifacts';
type Source = { name: string; detail: string; icon: typeof Cloud; tone: string };

const sources: Source[] = [
  { name: 'Lovable', detail: 'Capture an authorized project export or connected repository', icon: Cloud, tone: 'pink' },
  { name: 'Base44', detail: 'Import an authorized project export', icon: Box, tone: 'orange' },
  { name: 'AI Studio', detail: 'Import a downloaded project bundle', icon: Zap, tone: 'blue' },
  { name: 'Git repository', detail: 'Clone or capture a repository you can access', icon: GitBranch, tone: 'neutral' },
  { name: 'Local directory', detail: 'Capture files from a selected local directory', icon: Folder, tone: 'gold' },
  { name: 'Archive / ZIP', detail: 'Inspect and import a project archive', icon: FileArchive, tone: 'violet' },
];

const stages = [
  { name: 'Capture', state: 'done', detail: 'Source snapshot and file inventory' },
  { name: 'Normalize', state: 'done', detail: 'Project metadata and structure' },
  { name: 'Security', state: 'done', detail: 'Secrets, dependencies and policy checks' },
  { name: 'Build', state: 'running', detail: 'Isolated build and test execution' },
  { name: 'Deploy', state: 'pending', detail: 'Blocked until explicit approval' },
] as const;

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00d4ff"/><stop offset="55%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#d946ef"/></linearGradient></defs><path d="M50 14C29 14 13 30 13 50s16 36 37 36 37-16 37-36S71 14 50 14Z" stroke="url(#brandGradient)" strokeWidth="4" fill="none" opacity=".5"/><path d="M50 23C34 23 22 35 22 50s12 27 28 27 28-12 28-27S66 23 50 23Z" stroke="url(#brandGradient)" strokeWidth="3" fill="none"/><path d="m50 34 17 16-17 16-17-16Z" fill="url(#brandGradient)" opacity=".45"/><circle cx="50" cy="50" r="7" fill="#00d4ff"/><path d="M42 50h16M50 42v16" stroke="white" strokeWidth="2"/></svg></div>;
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [source, setSource] = useState('Lovable');
  const [selectedRelease, setSelectedRelease] = useState('v2.3.0');
  const [environment, setEnvironment] = useState('Development');
  const [notice, setNotice] = useState('');
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [rollbackConfirm, setRollbackConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('Logs');

  const navItems: { id: Screen; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'sources', label: 'Sources', icon: GitBranch },
    { id: 'pipeline', label: 'Pipelines', icon: Layers3 },
    { id: 'approvals', label: 'Approvals', icon: ShieldCheck },
    { id: 'rollback', label: 'Rollback', icon: RotateCcw },
  ];

  const title = useMemo(() => ({
    home: 'Sovereign Mirror', sources: 'Sources', pipeline: 'Pipeline detail',
    approvals: 'Approval gate', rollback: 'Rollback', security: 'Security scan',
    artifacts: 'Artifacts',
  }[screen]), [screen]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  }

  function startCapture(name = source) {
    setSource(name);
    setScreen('pipeline');
    showNotice(`Demo only: ${name} capture has not been started. Connect the local CLI/API to run a real capture.`);
  }

  function approve() {
    if (rejected) setRejected(false);
    setApproved(true);
    showNotice('Approval recorded in this UI demo only. No remote write or deployment was performed.');
  }

  function reject() {
    setRejected(true);
    setApproved(false);
    showNotice('Release rejected in this UI demo. No deployment was performed.');
  }

  function rollback() {
    if (!rollbackConfirm) {
      setRollbackConfirm(true);
      showNotice('Review the target release and verified hash, then confirm the demo action.');
      return;
    }
    setRollbackConfirm(false);
    showNotice(`Demo only: rollback to ${selectedRelease} was not executed. Connect a verified local rollback service.`);
  }

  return <div className="app-shell">
    <div className="phone">
      <div className="status-bar"><span>9:41</span><span className="status-right"><span className="signal">▮▮▮</span><span>◔</span><span className="battery"><i /></span></span></div>
      <header className="topbar">
        <div className="topbar-brand"><BrandMark/><div><strong>SOVEREIGN</strong><small>MIRROR PIPELINE</small></div></div>
        <span className="mode-chip"><span className="mode-dot"/> LOCAL UI</span>
      </header>

      <main className="screen" key={screen}>
        {screen === 'home' && <>
          <section className="hero">
            <div className="hero-orb"><BrandMark/></div>
            <div className="eyebrow">SOURCE → VERIFIED ARTIFACT</div>
            <h1>Capture any app.<br/><span>Make it sovereign.</span></h1>
            <p>Local-first capture, repeatable builds, and approval-gated releases.</p>
          </section>
          <div className="quick-grid">
            <button className="quick-card" onClick={() => setScreen('sources')}><span className="quick-icon cyan"><ArrowDownToLine/></span><b>Capture</b><small>New source snapshot</small></button>
            <button className="quick-card" onClick={() => setScreen('sources')}><span className="quick-icon violet"><GitBranch/></span><b>Sources</b><small>Manage inputs</small></button>
            <button className="quick-card" onClick={() => setScreen('pipeline')}><span className="quick-icon green"><Terminal/></span><b>Build</b><small>Inspect pipeline</small></button>
            <button className="quick-card" onClick={() => setScreen('approvals')}><span className="quick-icon amber"><ShieldCheck/></span><b>Approval</b><small>Review release gates</small></button>
            <button className="quick-card" onClick={() => setScreen('security')}><span className="quick-icon pink"><ScanSearch/></span><b>Security</b><small>Review scan results</small></button>
            <button className="quick-card" onClick={() => setScreen('artifacts')}><span className="quick-icon blue"><Package/></span><b>Artifacts</b><small>Inspect outputs</small></button>
          </div>
          <section className="panel pipeline-panel">
            <div className="panel-heading"><div><h2>Pipeline status</h2><p>Illustrative sample · not live telemetry</p></div><span className="pill warning"><Activity size={13}/> DEMO</span></div>
            {stages.map((stage) => <div className="stage-row" key={stage.name}><span className={`stage-icon ${stage.state}`}>{stage.state === 'done' ? <Check size={15}/> : stage.state === 'running' ? <Activity size={15}/> : <Circle size={13}/>}</span><div className="stage-copy"><b>{stage.name}</b><small>{stage.detail}</small></div><span className={`stage-state ${stage.state}`}>{stage.state === 'done' ? 'Complete' : stage.state === 'running' ? 'Illustrative' : 'Blocked'}</span></div>)}
            <button className="primary-btn full" onClick={() => setScreen('sources')}><Play size={16}/> Start a capture <ArrowRight size={16}/></button>
          </section>
          <section className="widget-card">
            <div className="widget-top"><div className="widget-brand"><BrandMark/><div><b>Mirror status widget</b><small>Local preview</small></div></div><span className="pill muted">PREVIEW</span></div>
            <div className="widget-track">{['Capture','Normalize','Scan','Build','Deploy'].map((s,i)=><div key={s} className={`widget-step ${i<3?'done':i===3?'current':''}`}><span>{i<3?<Check size={14}/>:i===3?<Activity size={14}/>:<Circle size={12}/>}</span><small>{s}</small></div>)}</div>
            <div className="progress-track"><span style={{width:'67%'}}/></div>
            <div className="widget-bottom"><b>Sample project</b><span>67% · illustrative</span></div>
          </section>
        </>}

        {screen === 'sources' && <>
          <PageHeading eyebrow="INPUT ADAPTERS" title="Choose a source" description="Capture only projects and files you are authorized to access." onBack={() => setScreen('home')}/>
          <div className="source-list">{sources.map((item) => {const Icon = item.icon; return <button className="source-card" key={item.name} onClick={() => {setSource(item.name); showNotice(`${item.name} selected. Choose an authorized export, local directory, or connected adapter in the real CLI.`);}}><span className={`source-icon ${item.tone}`}><Icon size={21}/></span><span className="source-text"><b>{item.name}</b><small>{item.detail}</small></span>{source === item.name ? <span className="selected-check"><Check size={15}/></span> : <ChevronRight size={18} className="muted-icon"/>}</button>})}</div>
          <div className="notice-card"><LockKeyhole size={18}/><p><b>Authorization boundary</b><br/>No login bypass, secret extraction, or hidden backend access. Provider integrations must use supported exports or authorized credentials.</p></div>
          <button className="primary-btn full" onClick={() => startCapture(source)}><ArrowDownToLine size={17}/> Prepare {source} capture <ArrowRight size={16}/></button>
        </>}

        {screen === 'pipeline' && <>
          <PageHeading eyebrow="RUN INSPECTION" title="Project pipeline" description={`${source} · sample run · no backend connected`} onBack={() => setScreen('home')}/>
          <section className="panel project-card"><div className="project-title"><span className="project-glyph"><Code2 size={21}/></span><div><h2>sample-project</h2><p>Source capture · demo record</p></div><span className="pill warning">NOT LIVE</span></div><div className="pipeline-rail">{stages.map((s,i)=><div className="rail-item" key={s.name}><span className={`rail-dot ${s.state}`}>{s.state==='done'?<Check size={13}/>:i===3?<Activity size={13}/>:null}</span>{i<stages.length-1&&<span className={`rail-line ${i<3?'done':''}`}/>}<small>{s.name}</small></div>)}</div></section>
          <div className="tab-row">{['Logs','Files','Security','Artifacts'].map(t=><button className={activeTab===t?'active':''} key={t} onClick={() => {setActiveTab(t); if(t==='Security') setScreen('security'); if(t==='Artifacts') setScreen('artifacts')}}>{t}</button>)}</div>
          {activeTab === 'Logs' ? <section className="panel log-panel"><div className="panel-heading"><h2>Run log</h2><span className="pill muted">SAMPLE DATA</span></div>{[['09:41:12','Capture requested','info'],['09:41:14',`${source} adapter selected`,'info'],['09:41:22','Snapshot hash would be recorded here','warn'],['09:41:30','Secret scan result pending real scanner','warn'],['09:42:14','Build result pending isolated worker','warn'],['—','Deployment remains disabled until approval','block']].map(([time,msg,type])=><div className="log-line" key={time+msg}><span>{time}</span><i className={type}/><p>{msg}</p></div>)}</section> : <section className="panel"><h2>{activeTab}</h2><p className="muted-text">Select a tab to inspect the corresponding run data. Live results require a connected pipeline API.</p></section>}
          <button className="secondary-btn full" onClick={() => setScreen('security')}><ShieldCheck size={16}/> Open security results</button>
        </>}

        {screen === 'approvals' && <>
          <PageHeading eyebrow="HUMAN CONTROL REQUIRED" title="Approval gate" description="Remote writes and production releases remain disabled until verified checks and explicit approval." onBack={() => setScreen('home')}/>
          <section className="panel gate-panel"><div className="gate-icon"><ShieldCheck size={26}/></div><h2>Release authorization</h2><p className="muted-text">Sample release · rel_demo_001</p><div className="equation">A = S ∧ B ∧ T ∧ L ∧ P</div><p className="equation-caption">Every required predicate must be verified true.</p>
            {[['Secret scan','S','Not connected'],['Build','B','Not verified'],['Tests','T','Not verified'],['Lockfile / provenance','L','Not verified'],['Policy checks','P','Not verified']].map(([name,code,value])=><div className="gate-check" key={code}><span className="gate-check-icon"><Circle size={15}/></span><span><b>{name}</b><small>Gate {code}</small></span><strong className="stage-state pending">{value}</strong></div>)}
            <div className="blocked-box"><LockKeyhole size={17}/><span>Approval unavailable: required evidence is not connected. This demo cannot authorize deployment.</span></div>
            <div className="approval-actions"><button className="danger-btn" onClick={reject} disabled={rejected}><X size={16}/>{rejected?'Rejected':'Reject release'}</button><button className="primary-btn" onClick={approve} disabled><Check size={16}/>Approve</button></div>
            {approved && <p className="inline-result success">Demo approval recorded; no external action taken.</p>}{rejected && <p className="inline-result danger">Release rejected in local UI state.</p>}
          </section>
          <section className="panel audit-panel"><h3>Audit record preview</h3><KeyValue label="Operator" value="Local user · not authenticated"/><KeyValue label="Evidence" value="Missing / unverified"/><KeyValue label="External writes" value="Disabled by default"/><KeyValue label="Audit persistence" value="Not connected"/></section>
        </>}

        {screen === 'rollback' && <>
          <PageHeading eyebrow="RECOVERY CONTROLS" title="Verified rollback" description="Select a previous immutable release. A real rollback requires server-side hash verification." onBack={() => setScreen('home')}/>
          <section className="panel rollback-panel"><div className="panel-heading"><div><h2>Release history</h2><p>sample-project · local preview</p></div><RotateCcw size={20} className="cyan-text"/></div>
            {[['v2.4.1','b7c4e1f8a2d3','CURRENT'],['v2.3.0','f5bb16f3c8e9','TARGET'],['v2.2.5','d1a7e4b2c6f0',''],['v2.1.0','8e3c9a1d5b7f','']].map(([version,hash,badge])=><button className={`release-row ${selectedRelease===version?'selected':''} ${badge==='CURRENT'?'current':''}`} key={version} disabled={badge==='CURRENT'} onClick={() => {setSelectedRelease(version);setRollbackConfirm(false)}}><span className="release-icon"><Archive size={17}/></span><span className="release-data"><b>{version}</b><small>{hash}…</small></span>{badge && <span className={`release-badge ${badge==='CURRENT'?'current':'target'}`}>{badge}</span>}</button>)}
            <div className="hash-box"><div className="hash-heading"><ShieldCheck size={15}/> Hash verification</div><code>H(target) = H(stored target)</code><p><Clock3 size={14}/> Verification has <b>not run</b> — sample hash only.</p></div>
            <div className="warning-box"><b>Preserve the current release</b><p>A real rollback must verify the target artifact, atomically switch the release pointer, and retain the current release for recovery.</p></div>
            <button className="primary-btn full" onClick={rollback}><RotateCcw size={16}/>{rollbackConfirm?`Confirm demo rollback to ${selectedRelease}`:`Review rollback to ${selectedRelease}`}</button>
          </section>
        </>}

        {screen === 'security' && <>
          <PageHeading eyebrow="VALIDATION" title="Security scan" description="No scanner is connected. These are required checks, not claimed scan results." onBack={() => setScreen('pipeline')}/>
          <div className="security-summary"><Shield size={24}/><div><b>Awaiting real scan results</b><small>Do not approve a release from placeholder evidence.</small></div></div>
          {[['Secret detection','Search source files for exposed credentials and private keys.'],['Dependency audit','Evaluate lockfile dependencies against an up-to-date advisory source.'],['Policy gates','Check file-size limits, lockfile, provenance and disallowed operations.'],['License compliance','Inventory licenses and apply the project’s explicit allow/deny policy.']].map(([name,desc])=><section className="panel scan-row" key={name}><span className="scan-symbol"><ScanSearch size={19}/></span><div><h3>{name}</h3><p>{desc}</p><span className="pill warning">NOT RUN</span></div></section>)}
          <div className="notice-card"><LockKeyhole size={18}/><p>Security status stays unknown until the backend supplies scan evidence and a digest bound to the captured source.</p></div>
        </>}

        {screen === 'artifacts' && <>
          <PageHeading eyebrow="BUILD OUTPUTS" title="Artifacts" description="Artifact records should be content-addressed and traceable to their source capture." onBack={() => setScreen('pipeline')}/>
          <section className="panel artifact-card"><div className="artifact-top"><span className="artifact-symbol"><Package size={22}/></span><span className="pill warning">NO ARTIFACT</span></div><h2>No verified artifacts yet</h2><p className="muted-text">Connect the isolated build worker to publish artifact metadata here.</p><div className="artifact-meta"><KeyValue label="Source digest" value="Not available"/><KeyValue label="Artifact digest" value="Not available"/><KeyValue label="Build provenance" value="Not available"/><KeyValue label="Storage location" value="Not configured"/></div><button className="secondary-btn full" onClick={() => setScreen('pipeline')}><Terminal size={16}/> Return to pipeline</button></section>
        </>}
      </main>

      <nav className="bottom-nav">{navItems.map(({id,label,icon:Icon})=><button key={id} className={screen===id?'active':''} onClick={() => setScreen(id)}><Icon size={20}/><span>{label}</span></button>)}</nav>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
    <div className="desktop-note"><BrandMark/><h2>Sovereign Mirror Pipeline</h2><p>Mobile-first local capture and release governance UI.</p><div className="desktop-feature"><CheckCircle2/> Approval gate with explicit safety boundaries</div><div className="desktop-feature"><CheckCircle2/> Rollback screen and hash-verification contract</div><div className="desktop-feature"><CheckCircle2/> Security and artifact states do not invent results</div><p className="muted-text">This frontend is a UI foundation. It does not connect to <code>mirror.py</code> until an API adapter is implemented.</p></div>
  </div>;
}

function PageHeading({eyebrow,title,description,onBack}:{eyebrow:string;title:string;description:string;onBack:()=>void}) {
  return <div className="page-heading"><button className="back-link" onClick={onBack}><ArrowLeft size={17}/> Back</button><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>;
}
function KeyValue({label,value}:{label:string;value:string}) { return <div className="key-value"><span>{label}</span><b>{value}</b></div>; }

export default App;