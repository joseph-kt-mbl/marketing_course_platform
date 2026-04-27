import { useState } from 'react';
import { useNavigate ,useSearchParams } from 'react-router-dom';

function Register() {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('email');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    if (!formData.password || !formData.confirmPassword || !formData.phoneNumber) {
      setMessage("Please fill in all fields");
      setStatus("error");
      return false;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      setStatus("error");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setStatus("error");
      return false;
    }

    if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      setMessage("Please enter a valid phone number");
      setStatus("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setStatus(null);

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
          phone: formData.phoneNumber,
          firstname: formData.firstName || 'youcef',
          lastname: formData.lastName || 'Abdellaoui',
          email: userEmail
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setMessage("Registration completed successfully!");
      setStatus("success");

      localStorage.setItem('accessToken', data.accessToken);
      
      // Redirect to login after success
        navigate('/dashboard');
    } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return '#ef4444';
    if (passwordStrength <= 2) return '#f97316';
    if (passwordStrength <= 3) return '#eab308';
    if (passwordStrength === 4) return '#84cc16';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    if (passwordStrength === 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="register-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 50%, #e8ecf1 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .register-container::before {
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

        .register-container::after {
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

        .register-card {
          background: white;
          border-radius: 24px;
          padding: 60px 50px;
          max-width: 520px;
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

        .register-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .register-emoji {
          font-size: 56px;
          margin-bottom: 20px;
          display: block;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .register-title {
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

        .register-subtitle {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 24px;
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 18px;
          color: #cbd5e1;
          pointer-events: none;
          transition: color 0.3s ease;
        }

        .register-input {
          width: 100%;
          padding: 12px 14px 12px 48px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #f9fafb;
          color: #0f172a;
        }

        .register-input::placeholder {
          color: #94a3b8;
        }

        .register-input:focus {
          outline: none;
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .register-input:focus + .input-icon {
          color: #6366f1;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: #94a3b8;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #6366f1;
        }

        .password-strength {
          display: flex;
          gap: 4px;
          margin-top: 8px;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          width: 0;
          background: ${props => props.color || '#e2e8f0'};
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .strength-text {
          font-size: 12px;
          font-weight: 600;
          margin-top: 4px;
          color: #64748b;
        }

        .message {
          padding: 14px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.6;
          text-align: center;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 24px;
          border: 1px solid transparent;
        }

        .message.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: #059669;
        }

        .message.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #dc2626;
        }

        .register-button {
          width: 100%;
          padding: 14px 24px;
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
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .register-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .register-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .register-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
        }

        .register-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .register-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .register-card {
            padding: 40px 24px;
          }

          .register-title {
            font-size: 24px;
          }

          .register-emoji {
            font-size: 48px;
          }
        }
      `}</style>

      <div className="register-card">
        <div className="register-header">
          <span className="register-emoji">🔐</span>
          <h1 className="register-title">Almost There!</h1>
          <p className="register-subtitle">
            Set your password and add your phone number to complete your registration
          </p>
        </div>

        {message && (
          <div className={`message ${status}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label">📱 Phone Number</label>
            <div className="input-wrapper">
              <input
                className="register-input"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
              />
              <span className="input-icon">📞</span>
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">🔑 Password</label>
            <div className="input-wrapper">
              <input
                className="register-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
              />
              <span className="input-icon">🔒</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.password && (
              <>
                <div className="password-strength">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: i < passwordStrength ? '100%' : '0%',
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="strength-text">
                  Strength: <span style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">✓ Confirm Password</label>
            <div className="input-wrapper">
              <input
                className="register-input"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <span className="input-icon">✓</span>
            </div>
          </div>

          <button 
            className="register-button" 
            type="submit"
            disabled={loading}
          >
            {loading && <div className="spinner"></div>}
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;