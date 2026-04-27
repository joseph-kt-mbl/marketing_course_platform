import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    const accessToken = localStorage.removeItem('accessToken');
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken
        }),
      });
      const data = await res.json();
    
    setUser(null);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1a1f36 100%);
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          color: #f1f5f9;
          padding-bottom: 60px;
        }

        /* Header */
        .dashboard-header {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(203, 213, 225, 0.1);
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
        }

        .nav-items {
          display: flex;
          gap: 30px;
        }

        .nav-item {
          font-size: 14px;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .nav-item:hover {
          color: #3b82f6;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
        }

        .user-email {
          font-size: 11px;
          color: #94a3b8;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: #cbd5e1;
          font-size: 20px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .menu-toggle:hover {
          color: #3b82f6;
        }

        /* Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: 70px;
          right: 30px;
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 12px;
          padding: 8px 0;
          min-width: 180px;
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
        }

        .dropdown-item {
          padding: 12px 20px;
          color: #cbd5e1;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.3s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          padding-left: 24px;
        }

        .dropdown-item.logout {
          color: #ef4444;
          border-top: 1px solid rgba(203, 213, 225, 0.1);
        }

        .dropdown-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
        }

        /* Main Content */
        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 30px;
        }

        .welcome-section {
          margin-bottom: 50px;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-subtitle {
          font-size: 16px;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 16px;
          padding: 30px;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stat-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .stat-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .stat-card:nth-child(4) {
          animation-delay: 0.3s;
        }

        .stat-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(203, 213, 225, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.1);
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .stat-label {
          font-size: 13px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 12px;
        }

        .stat-change {
          font-size: 12px;
          color: #86efac;
        }

        .stat-change.negative {
          color: #fca5a5;
        }

        /* Action Cards */
        .action-section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 20px;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 16px;
          padding: 30px;
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .action-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .action-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .action-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(203, 213, 225, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.1);
        }

        .action-card-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .action-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 8px;
        }

        .action-card-desc {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .action-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        /* Subscription Banner */
        .subscription-banner {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .subscription-banner.expired {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
          border-color: rgba(239, 68, 68, 0.2);
        }

        .subscription-text {
          flex: 1;
        }

        .subscription-label {
          font-size: 12px;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .subscription-label.expired {
          color: #ef4444;
        }

        .subscription-desc {
          font-size: 14px;
          color: #cbd5e1;
        }

        .upgrade-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .upgrade-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 16px 20px;
            flex-direction: column;
            gap: 16px;
          }

          .nav-items {
            display: none;
          }

          .welcome-title {
            font-size: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .action-grid {
            grid-template-columns: 1fr;
          }

          .subscription-banner {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo">📚 LearnHub</div>
          <div className="nav-items">
            <a className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</a>
            <a className="nav-item" onClick={() => navigate('/content')}>Courses</a>
            <a className="nav-item" onClick={() => navigate('/profile')}>Profile</a>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name || 'User'}</div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
          <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
            ⋮
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => navigate('/profile')}>
                👤 Profile
              </button>
              <button className="dropdown-item" onClick={() => navigate('/settings')}>
                ⚙️ Settings
              </button>
              <button className="dropdown-item" onClick={() => navigate('/help')}>
                ❓ Help
              </button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="welcome-subtitle">
            You're doing great! Continue learning and unlock your potential.
          </p>
        </div>

        {/* Subscription Banner */}
        {user?.isSubscribed ? (
          <div className="subscription-banner">
            <div className="subscription-text">
              <div className="subscription-label">✓ Premium Active</div>
              <div className="subscription-desc">
                You have access to all courses and premium content. Enjoy unlimited learning!
              </div>
            </div>
            <button className="upgrade-button">Manage Subscription</button>
          </div>
        ) : (
          <div className="subscription-banner expired">
            <div className="subscription-text">
              <div className="subscription-label expired">⚠ Free Plan</div>
              <div className="subscription-desc">
                Upgrade to premium to unlock all courses and exclusive content.
              </div>
            </div>
            <button className="upgrade-button" onClick={() => navigate('/pricing')} style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            }}>
              Upgrade Now
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-label">Courses Enrolled</div>
            <div className="stat-value">{user?.coursesEnrolled || 0}</div>
            <div className="stat-change">Updated today</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-label">Completed</div>
            <div className="stat-value">{user?.coursesCompleted || 0}</div>
            <div className="stat-change">+2 this month</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">{user?.streak || 0} days</div>
            <div className="stat-change">Keep it up!</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-label">Total Points</div>
            <div className="stat-value">{user?.points || 0}</div>
            <div className="stat-change">+150 this week</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="action-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="action-grid">
            <div className="action-card" onClick={() => navigate('/content')}>
              <div className="action-card-icon">📖</div>
              <div className="action-card-title">Continue Learning</div>
              <div className="action-card-desc">
                Pick up where you left off and continue with your next lesson.
              </div>
              <button className="action-button">Start Learning</button>
            </div>

            <div className="action-card" onClick={() => navigate('/courses')}>
              <div className="action-card-icon">🔍</div>
              <div className="action-card-title">Explore Courses</div>
              <div className="action-card-desc">
                Discover new courses and expand your skills in different areas.
              </div>
              <button className="action-button">Browse Courses</button>
            </div>

            <div className="action-card" onClick={() => navigate('/achievements')}>
              <div className="action-card-icon">🏆</div>
              <div className="action-card-title">View Achievements</div>
              <div className="action-card-desc">
                Check your badges and certificates earned from completed courses.
              </div>
              <button className="action-button">View All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;