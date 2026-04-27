import { useAuth } from './../authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Content() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      progress: 65,
      lessons: 12,
      completedLessons: 8,
      rating: 4.8,
      instructor: 'John Doe',
      thumbnail: '🎯',
      videoUrl: 'https://example.com/video1',
      materials: ['Lecture Notes', 'Code Examples', 'Practice Exercises']
    },
    {
      id: 2,
      title: 'React Advanced Patterns',
      description: 'Learn advanced patterns in React development',
      progress: 40,
      lessons: 15,
      completedLessons: 6,
      rating: 4.9,
      instructor: 'Jane Smith',
      thumbnail: '⚛️',
      videoUrl: 'https://example.com/video2',
      materials: ['Lecture Notes', 'GitHub Repo', 'Live Coding Sessions']
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      description: 'Complete guide to building full stack applications',
      progress: 20,
      lessons: 20,
      completedLessons: 4,
      rating: 4.7,
      instructor: 'Mike Johnson',
      thumbnail: '🚀',
      videoUrl: 'https://example.com/video3',
      materials: ['Project Files', 'Documentation', 'API Guides']
    }
  ];

  return (
    <div className="content-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .content-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1a1f36 100%);
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          color: #f1f5f9;
          padding-bottom: 60px;
        }

        /* Header */
        .content-header {
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

        .nav-item:hover,
        .nav-item.active {
          color: #3b82f6;
        }

        .nav-item.active::after,
        .nav-item:hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-bar {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 8px;
          padding: 10px 16px;
          color: #f1f5f9;
          font-size: 13px;
          transition: all 0.3s ease;
        }

        .search-bar:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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

        /* Main Content */
        .content-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 30px;
        }

        .content-header-section {
          margin-bottom: 40px;
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

        .content-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .content-subtitle {
          font-size: 16px;
          color: #cbd5e1;
        }

        /* Course Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .course-card {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .course-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .course-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .course-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(203, 213, 225, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 16px 32px rgba(59, 130, 246, 0.15);
        }

        .course-thumbnail {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          border-bottom: 1px solid rgba(203, 213, 225, 0.1);
        }

        .course-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .course-title {
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 8px;
        }

        .course-instructor {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .course-description {
          font-size: 13px;
          color: #cbd5e1;
          margin-bottom: 16px;
          line-height: 1.5;
          flex: 1;
        }

        .course-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 12px;
          color: #94a3b8;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(203, 213, 225, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .course-rating {
          font-size: 12px;
          color: #fbbf24;
          margin-bottom: 16px;
        }

        .course-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .course-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 16px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(203, 213, 225, 0.1);
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .modal-close {
          background: none;
          border: none;
          color: #cbd5e1;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #3b82f6;
        }

        .modal-content {
          padding: 24px;
        }

        .video-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          margin-bottom: 24px;
        }

        .course-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .info-item {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 8px;
          padding: 12px;
        }

        .info-label {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .info-value {
          color: #f1f5f9;
          font-weight: 600;
        }

        .materials-section {
          margin-top: 24px;
        }

        .materials-title {
          font-size: 14px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 12px;
        }

        .material-item {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(203, 213, 225, 0.1);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .material-item:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(203, 213, 225, 0.2);
        }

        .material-name {
          font-size: 13px;
          color: #cbd5e1;
        }

        .material-download {
          color: #3b82f6;
          cursor: pointer;
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .material-download:hover {
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .content-header {
            flex-direction: column;
            gap: 16px;
          }

          .nav-items {
            display: none;
          }

          .search-bar {
            display: none;
          }

          .content-title {
            font-size: 24px;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .course-info {
            grid-template-columns: 1fr;
          }

          .modal {
            width: 95%;
            max-height: 95vh;
          }

          .video-placeholder {
            height: 250px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="content-header">
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/dashboard')}>📚 LearnHub</div>
          <div className="nav-items">
            <a className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</a>
            <a className="nav-item active" onClick={() => navigate('/content')}>Courses</a>
            <a className="nav-item" onClick={() => navigate('/profile')}>Profile</a>
          </div>
        </div>

        <div className="header-right">
          <input className="search-bar" type="text" placeholder="Search courses..." />
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-main">
        <div className="content-header-section">
          <h1 className="content-title">My Courses 📖</h1>
          <p className="content-subtitle">
            Continue learning and expand your skills with our premium courses
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card" onClick={() => setSelectedCourse(course)}>
              <div className="course-thumbnail">{course.thumbnail}</div>
              <div className="course-content">
                <div className="course-title">{course.title}</div>
                <div className="course-instructor">by {course.instructor}</div>
                <div className="course-description">{course.description}</div>

                <div className="course-meta">
                  <span>{course.completedLessons}/{course.lessons} lessons</span>
                  <span className="course-rating">★ {course.rating}</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>

                <button className="course-button" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(course);
                }}>
                  Continue →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selectedCourse.title}</div>
              <button className="modal-close" onClick={() => setSelectedCourse(null)}>×</button>
            </div>

            <div className="modal-content">
              <div className="video-placeholder">▶️</div>

              <div className="course-info">
                <div className="info-item">
                  <div className="info-label">Instructor</div>
                  <div className="info-value">{selectedCourse.instructor}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Rating</div>
                  <div className="info-value">★ {selectedCourse.rating}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Progress</div>
                  <div className="info-value">{selectedCourse.progress}%</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Lessons</div>
                  <div className="info-value">{selectedCourse.completedLessons}/{selectedCourse.lessons}</div>
                </div>
              </div>

              <div className="materials-section">
                <div className="materials-title">Course Materials</div>
                {selectedCourse.materials.map((material, index) => (
                  <div key={index} className="material-item">
                    <span className="material-name">📄 {material}</span>
                    <span className="material-download">⬇️</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;