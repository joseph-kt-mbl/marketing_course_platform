import { useNavigate } from 'react-router-dom';
import { useAuth } from './../authContext';
import './Dashboard.css';

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/');
  };

  const handleStartLearning = () => {
    navigate('/content');
  };

  return (
    <div className="dashboard-container">
      <div className="page-bg"></div>
      <div className="bg-grid"></div>
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <a href="/">📚 MasterMind</a>
        </div>
        <div className="nav-user">
          <span className="user-name">{user?.firstname || 'Welcome'}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-main">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="greeting-icon">🎓</div>
            <h1 className="hero-title">Welcome back, {user?.firstname?.split(' ')[0]}!</h1>
            <p className="hero-sub">You're on your way to becoming a marketing expert. Let's continue your journey.</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Your Learning Progress</h2>
              <span className="badge">0% Complete</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              <div className="progress-stats">
                <div className="stat">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Lessons Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">13</div>
                  <div className="stat-label">Total Lessons</div>
                </div>
              </div>
            </div>

            <button className="primary-button" onClick={handleStartLearning}>
              <span>Start Learning</span>
              <span>→</span>
            </button>
          </div>

          {/* Course Info */}
          <div className="dashboard-card">
            <h2 className="card-title">Course Information</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">{user?.email}</div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🔐</span>
                <div>
                  <div className="info-label">Status</div>
                  <div className="info-value">{user?.isSubscribed ? '✅ Active' : '⏳ Pending Payment'}</div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div>
                  <div className="info-label">Enrollment Date</div>
                  <div className="info-value">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="dashboard-card">
            <h2 className="card-title">Next Steps</h2>
            <div className="steps-list">
              <div className={`step-item ${user?.isSubscribed ? 'completed' : 'pending'}`}>
                <span className="step-number">1</span>
                <div className="step-content">
                  <div className="step-title">Complete Payment</div>
                  <div className="step-desc">Unlock full course access</div>
                </div>
                {user?.isSubscribed && <span className="step-badge">✓</span>}
              </div>
              <div className="step-item pending">
                <span className="step-number">2</span>
                <div className="step-content">
                  <div className="step-title">Start Module 1</div>
                  <div className="step-desc">Fundamentals of Marketing Strategy</div>
                </div>
              </div>
              <div className="step-item pending">
                <span className="step-number">3</span>
                <div className="step-content">
                  <div className="step-title">Complete Quiz</div>
                  <div className="step-desc">Prove your mastery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-card stats-card">
            <h2 className="card-title">Community</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-big-number">12,400+</div>
                <div className="stat-big-label">Students Enrolled</div>
              </div>
              <div className="stat-box">
                <div className="stat-big-number">4.9★</div>
                <div className="stat-big-label">Course Rating</div>
              </div>
              <div className="stat-box">
                <div className="stat-big-number">40+</div>
                <div className="stat-big-label">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {!user?.isSubscribed && (
            <button className="secondary-button" onClick={() => navigate('/pricing')}>
              <span>View Pricing</span>
            </button>
          )}
          <button className="outline-button" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 MasterMind Marketing Academy · All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Dashboard;