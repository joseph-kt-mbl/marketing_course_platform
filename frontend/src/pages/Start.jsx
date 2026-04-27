import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Check your email to verify your address!');
        setEmail('');
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-container">
      <style>{`
        :root {
          --navy:        #1A237E;
          --navy-dark:   #0D1257;
          --navy-light:  #283593;
          --gold:        #C5A021;
          --gold-light:  #E8BE3A;
          --gold-dark:   #9C7D12;
          --off-white:   #F8F7F2;
          --gray:        #6B7280;
          --border:      #E5E4EF;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .start-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, var(--navy-dark) 0%, var(--navy) 40%, #1e2d8f 70%, #0a0e3d 100%);
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Background Elements */
        .start-container::before {
          content: '';
          position: absolute;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(197, 160, 33, 0.07) 0%, transparent 70%);
          border-radius: 50%;
          top: -200px;
          right: -200px;
          animation: drift 8s ease-in-out infinite;
          z-index: 0;
        }

        .start-container::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(197, 160, 33, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -150px;
          left: -150px;
          animation: drift 10s ease-in-out infinite reverse;
          z-index: 0;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        .start-card {
          background: white;
          border-radius: 24px;
          padding: 60px 50px;
          max-width: 480px;
          width: 90%;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(197, 160, 33, 0.12);
          position: relative;
          z-index: 10;
          animation: cardIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .card-accent {
          height: 4px;
          background: linear-gradient(90deg, var(--gold-dark), var(--gold-light), var(--gold-dark));
          margin: -60px -50px 40px -50px;
          border-radius: 24px 24px 0 0;
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
          font-weight: 900;
          color: var(--navy-dark);
          margin-bottom: 12px;
          letter-spacing: -0.8px;
          line-height: 1.2;
        }

        .start-subtitle {
          font-size: 15px;
          color: var(--gray);
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .form-group {
          margin-bottom: 28px;
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          color: var(--gray);
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .start-input {
          width: 100%;
          padding: 14px 18px 14px 52px;
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 16px;
          font-family: 'Montserrat', inherit;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: #FAFAF8;
          color: var(--navy-dark);
        }

        .start-input::placeholder {
          color: #9CA3AF;
        }

        .start-input:focus {
          outline: none;
          border-color: var(--navy);
          background: white;
          box-shadow: 0 0 0 4px rgba(26, 35, 126, 0.08);
        }

        .start-input:focus ~ .input-icon {
          color: var(--navy);
        }

        .start-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--navy), var(--navy-light));
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both;
          box-shadow: 0 8px 28px rgba(26, 35, 126, 0.3);
          font-family: 'Montserrat', inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 54px;
        }

        .start-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .start-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        .start-button:hover:not(:disabled) {
          color: var(--navy-dark);
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(197, 160, 33, 0.4);
        }

        .start-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .start-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none !important;
        }

        .button-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .button-loader {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 40px 0;
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .divider-text {
          font-size: 13px;
          color: var(--gray);
          font-weight: 600;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-link {
          text-align: center;
          font-size: 14px;
          color: var(--gray);
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s both;
        }

        .footer-link a {
          color: var(--navy);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s ease;
        }

        .footer-link a:hover {
          color: var(--gold-dark);
        }

        @media (max-width: 640px) {
          .start-card {
            padding: 40px 24px;
          }

          .card-accent {
            margin: -40px -24px 30px -24px;
          }

          .start-title {
            font-size: 24px;
          }

          .start-emoji {
            font-size: 48px;
          }

          .start-button {
            min-height: 48px;
            font-size: 15px;
          }
        }
      `}</style>

      <div className="start-card">
        <div className="card-accent"></div>

        <div className="start-header">
          <span className="start-emoji">🎓</span>
          <h1 className="start-title">Start Learning Today</h1>
          <p className="start-subtitle">
            Enter your email to begin your marketing mastery journey
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
                placeholder="yourname@email.com"
                required
                disabled={loading}
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>

          <button
            className="start-button"
            type="submit"
            disabled={!email.trim() || loading}
          >
            <span className="button-text">
              {loading ? (
                <>
                  <span>Creating account...</span>
                  <div className="button-loader"></div>
                </>
              ) : (
                <>
                  <span>Get Started</span>
                  <span>→</span>
                </>
              )}
            </span>
          </button>
        </form>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">secure & encrypted</span>
          <div className="divider-line"></div>
        </div>

        <p className="footer-link">
          Already have an account? <a href="/dashboard">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Start;