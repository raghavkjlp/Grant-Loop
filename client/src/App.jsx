import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Search, 
  FileText, 
  Plus, 
  Users, 
  Trash2, 
  Edit3, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  X, 
  Filter, 
  Sparkles,
  Info,
  Clock,
  Settings
} from 'lucide-react';

// --- INITIAL DUMMY DATA ---
const DEFAULT_PROFILE = {
  name: "Janhit Samiti Foundation",
  registrationId: "NGO-2024-8893-IND",
  type: "NGO / Charitable Trust",
  taxStatus: "12A & 80G Tax Exempt",
  focusAreas: ["Healthcare", "Education", "Rural Development", "Environment"],
  contactEmail: "info@janhitsamiti.org",
  phone: "+91 98765 43210",
  address: "102, Green Park Avenue, New Delhi, India"
};

const DEFAULT_TEAM = [
  { id: 1, name: "Anil Sharma", email: "anil@janhitsamiti.org", role: "Admin", status: "Active" },
  { id: 2, name: "Mayank Verma", email: "mayank@janhitsamiti.org", role: "Editor", status: "Active" },
  { id: 3, name: "Krishna Kapoor", email: "krishna@janhitsamiti.org", role: "Contributor", status: "Active" },
  { id: 4, name: "Raghav Garg", email: "raghav@janhitsamiti.org", role: "Editor", status: "Active" }
];

const DEFAULT_GRANTS = [
  {
    id: "grant-1",
    name: "Global Green Energy Grant 2026",
    agency: "Earth Care Foundation",
    category: "Environment",
    amount: 150000,
    deadline: "2026-08-15",
    eligibility: "Registered non-profits with > 2 years of environment conservation projects.",
    matchScore: 94,
    description: "Funding support for local community-led environmental conservation and renewable energy initiatives. Priority is given to solar micro-grid installations and afforestation drives."
  },
  {
    id: "grant-2",
    name: "Tech for Good Innovation Fund",
    agency: "TechCorp CSR Trust",
    category: "Technology",
    amount: 85000,
    deadline: "2026-07-30",
    eligibility: "Academic labs and NGOs implementing digital literacy and access solutions.",
    matchScore: 88,
    description: "Accelerating projects that use open-source technology to bridge the digital divide in rural areas. Focus areas include online education modules and telemedicine services."
  },
  {
    id: "grant-3",
    name: "Rural Healthcare Development Grant",
    agency: "Apex Medical Trust",
    category: "Healthcare",
    amount: 250000,
    deadline: "2026-09-10",
    eligibility: "Healthcare NGOs operating in Tier-3 towns or rural clinics.",
    matchScore: 98,
    description: "Comprehensive financial assistance to build mobile health clinics and train local health workers. Offers operational support for up to 18 months."
  },
  {
    id: "grant-4",
    name: "Empower Girls Secondary Education Grant",
    agency: "Starlight Educational Trust",
    category: "Education",
    amount: 120000,
    deadline: "2026-10-05",
    eligibility: "Registered charities working on women's literacy and educational scholarships.",
    matchScore: 92,
    description: "Providing scholarship grants for female students in rural communities. Funds can be utilized for textbooks, school construction, and transport facilities."
  },
  {
    id: "grant-5",
    name: "Clean Water Access Initiative",
    agency: "HydroLife Global NGO",
    category: "Healthcare",
    amount: 60000,
    deadline: "2026-07-22",
    eligibility: "Community-based trusts with verified audits.",
    matchScore: 82,
    description: "Focused on installing sustainable water filtration plants in remote water-scarce villages. Community engagement and training models must be included in the proposal."
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: "app-1",
    grantId: "grant-3",
    title: "Mobile Clinic Expansion Delhi NCR",
    agency: "Apex Medical Trust",
    stage: "in_progress",
    priority: "high",
    owner: "Krishna Kapoor",
    deadline: "2026-09-10",
    subtasks: [
      { id: 101, text: "Draft project proposal", completed: true },
      { id: 102, text: "Prepare itemized medical equipment budget", completed: true },
      { id: 103, text: "Obtain clearance certificates from local authorities", completed: false },
      { id: 104, text: "Collect reference letters from past community partners", completed: false }
    ]
  },
  {
    id: "app-2",
    grantId: "grant-1",
    title: "Rural Rooftop Solar Phase-2",
    agency: "Earth Care Foundation",
    stage: "draft",
    priority: "medium",
    owner: "Raghav Garg",
    deadline: "2026-08-15",
    subtasks: [
      { id: 201, text: "Formulate technical feasibility report", completed: true },
      { id: 202, text: "Draft sustainability outline", completed: false },
      { id: 203, text: "Update 12A tax exemption documents", completed: false }
    ]
  },
  {
    id: "app-3",
    grantId: "grant-2",
    title: "Digital Saksharta - School Tablets",
    agency: "TechCorp CSR Trust",
    stage: "submitted",
    priority: "high",
    owner: "Mayank Verma",
    deadline: "2026-07-30",
    subtasks: [
      { id: 301, text: "Submit final application portal doc", completed: true },
      { id: 302, text: "Send pitch deck to CSR board", completed: true }
    ]
  },
  {
    id: "app-4",
    grantId: "grant-5",
    title: "Water Filtration Plant - Alwar",
    agency: "HydroLife Global NGO",
    stage: "approved_rejected",
    priority: "low",
    owner: "Anil Sharma",
    deadline: "2026-07-22",
    subtasks: [
      { id: 401, text: "Submit feasibility audit", completed: true },
      { id: 402, text: "Conduct initial site test", completed: true },
      { id: 403, text: "Receive formal sanction letter", completed: true }
    ]
  }
];

const DEFAULT_DOCUMENTS = [
  { id: "doc-1", name: "12A_Registration_Certificate.pdf", category: "Tax Exemption", uploadDate: "2025-01-10", expiryDate: "2030-01-10", status: "Valid" },
  { id: "doc-2", name: "80G_Tax_Exempt_Status.pdf", category: "Tax Exemption", uploadDate: "2025-01-12", expiryDate: "2030-01-12", status: "Valid" },
  { id: "doc-3", name: "Audited_Financial_Statement_FY25.pdf", category: "Financial Audit", uploadDate: "2025-06-01", expiryDate: "2026-06-01", status: "Expired" },
  { id: "doc-4", name: "NGO_Profile_Brochure_2026.pdf", category: "Proposal Template", uploadDate: "2026-01-05", expiryDate: "2027-01-05", status: "Valid" },
  { id: "doc-5", name: "Board_Resolution_Authorization.pdf", category: "Authorization Docs", uploadDate: "2026-03-20", expiryDate: "2026-09-20", status: "Expiring Soon" }
];

