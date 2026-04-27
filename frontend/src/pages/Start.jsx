import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../authContext';

function Start() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate(`/welcome?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="start-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .start-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 50%, #e8ecf1 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .start-container::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          top: -150px;
          right: -150px;
          animation: drift 8s ease-in-out infinite;
        }

        .start-container::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -100px;
          left: -100px;
          animation: drift 10s ease-in-out infinite reverse;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -40px); }
        }

        .start-card {
          background: white;
          border-radius: 24px;
          padding: 60px 50px;
          max-width: 480px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 10;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .start-header {
          margin-bottom: 48px;
          text-align: center;
        }

        .start-emoji {
          font-size: 56px;
          margin-bottom: 20px;
          display: block;
          animation: bounce 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .start-title {
          font-size: 32px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.8px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .start-subtitle {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .form-group {
          margin-bottom: 28px;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          font-size: 20px;
          color: #cbd5e1;
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .start-input {
          width: 100%;
          padding: 14px 18px 14px 52px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #f9fafb;
          color: #0f172a;
        }

        .start-input::placeholder {
          color: #94a3b8;
        }

        .start-input:focus {
          outline: none;
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .start-input:focus + .input-icon {
          color: #6366f1;
        }

        .start-button {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        .start-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .start-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .start-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
        }

        .start-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .start-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 40px 0;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .divider-text {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          white-space: nowrap;
        }

        .footer-link {
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .footer-link a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .footer-link a:hover {
          color: #a855f7;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .start-card {
            padding: 40px 24px;
          }

          .start-title {
            font-size: 24px;
          }

          .start-emoji {
            font-size: 48px;
          }
        }
      `}</style>

      <div className="start-card">
        <div className="start-header">
          <span className="start-emoji">🚀</span>
          <h1 className="start-title">Join Us Today</h1>
          <p className="start-subtitle">
            Enter your email to get started on an amazing journey
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className="start-input"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                required
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>

          <button 
            className="start-button" 
            type="submit"
            disabled={!email.trim()}
          >
            <span className="button-text">
              Let's Go
              <span style={{ fontSize: '18px' }}>→</span>
            </span>
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">secure & free</span>
          <div className="divider-line"></div>
        </div>

        <p className="footer-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Start;