const DEFAULT_ACTIVITIES = [
  { timestamp: "10 mins ago", text: "Raghav Garg updated the Rural Rooftop Solar proposal draft", type: "update" },
  { timestamp: "2 hours ago", text: "Anil Sharma invited Krishna Kapoor to the platform", type: "team" },
  { timestamp: "1 day ago", text: "Mayank Verma submitted application: Digital Saksharta - School Tablets", type: "submit" },
  { timestamp: "3 days ago", text: "Krishna Kapoor uploaded Board_Resolution_Authorization.pdf", type: "document" }
];

// --- APP COMPONENT ---
function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Application Data States (Hydrate from LocalStorage or defaults)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('gl_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('gl_team');
    return saved ? JSON.parse(saved) : DEFAULT_TEAM;
  });
  
  const [grants, setGrants] = useState(() => {
    const saved = localStorage.getItem('gl_grants');
    return saved ? JSON.parse(saved) : DEFAULT_GRANTS;
  });
  
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('gl_applications');
    return saved ? JSON.parse(saved) : DEFAULT_APPLICATIONS;
  });
  
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('gl_documents');
    return saved ? JSON.parse(saved) : DEFAULT_DOCUMENTS;
  });
  
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('gl_activities');
    return saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
  });

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('gl_notifs');
    return saved ? JSON.parse(saved) : { emailAlerts: true, slackSync: false, pushReminders: true };
  });

  // Toasts Alert State
  const [toasts, setToasts] = useState([]);

  // Modals & UI States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddGrantOpen, setIsAddGrantOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState(null); // Detailed view
  const [selectedApplication, setSelectedApplication] = useState(null); // Detailed tracker view

  // Filters State (Repository)
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fundingFilter, setFundingFilter] = useState('All');

  // Persistence Synchronizers
  useEffect(() => { localStorage.setItem('gl_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('gl_team', JSON.stringify(teamMembers)); }, [teamMembers]);
  useEffect(() => { localStorage.setItem('gl_grants', JSON.stringify(grants)); }, [grants]);
  useEffect(() => { localStorage.setItem('gl_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('gl_documents', JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem('gl_activities', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem('gl_notifs', JSON.stringify(notificationSettings)); }, [notificationSettings]);

  // Toast Trigger Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Activity Log Helper
  const logActivity = (text, type = 'update') => {
    const newActivity = { timestamp: "Just now", text, type };
    setActivities(prev => [newActivity, ...prev.slice(0, 15)]);
  };

  // --- ACTIONS ---
  
  // Profile Update
  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditProfileOpen(false);
    showToast("Organization Profile updated successfully", "success");
    logActivity("Updated organization profile details", "update");
  };

  // Team Invite
  const handleAddMember = (name, email, role) => {
    if (!name || !email) return;
    const newMember = {
      id: Date.now(),
      name,
      email,
      role,
      status: "Active"
    };
    setTeamMembers(prev => [...prev, newMember]);
    setIsAddMemberOpen(false);
    showToast(`Invited ${name} (${role}) to team`, "success");
    logActivity(`Invited ${name} to team as ${role}`, "team");
  };

  // Remove Team Member
  const handleRemoveMember = (id, name) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    showToast(`Removed ${name} from team`, "warning");
    logActivity(`Removed team member ${name}`, "team");
  };

  // Add Custom Opportunity
  const handleAddGrant = (newGrant) => {
    const grantId = `grant-${Date.now()}`;
    const newGrantObj = { ...newGrant, id: grantId, matchScore: Math.floor(Math.random() * 20) + 80 };
    setGrants(prev => [newGrantObj, ...prev]);
    setIsAddGrantOpen(false);
    showToast(`Opportunity "${newGrant.name}" added`, "success");
    logActivity(`Created new custom grant opportunity: ${newGrant.name}`, "update");
  };

  // Initiate Application from Repository
  const handleApplyToGrant = (grant) => {
    // Check if application already exists
    const exists = applications.find(app => app.grantId === grant.id);
    if (exists) {
      showToast(`Application already in progress: ${exists.title}`, "info");
      setActiveTab('tracker');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      grantId: grant.id,
      title: `${grant.name} Proposal`,
      agency: grant.agency,
      stage: 'draft',
      priority: 'medium',
      owner: teamMembers[0]?.name || "Unassigned",
      deadline: grant.deadline,
      subtasks: [
        { id: Date.now() + 1, text: "Draft introductory description", completed: false },
        { id: Date.now() + 2, text: "Itemize funding allocation sheet", completed: false },
        { id: Date.now() + 3, text: "Review proposal matching criteria", completed: false }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Created new application for ${grant.name}`, "success");
    logActivity(`Initiated application for grant: ${grant.name}`, "update");
    setActiveTab('tracker');
  };

  // Update Application Stage
  const handleMoveApplication = (appId, newStage) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const stageNames = {
          draft: "Draft",
          in_progress: "In Progress",
          submitted: "Submitted",
          approved_rejected: "Decision/Archived"
        };
        showToast(`Moved "${app.title}" to ${stageNames[newStage]}`, "info");
        logActivity(`Moved application "${app.title}" to ${stageNames[newStage]}`, "update");
        return { ...app, stage: newStage };
      }
      return app;
    }));
  };

  // Toggle Subtask Completion in Application Tracker
  const handleToggleSubtask = (appId, subtaskId) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedSubtasks = app.subtasks.map(sub => {
          if (sub.id === subtaskId) {
            return { ...sub, completed: !sub.completed };
          }
          return sub;
        });
        return { ...app, subtasks: updatedSubtasks };
      }
      return app;
    }));
  };

  // Add Custom Application directly in tracker
  const handleAddCustomApp = (newAppInfo) => {
    const newApp = {
      id: `app-${Date.now()}`,
      grantId: "custom",
      title: newAppInfo.title,
      agency: newAppInfo.agency,
      stage: 'draft',
      priority: newAppInfo.priority,
      owner: newAppInfo.owner,
      deadline: newAppInfo.deadline,
      subtasks: [
        { id: Date.now() + 1, text: "Draft first pitch documentation", completed: false },
        { id: Date.now() + 2, text: "Define budget request structures", completed: false }
      ]
    };
    setApplications(prev => [newApp, ...prev]);
    showToast(`Added custom application "${newAppInfo.title}"`, "success");
    logActivity(`Added custom application tracking: ${newAppInfo.title}`, "update");
  };

  // Delete Application
  const handleDeleteApp = (id, title) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    setSelectedApplication(null);
    showToast(`Deleted tracker for "${title}"`, "warning");
    logActivity(`Deleted application tracker for: ${title}`, "update");
  };

  // Upload Document
  const handleUploadDoc = (name, category, expiryDate) => {
    if (!name || !category) return;
    const newDocObj = {
      id: `doc-${Date.now()}`,
      name,
      category,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: expiryDate || "No Expiry",
      status: expiryDate ? (new Date(expiryDate) < new Date() ? "Expired" : "Valid") : "Valid"
    };
    setDocuments(prev => [newDocObj, ...prev]);
    setIsAddDocOpen(false);
    showToast(`Document "${name}" uploaded`, "success");
    logActivity(`Uploaded document: ${name}`, "document");
  };

  // Delete Document
  const handleDeleteDoc = (id, name) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast(`Deleted document "${name}"`, "warning");
    logActivity(`Deleted document file: ${name}`, "document");
  };

  // --- STATS COMPUTATION ---
  const activeApplicationsCount = applications.filter(app => app.stage !== 'approved_rejected').length;
  const completedGrantsCount = applications.filter(app => app.stage === 'approved_rejected').length; // Mock won/finalized
  
  // Total secured sum calculation (mocking approved applications as secured)
  const totalFundingSecured = applications
    .filter(app => app.stage === 'approved_rejected')
    .reduce((sum, app) => {
      const grant = grants.find(g => g.id === app.grantId);
      return sum + (grant ? grant.amount : 50000); // Default placeholder amount if custom
    }, 180000); // Base mock offset

  // Pipeline valuation
  const pipelineValue = applications
    .filter(app => app.stage !== 'approved_rejected')
    .reduce((sum, app) => {
      const grant = grants.find(g => g.id === app.grantId);
      return sum + (grant ? grant.amount : 75000);
    }, 0);

  // Success rate computation
  const successRate = 75; // Stat representation

  // --- FILTER OPPORTUNITIES ---
  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          grant.agency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || grant.category === categoryFilter;
    
    let matchesFunding = true;
    if (fundingFilter === 'under50k') matchesFunding = grant.amount < 50000;
    else if (fundingFilter === '50k-150k') matchesFunding = grant.amount >= 50000 && grant.amount <= 150000;
    else if (fundingFilter === 'over150k') matchesFunding = grant.amount > 150000;

    return matchesSearch && matchesCategory && matchesFunding;
  });

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === 'success' && <CheckCircle2 className="toast-icon" style={{color: 'var(--color-success)'}} />}
            {t.type === 'warning' && <AlertTriangle className="toast-icon" style={{color: 'var(--color-warning)'}} />}
            {t.type === 'danger' && <AlertTriangle className="toast-icon" style={{color: 'var(--color-danger)'}} />}
            {t.type === 'info' && <Info className="toast-icon" style={{color: 'var(--color-info)'}} />}
            <span className="toast-message">{t.message}</span>
          </div>
        ))}
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <Sparkles className="menu-item-icon" style={{color: '#fff'}} />
          </div>
          <span className="logo-text">GrantLoop</span>
        </div>

        <ul className="sidebar-menu">
          <li 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="menu-item-icon" />
            Dashboard + Analytics
          </li>
          <li 
            className={`menu-item ${activeTab === 'workspace' ? 'active' : ''}`}
            onClick={() => setActiveTab('workspace')}
          >
            <Building2 className="menu-item-icon" />
            Workspace & Org Setup
          </li>
          <li 
            className={`menu-item ${activeTab === 'repository' ? 'active' : ''}`}
            onClick={() => setActiveTab('repository')}
          >
            <Search className="menu-item-icon" />
            Grant Opportunities
          </li>
          <li 
            className={`menu-item ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Briefcase className="menu-item-icon" />
            Application Tracker
          </li>
          <li 
            className={`menu-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText className="menu-item-icon" />
            Docs & Deadlines
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="user-avatar">
            {profile.name ? profile.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : "JS"}
          </div>
          <div className="user-info">
            <span className="user-name">{profile.name}</span>
            <span className="user-role">{profile.type}</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="main-content">
        
        {/* TOP BAR */}
        <header className="top-bar">
          <div className="page-title-container">
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Dashboard & Status Tracking'}
              {activeTab === 'workspace' && 'Workspace & Organization Setup'}
              {activeTab === 'repository' && 'Grant Repository & Opportunity Management'}
              {activeTab === 'tracker' && 'Application Tracker Board'}
              {activeTab === 'documents' && 'Document Upload & Deadline Management'}
            </h1>
            <p className="page-subtitle">
              {activeTab === 'dashboard' && 'Real-time grant pipeline value, analytics and performance statistics'}
              {activeTab === 'workspace' && 'Manage team roles, organization details, and sync preferences'}
              {activeTab === 'repository' && 'Browse, search, and match high-percentage fit grant proposals'}
              {activeTab === 'tracker' && 'Move applications across stages and tracking custom milestones'}
              {activeTab === 'documents' && 'Ensure core tax files stay updated and monitor application deadlines'}
            </p>
          </div>

          <div className="top-bar-actions">
            {activeTab === 'tracker' && (
              <button className="btn btn-primary" onClick={() => setSelectedApplication({ id: 'new' })}>
                <Plus size={16} /> New Application
              </button>
            )}
            {activeTab === 'repository' && (
              <button className="btn btn-primary" onClick={() => setIsAddGrantOpen(true)}>
                <Plus size={16} /> Create Opportunity
              </button>
            )}
            {activeTab === 'documents' && (
              <button className="btn btn-primary" onClick={() => setIsAddDocOpen(true)}>
                <Plus size={16} /> Upload Document
              </button>
            )}
            {activeTab === 'workspace' && (
              <button className="btn btn-secondary" onClick={() => setIsEditProfileOpen(true)}>
                <Edit3 size={16} /> Edit Profile
              </button>
            )}
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="page-body">

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* KPIs */}
              <div className="kpi-grid">
                <div className="card kpi-card">
                  <div className="kpi-icon-wrapper" style={{backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)'}}>
                    <DollarSign size={24} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-value">${totalFundingSecured.toLocaleString()}</span>
                    <span className="kpi-label">Secured Funding</span>
                  </div>
                </div>

                <div className="card kpi-card">
                  <div className="kpi-icon-wrapper" style={{backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)'}}>
                    <TrendingUp size={24} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-value">${pipelineValue.toLocaleString()}</span>
                    <span className="kpi-label">Pipeline Value</span>
                  </div>
                </div>

                <div className="card kpi-card">
                  <div className="kpi-icon-wrapper" style={{backgroundColor: 'var(--color-info-light)', color: 'var(--color-info)'}}>
                    <Briefcase size={24} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-value">{activeApplicationsCount}</span>
                    <span className="kpi-label">Active Proposals</span>
                  </div>
                </div>

                <div className="card kpi-card">
                  <div className="kpi-icon-wrapper" style={{backgroundColor: 'var(--color-warning-light)', color: 'var(--color-warning)'}}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-value">{successRate}%</span>
                    <span className="kpi-label">Conversion Rate</span>
                  </div>
                </div>
              </div>

              {/* DASHBOARD CHARTS */}
              <div className="dashboard-row">
                
                {/* Column 1: Application Stages Chart */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Applications by Development Stage</h3>
                      <p className="card-desc">Volume of active grants distributed by tracking status</p>
                    </div>
                  </div>
                  
                  {/* Custom CSS/SVG Bar Chart */}
                  <div className="chart-container">
                    {[
                      { label: "Draft", value: applications.filter(a => a.stage === 'draft').length, max: 5 },
                      { label: "In Progress", value: applications.filter(a => a.stage === 'in_progress').length, max: 5 },
                      { label: "Submitted", value: applications.filter(a => a.stage === 'submitted').length, max: 5 },
                      { label: "Final Decision", value: applications.filter(a => a.stage === 'approved_rejected').length, max: 5 },
                    ].map((item, idx) => {
                      const pct = Math.max(12, (item.value / 6) * 100);
                      return (
                        <div key={idx} className="chart-bar-wrapper">
                          <div 
                            className="chart-bar-fill" 
                            style={{ 
                              height: `${pct}%`,
                              background: idx === 3 ? 'linear-gradient(to top, var(--color-success), #34d399)' : 'linear-gradient(to top, var(--color-primary), #818cf8)'
                            }}
                          >
                            <span className="chart-bar-value">{item.value}</span>
                          </div>
                          <span className="chart-bar-label">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Circular Target Progress */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Secured Goal Progress</h3>
                      <p className="card-desc">Towards annual target of $300k</p>
                    </div>
                  </div>
                  
                  {/* Radial circle representation */}
                  <div className="circular-progress-container">
                    <svg width="150" height="150" className="progress-ring-svg">
                      <circle className="progress-ring-circle-bg" cx="75" cy="75" r="55" />
                      <circle 
                        className="progress-ring-circle-fill" 
                        cx="75" 
                        cy="75" 
                        r="55" 
                        strokeDasharray="345.5"
                        strokeDashoffset={345.5 - (345.5 * Math.min(100, (totalFundingSecured / 300000) * 100)) / 100}
                      />
                      <text x="75" y="75" className="progress-ring-text">
                        {Math.round((totalFundingSecured / 300000) * 100)}%
                      </text>
                    </svg>
                    <div style={{textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)'}}>
                      <strong>${totalFundingSecured.toLocaleString()}</strong> secured
                    </div>
                  </div>
                </div>

              </div>

              {/* RECENT ACTIVITIES & NOTIFICATION CHECKS */}
              <div className="dashboard-row" style={{gridTemplateColumns: '1fr 1fr'}}>
                
                {/* Activity Feed */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Recent Workspace Activities</h3>
                      <p className="card-desc">Audit logging of actions performed in team space</p>
                    </div>
                  </div>
                  <div className="timeline">
                    {activities.map((act, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-icon">
                          {act.type === 'team' && <Users size={16} />}
                          {act.type === 'document' && <FileText size={16} />}
                          {act.type === 'submit' && <CheckCircle2 size={16} style={{color: 'var(--color-success)'}} />}
                          {act.type === 'update' && <Edit3 size={16} />}
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-title">{act.text}</span>
                          <span className="timeline-time">{act.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deadlines Countdown Dashboard List */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Immediate Submission Deadlines</h3>
                      <p className="card-desc">Applications requiring prompt reviews and submissions</p>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {applications.filter(app => app.stage !== 'approved_rejected').map(app => {
                      const daysLeft = Math.ceil((new Date(app.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                      const isOverdue = daysLeft < 0;
                      return (
                        <div key={app.id} style={{
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '14px', 
                          borderRadius: 'var(--radius-md)', 
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color)'
                        }}>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span style={{fontWeight: 600, fontSize: '14px'}}>{app.title}</span>
                            <span style={{fontSize: '12px', color: 'var(--text-secondary)'}}>{app.agency}</span>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <Clock size={14} style={{color: isOverdue ? 'var(--color-danger)' : daysLeft < 30 ? 'var(--color-warning)' : 'var(--color-success)'}} />
                            <span style={{
                              fontSize: '12px', 
                              fontWeight: 600,
                              color: isOverdue ? 'var(--color-danger)' : daysLeft < 30 ? 'var(--color-warning)' : 'var(--color-success)'
                            }}>
                              {isOverdue ? 'Overdue' : `${daysLeft} days left`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* TAB 2: WORKSPACE SETUP */}
          {activeTab === 'workspace' && (
            <div className="dashboard-row">
              
              {/* Profile Details Card */}
              <div className="card" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div className="card-header" style={{marginBottom: 0}}>
                  <div>
                    <h3 className="card-title">Organization Details</h3>
                    <p className="card-desc">Information utilized for matching opportunities and auto-fill proposals</p>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px 0'}}>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Legal Organization Name</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.name}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Registration ID</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.registrationId}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Organization Category</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.type}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Tax Exemption Status</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.taxStatus}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Primary Contact Email</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.contactEmail}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Contact Phone</span>
                    <span className="grant-detail-val" style={{fontSize: '16px'}}>{profile.phone}</span>
                  </div>
                </div>

                <div className="grant-detail-item" style={{borderTop: '1px solid var(--border-color)', paddingTop: '16px'}}>
                  <span className="grant-detail-label">Registered Headquarters Address</span>
                  <span className="grant-detail-val" style={{fontSize: '14px', fontWeight: 500}}>{profile.address}</span>
                </div>

                <div className="grant-detail-item" style={{borderTop: '1px solid var(--border-color)', paddingTop: '16px'}}>
                  <span className="grant-detail-label">Primary Core Sectors / Focus Areas</span>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px'}}>
                    {profile.focusAreas.map((area, idx) => (
                      <span key={idx} className="badge badge-primary">{area}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar of Workspace: Team Management & Settings */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                
                {/* Team Management */}
                <div className="card">
                  <div className="card-header" style={{marginBottom: '12px'}}>
                    <div>
                      <h3 className="card-title">Team Workspace Members</h3>
                      <p className="card-desc">Assign roles for reviewing proposals and writing drafts</p>
                    </div>
                    <button className="btn-icon-only" onClick={() => setIsAddMemberOpen(true)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {teamMembers.map(member => (
                      <div key={member.id} className="team-member-row">
                        <div className="team-member-info">
                          <div className="owner-circle" style={{width: '32px', height: '32px', fontSize: '12px'}}>
                            {member.name.split(' ').map(n=>n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <span className="team-member-name">{member.name}</span>
                            <div className="team-member-email">{member.email}</div>
                          </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <span className="badge badge-info" style={{fontSize: '10px'}}>{member.role}</span>
                          <button 
                            className="btn-icon-only" 
                            style={{padding: '6px', borderColor: 'transparent', color: 'var(--color-danger)'}}
                            onClick={() => handleRemoveMember(member.id, member.name)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications Config */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">Sync Settings & Alerts</h3>
                      <p className="card-desc">Configure automated reminder prompts and Slack channels</p>
                    </div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="toggle-switch-wrapper">
                      <div className="toggle-switch-label">
                        <span className="toggle-switch-title">Email Alerts</span>
                        <span className="toggle-switch-desc">Weekly upcoming deadline notifications</span>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.emailAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailAlerts: e.target.checked})}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="toggle-switch-wrapper">
                      <div className="toggle-switch-label">
                        <span className="toggle-switch-title">Slack Sync Integration</span>
                        <span className="toggle-switch-desc">Post status tracker moves to Slack</span>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.slackSync}
                          onChange={(e) => {
                            setNotificationSettings({...notificationSettings, slackSync: e.target.checked});
                            showToast(e.target.checked ? "Slack Integration Enabled (Mock)" : "Slack Integration Disabled", "info");
                          }}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="toggle-switch-wrapper">
                      <div className="toggle-switch-label">
                        <span className="toggle-switch-title">Reminders Countdown</span>
                        <span className="toggle-switch-desc">Warn when deadlines are under 7 days</span>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.pushReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, pushReminders: e.target.checked})}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: GRANT REPOSITORY */}
          {activeTab === 'repository' && (
            <>
              {/* SEARCH & FILTERS BAR */}
              <div className="card search-filter-bar">
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by grant name or funding agency..." 
                    className="input-field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                  <Filter size={16} style={{color: 'var(--text-secondary)'}} />
                  
                  <select 
                    className="select-field"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="All">All Sectors</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                  </select>

                  <select 
                    className="select-field"
                    value={fundingFilter}
                    onChange={(e) => setFundingFilter(e.target.value)}
                  >
                    <option value="All">All Funding Size</option>
                    <option value="under50k">Under $50k</option>
                    <option value="50k-150k">$50k - $150k</option>
                    <option value="over150k">Over $150k</option>
                  </select>
                </div>
              </div>

              {/* OPPORTUNITY CARDS GRID */}
              <div className="grant-grid">
                {filteredGrants.map(grant => (
                  <div key={grant.id} className="card grant-card">
                    <div className="grant-badge-row">
                      <span className={`badge ${
                        grant.category === 'Healthcare' ? 'badge-danger' : 
                        grant.category === 'Environment' ? 'badge-success' : 
                        grant.category === 'Education' ? 'badge-warning' : 'badge-primary'
                      }`}>
                        {grant.category}
                      </span>
                      <span className="match-score">
                        <Sparkles size={14} /> {grant.matchScore}% Match
                      </span>
                    </div>

                    <h3 className="grant-name">{grant.name}</h3>
                    <p className="grant-agency">by {grant.agency}</p>

                    <p className="grant-desc">{grant.description}</p>

                    <div className="grant-details">
                      <div className="grant-detail-item">
                        <span className="grant-detail-label">Funding Size</span>
                        <span className="grant-detail-val">${grant.amount.toLocaleString()}</span>
                      </div>
                      <div className="grant-detail-item">
                        <span className="grant-detail-label">Deadline Date</span>
                        <span className="grant-detail-val">{grant.deadline}</span>
                      </div>
                    </div>

                    <div style={{fontSize: '12px', color: 'var(--text-muted)', margin: '12px 0', lineHeight: 1.4}}>
                      <strong>Eligibility:</strong> {grant.eligibility}
                    </div>

                    <div className="grant-actions">
                      <button 
                        className="btn btn-primary" 
                        style={{flex: 1}}
                        onClick={() => handleApplyToGrant(grant)}
                      >
                        Start Application
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setSelectedGrant(grant)}
                      >
                        Full Details
                      </button>
                    </div>
                  </div>
                ))}

                {filteredGrants.length === 0 && (
                  <div className="card" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '48px'}}>
                    <AlertTriangle size={36} style={{color: 'var(--color-warning)', marginBottom: '12px'}} />
                    <h3>No matching grant opportunities found</h3>
                    <p style={{color: 'var(--text-secondary)', marginTop: '8px'}}>Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 4: APPLICATION TRACKER */}
          {activeTab === 'tracker' && (
            <div className="kanban-board">
              
              {/* Stage 1: Draft */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="kanban-column-title-row">
                    <div className="kanban-dot" style={{backgroundColor: 'var(--text-muted)'}}></div>
                    <span className="kanban-column-name">Drafts</span>
                  </div>
                  <span className="kanban-column-count">{applications.filter(a => a.stage === 'draft').length}</span>
                </div>
                <div className="kanban-cards-wrapper">
                  {applications.filter(a => a.stage === 'draft').map(app => (
                    <div key={app.id} className="kanban-card" onClick={() => setSelectedApplication(app)}>
                      <span className={`badge ${app.priority === 'high' ? 'badge-danger' : app.priority === 'medium' ? 'badge-warning' : 'badge-primary'}`} style={{alignSelf: 'flex-start', fontSize: '9px', padding: '2px 6px'}}>
                        {app.priority} Priority
                      </span>
                      <h4 className="kanban-card-title">{app.title}</h4>
                      <div className="kanban-card-meta">
                        <span>by {app.agency}</span>
                      </div>
                      
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-text-row">
                          <span>Milestones</span>
                          <span>{app.subtasks.filter(s=>s.completed).length}/{app.subtasks.length}</span>
                        </div>
                        <div className="progress-bar-track">
                          <div 
                            className="progress-bar-fill" 
                            style={{width: `${(app.subtasks.filter(s=>s.completed).length / app.subtasks.length) * 100}%`}}
                          ></div>
                        </div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                        <div className="kanban-card-owner">
                          <div className="owner-circle">{app.owner.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                          <span style={{fontSize: '11px'}}>{app.owner}</span>
                        </div>
                        <span style={{fontSize: '11px', color: 'var(--color-danger)'}}>{app.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage 2: In Progress */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="kanban-column-title-row">
                    <div className="kanban-dot" style={{backgroundColor: 'var(--color-warning)'}}></div>
                    <span className="kanban-column-name">In Progress</span>
                  </div>
                  <span className="kanban-column-count">{applications.filter(a => a.stage === 'in_progress').length}</span>
                </div>
                <div className="kanban-cards-wrapper">
                  {applications.filter(a => a.stage === 'in_progress').map(app => (
                    <div key={app.id} className="kanban-card" onClick={() => setSelectedApplication(app)}>
                      <span className={`badge ${app.priority === 'high' ? 'badge-danger' : app.priority === 'medium' ? 'badge-warning' : 'badge-primary'}`} style={{alignSelf: 'flex-start', fontSize: '9px', padding: '2px 6px'}}>
                        {app.priority} Priority
                      </span>
                      <h4 className="kanban-card-title">{app.title}</h4>
                      <div className="kanban-card-meta">
                        <span>by {app.agency}</span>
                      </div>
                      
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-text-row">
                          <span>Milestones</span>
                          <span>{app.subtasks.filter(s=>s.completed).length}/{app.subtasks.length}</span>
                        </div>
                        <div className="progress-bar-track">
                          <div 
                            className="progress-bar-fill" 
                            style={{width: `${(app.subtasks.filter(s=>s.completed).length / app.subtasks.length) * 100}%`}}
                          ></div>
                        </div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                        <div className="kanban-card-owner">
                          <div className="owner-circle">{app.owner.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                          <span style={{fontSize: '11px'}}>{app.owner}</span>
                        </div>
                        <span style={{fontSize: '11px', color: 'var(--color-warning)'}}>{app.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage 3: Submitted */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="kanban-column-title-row">
                    <div className="kanban-dot" style={{backgroundColor: 'var(--color-info)'}}></div>
                    <span className="kanban-column-name">Submitted</span>
                  </div>
                  <span className="kanban-column-count">{applications.filter(a => a.stage === 'submitted').length}</span>
                </div>
                <div className="kanban-cards-wrapper">
                  {applications.filter(a => a.stage === 'submitted').map(app => (
                    <div key={app.id} className="kanban-card" onClick={() => setSelectedApplication(app)}>
                      <span className={`badge ${app.priority === 'high' ? 'badge-danger' : app.priority === 'medium' ? 'badge-warning' : 'badge-primary'}`} style={{alignSelf: 'flex-start', fontSize: '9px', padding: '2px 6px'}}>
                        {app.priority} Priority
                      </span>
                      <h4 className="kanban-card-title">{app.title}</h4>
                      <div className="kanban-card-meta">
                        <span>by {app.agency}</span>
                      </div>
                      
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-text-row">
                          <span>Milestones</span>
                          <span>{app.subtasks.filter(s=>s.completed).length}/{app.subtasks.length}</span>
                        </div>
                        <div className="progress-bar-track">
                          <div 
                            className="progress-bar-fill" 
                            style={{width: `${(app.subtasks.filter(s=>s.completed).length / app.subtasks.length) * 100}%`}}
                          ></div>
                        </div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                        <div className="kanban-card-owner">
                          <div className="owner-circle">{app.owner.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                          <span style={{fontSize: '11px'}}>{app.owner}</span>
                        </div>
                        <span style={{fontSize: '11px', color: 'var(--text-secondary)'}}>{app.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage 4: Decision/Archived */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="kanban-column-title-row">
                    <div className="kanban-dot" style={{backgroundColor: 'var(--color-success)'}}></div>
                    <span className="kanban-column-name">Decision Made</span>
                  </div>
                  <span className="kanban-column-count">{applications.filter(a => a.stage === 'approved_rejected').length}</span>
                </div>
                <div className="kanban-cards-wrapper">
                  {applications.filter(a => a.stage === 'approved_rejected').map(app => (
                    <div key={app.id} className="kanban-card" onClick={() => setSelectedApplication(app)}>
                      <span className="badge badge-success" style={{alignSelf: 'flex-start', fontSize: '9px', padding: '2px 6px'}}>
                        Decided / Closed
                      </span>
                      <h4 className="kanban-card-title">{app.title}</h4>
                      <div className="kanban-card-meta">
                        <span>by {app.agency}</span>
                      </div>
                      
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-text-row">
                          <span>Milestones</span>
                          <span>{app.subtasks.filter(s=>s.completed).length}/{app.subtasks.length}</span>
                        </div>
                        <div className="progress-bar-track">
                          <div 
                            className="progress-bar-fill" 
                            style={{
                              width: `${(app.subtasks.filter(s=>s.completed).length / app.subtasks.length) * 100}%`,
                              background: 'var(--color-success)'
                            }}
                          ></div>
                        </div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                        <div className="kanban-card-owner">
                          <div className="owner-circle">{app.owner.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
                          <span style={{fontSize: '11px'}}>{app.owner}</span>
                        </div>
                        <span style={{fontSize: '11px', color: 'var(--text-muted)'}}>{app.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: DOCUMENT VAULT & DEADLINES */}
          {activeTab === 'documents' && (
            <div className="dashboard-row" style={{gridTemplateColumns: '2fr 1fr'}}>
              
              {/* Document Library */}
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">Shared Document Vault</h3>
                    <p className="card-desc">Repository of core verification files to reuse across applications</p>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Category</th>
                        <th>Upload Date</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(doc => (
                        <tr key={doc.id}>
                          <td style={{fontWeight: 600}}>{doc.name}</td>
                          <td>{doc.category}</td>
                          <td>{doc.uploadDate}</td>
                          <td>{doc.expiryDate}</td>
                          <td>
                            <span className={`badge ${
                              doc.status === 'Valid' ? 'badge-success' :
                              doc.status === 'Expired' ? 'badge-danger' : 'badge-warning'
                            }`} style={{fontSize: '10px'}}>
                              {doc.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn-icon-only" 
                              style={{padding: '6px', borderColor: 'transparent', color: 'var(--color-danger)'}}
                              onClick={() => handleDeleteDoc(doc.id, doc.name)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deadlines Calendar Dashboard */}
              <div className="card" style={{height: 'fit-content'}}>
                <div className="card-header">
                  <div>
                    <h3 className="card-title">Milestone & Deadline Tracker</h3>
                    <p className="card-desc">Chronological countdown of incoming grant submission steps</p>
                  </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {applications.map(app => {
                    const daysLeft = Math.ceil((new Date(app.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                    const isOverdue = daysLeft < 0;
                    return (
                      <div key={app.id} style={{
                        display: 'flex', 
                        gap: '12px', 
                        padding: '12px', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid var(--border-color)', 
                        backgroundColor: 'rgba(255, 255, 255, 0.02)'
                      }}>
                        <div style={{
                          width: '40px', 
                          height: '40px', 
                          borderRadius: 'var(--radius-sm)', 
                          backgroundColor: isOverdue ? 'var(--color-danger-light)' : 'var(--color-primary-light)',
                          color: isOverdue ? 'var(--color-danger)' : 'var(--color-primary)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Calendar size={18} />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                          <span style={{fontSize: '13px', fontWeight: 600}}>{app.title}</span>
                          <span style={{fontSize: '11px', color: 'var(--text-secondary)'}}>Due: {app.deadline}</span>
                        </div>
                        <div style={{alignSelf: 'center'}}>
                          <span style={{
                            fontSize: '11px', 
                            fontWeight: 700, 
                            color: isOverdue ? 'var(--color-danger)' : daysLeft < 30 ? 'var(--color-warning)' : 'var(--color-success)'
                          }}>
                            {isOverdue ? 'Overdue' : `${daysLeft}d left`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* --- MODALS --- */}

      {/* 1. EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Organization Details</h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setIsEditProfileOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateProfile({
                name: formData.get('name'),
                registrationId: formData.get('registrationId'),
                type: formData.get('type'),
                taxStatus: formData.get('taxStatus'),
                focusAreas: formData.get('focusAreas').split(',').map(s=>s.trim()),
                contactEmail: formData.get('contactEmail'),
                phone: formData.get('phone'),
                address: formData.get('address')
              });
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Legal Organization Name</label>
                  <input type="text" name="name" defaultValue={profile.name} required className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Registration ID</label>
                    <input type="text" name="registrationId" defaultValue={profile.registrationId} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tax Status Designation</label>
                    <input type="text" name="taxStatus" defaultValue={profile.taxStatus} required className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Organization Category</label>
                    <input type="text" name="type" defaultValue={profile.type} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Core Sectors (comma-separated)</label>
                    <input type="text" name="focusAreas" defaultValue={profile.focusAreas.join(', ')} required className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input type="email" name="contactEmail" defaultValue={profile.contactEmail} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input type="text" name="phone" defaultValue={profile.phone} required className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Headquarters Address</label>
                  <textarea name="address" defaultValue={profile.address} rows="2" required className="form-textarea" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditProfileOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. TEAM MEMBER INVITE MODAL */}
      {isAddMemberOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '420px'}}>
            <div className="modal-header">
              <h3 className="modal-title">Invite Team Workspace Member</h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setIsAddMemberOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddMember(formData.get('name'), formData.get('email'), formData.get('role'));
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" required placeholder="e.g. Mayank Verma" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" required placeholder="e.g. mayank@janhitsamiti.org" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Workspace Role</label>
                  <select name="role" className="select-field" style={{width: '100%'}}>
                    <option value="Editor">Editor</option>
                    <option value="Contributor">Contributor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddMemberOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD OPPORTUNITY MODAL */}
      {isAddGrantOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Create Custom Opportunity</h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setIsAddGrantOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddGrant({
                name: formData.get('name'),
                agency: formData.get('agency'),
                category: formData.get('category'),
                amount: Number(formData.get('amount')),
                deadline: formData.get('deadline'),
                eligibility: formData.get('eligibility'),
                description: formData.get('description')
              });
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Grant Opportunity Name</label>
                  <input type="text" name="name" required placeholder="e.g. Global Renewable Energy Trust" className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Funding Sponsor Agency</label>
                    <input type="text" name="agency" required placeholder="e.g. Earth Green Initiative" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Funding Amount ($)</label>
                    <input type="number" name="amount" required placeholder="e.g. 100000" className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Sector Category</label>
                    <select name="category" className="select-field" style={{width: '100%'}}>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Environment">Environment</option>
                      <option value="Education">Education</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Submission Deadline</label>
                    <input type="date" name="deadline" required className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Eligibility Criteria</label>
                  <input type="text" name="eligibility" required placeholder="e.g. Non-profits active for > 3 years" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Description Summary</label>
                  <textarea name="description" rows="3" required placeholder="Briefly summary of what projects are funded..." className="form-textarea" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddGrantOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Opportunity</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. DETAIL OPPORTUNITY MODAL */}
      {selectedGrant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Opportunity Details</h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setSelectedGrant(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{gap: '16px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span className="badge badge-primary">{selectedGrant.category}</span>
                <span className="match-score" style={{fontSize: '14px'}}>
                  <Sparkles size={16} /> {selectedGrant.matchScore}% Match Score
                </span>
              </div>
              <h2 style={{fontSize: '22px', fontWeight: 800, lineHeight: 1.3}}>{selectedGrant.name}</h2>
              <p style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Sponsor: <strong>{selectedGrant.agency}</strong></p>
              
              <div className="grant-details" style={{margin: '10px 0'}}>
                <div className="grant-detail-item">
                  <span className="grant-detail-label">Funding Size</span>
                  <span className="grant-detail-val" style={{fontSize: '18px', color: 'var(--color-success)'}}>${selectedGrant.amount.toLocaleString()}</span>
                </div>
                <div className="grant-detail-item">
                  <span className="grant-detail-label">Sponsor Deadline</span>
                  <span className="grant-detail-val" style={{fontSize: '18px'}}>{selectedGrant.deadline}</span>
                </div>
              </div>

              <div>
                <h4 style={{fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px'}}>Grant Scope Summary</h4>
                <p style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6}}>{selectedGrant.description}</p>
              </div>

              <div style={{padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)'}}>
                <h4 style={{fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px'}}>Who Can Apply? (Eligibility)</h4>
                <p style={{fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4}}>{selectedGrant.eligibility}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedGrant(null)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => {
                handleApplyToGrant(selectedGrant);
                setSelectedGrant(null);
              }}>Apply Now</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD DOCUMENT MODAL */}
      {isAddDocOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '420px'}}>
            <div className="modal-header">
              <h3 className="modal-title">Upload Legal Document</h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setIsAddDocOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUploadDoc(formData.get('name'), formData.get('category'), formData.get('expiryDate'));
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Document Display Name</label>
                  <input type="text" name="name" required placeholder="e.g. Audit_Report_2026.pdf" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category Designation</label>
                  <select name="category" className="select-field" style={{width: '100%'}}>
                    <option value="Tax Exemption">Tax Exemption</option>
                    <option value="Financial Audit">Financial Audit</option>
                    <option value="Proposal Template">Proposal Template</option>
                    <option value="Authorization Docs">Authorization Docs</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Expiration Date (Optional)</label>
                  <input type="date" name="expiryDate" className="form-input" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddDocOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Document</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DETAIL APPLICATION TRACKER CARD MODAL */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedApplication.id === 'new' ? 'Create Custom Application Tracker' : 'Proposal Work Board'}
              </h3>
              <button className="btn-icon-only" style={{borderColor: 'transparent'}} onClick={() => setSelectedApplication(null)}>
                <X size={18} />
              </button>
            </div>
            {selectedApplication.id === 'new' ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddCustomApp({
                  title: formData.get('title'),
                  agency: formData.get('agency'),
                  priority: formData.get('priority'),
                  owner: formData.get('owner'),
                  deadline: formData.get('deadline')
                });
                setSelectedApplication(null);
              }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Application Draft Title</label>
                    <input type="text" name="title" required placeholder="e.g. Rural Water Supply Alwar" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sponsor Agency Name</label>
                    <input type="text" name="agency" required placeholder="e.g. HydroLife Trust" className="form-input" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Assigned Owner</label>
                      <select name="owner" className="select-field" style={{width: '100%'}}>
                        {teamMembers.map(m => (
                          <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Submission Date</label>
                      <input type="date" name="deadline" required className="form-input" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority Flag</label>
                    <select name="priority" className="select-field" style={{width: '100%'}}>
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedApplication(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create tracker</button>
                </div>
              </form>
            ) : (
              <div className="modal-body" style={{gap: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span className={`badge ${
                    selectedApplication.priority === 'high' ? 'badge-danger' : 
                    selectedApplication.priority === 'medium' ? 'badge-warning' : 'badge-primary'
                  }`}>
                    {selectedApplication.priority} Priority
                  </span>
                  
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Development State:</span>
                    <select 
                      className="select-field"
                      style={{padding: '6px 12px', minWidth: 'auto', fontSize: '13px'}}
                      value={selectedApplication.stage}
                      onChange={(e) => {
                        handleMoveApplication(selectedApplication.id, e.target.value);
                        setSelectedApplication({ ...selectedApplication, stage: e.target.value });
                      }}
                    >
                      <option value="draft">Drafts</option>
                      <option value="in_progress">In Progress</option>
                      <option value="submitted">Submitted</option>
                      <option value="approved_rejected">Decision Made</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h2 style={{fontSize: '20px', fontWeight: 800}}>{selectedApplication.title}</h2>
                  <p style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Grant Agency Sponsor: <strong>{selectedApplication.agency}</strong></p>
                </div>

                <div className="grant-details" style={{margin: 0}}>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Proposal Lead/Owner</span>
                    <span className="grant-detail-val">{selectedApplication.owner}</span>
                  </div>
                  <div className="grant-detail-item">
                    <span className="grant-detail-label">Submission Deadline</span>
                    <span className="grant-detail-val" style={{color: 'var(--color-danger)'}}>{selectedApplication.deadline}</span>
                  </div>
                </div>

                {/* Subtasks Milestones Check list */}
                <div>
                  <h4 style={{fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px'}}>
                    Milestone Tasks Checklist
                  </h4>
                  <div className="subtasks-list">
                    {selectedApplication.subtasks.map(subtask => (
                      <div key={subtask.id} className="subtask-item">
                        <input 
                          type="checkbox" 
                          id={`sub-${subtask.id}`} 
                          className="subtask-checkbox"
                          checked={subtask.completed}
                          onChange={() => {
                            handleToggleSubtask(selectedApplication.id, subtask.id);
                            // Update local modal state
                            setSelectedApplication({
                              ...selectedApplication,
                              subtasks: selectedApplication.subtasks.map(s => s.id === subtask.id ? { ...s, completed: !s.completed } : s)
                            });
                          }}
                        />
                        <label htmlFor={`sub-${subtask.id}`} className="subtask-label">
                          {subtask.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '10px', 
                  borderTop: '1px solid var(--border-color)', 
                  paddingTop: '16px'
                }}>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteApp(selectedApplication.id, selectedApplication.title)}
                  >
                    Delete Tracker
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedApplication(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
