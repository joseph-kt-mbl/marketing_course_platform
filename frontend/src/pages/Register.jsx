import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: email || '',
    age: '',
    gender: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.trim().length < 3 ) {
      newErrors.firstName = '⚠ Enter your first firstname';
    }
    if (formData.lastName.trim().length < 3 ) {
      newErrors.lastName = '⚠ Enter your lastname)';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = '⚠ Enter a valid email address';
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 16 || age > 80) {
      newErrors.age = '⚠ Age must be between 16 and 80';
    }

    if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = '⚠ Enter a valid phone number';
    }

    if (formData.password.length < 8) {
      newErrors.password = '⚠ Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '⚠ Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '⚠ Please accept the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (pw) => {
    let strength = 0;
    if (pw.length >= 8) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;
    if (/[^A-Za-z0-9]/.test(pw)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          age: parseInt(formData.age),
          gender: formData.gender,
          phone: '+213' + formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || 'Registration failed' });
        setLoading(false);
        return;
      }

      // Save tokens
      localStorage.setItem('accessToken', data.accessToken);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
      setLoading(false);
    }
  };

  const getStrengthLabel = (strength) => {
    if (strength <= 1) return '🔴 Too Weak';
    if (strength <= 2) return '🟡 Fair';
    return '🟢 Strong';
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return '#EF4444';
    if (strength <= 2) return '#C5A021';
    return '#059669';
  };

  return (
    <div className="register-container">
      <div className="page-bg"></div>
      <div className="bg-grid"></div>
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      <main className="register-main">
        <div className="card-wrapper">
          <div className="reg-card">
            <div className="card-accent"></div>

            <div className="step-bar">
              <div className="step-item">
                <div className="step-circle active">1</div>
                <div className="step-label active">Email <small>Done</small></div>
              </div>
              <div className="step-connector done"></div>
              <div className="step-item">
                <div className="step-circle active">2</div>
                <div className="step-label active">Details <small>Step 2 of 2</small></div>
              </div>
              <div className="step-connector"></div>
              <div className="step-item">
                <div className="step-circle pending">3</div>
                <div className="step-label">Payment <small>Step 3 of 3</small></div>
              </div>
            </div>

            <div className="card-body">
              <div className="card-title">Complete Your Profile</div>
              <div className="card-sub">Fill in your details to get started. Your data is secure and encrypted.</div>

              {errors.submit && (
                <div className="field-msg error">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* First Name */}
                <div className="form-group">
                  <div className="form-label">First Name <span className="label-req">*</span></div>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      name="firstName"
                      className={`input-field ${errors.firstName ? 'invalid' : formData.firstName ? 'valid' : ''}`}
                      placeholder="e.g. Ahmed "
                      value={formData.firstName}
                      onChange={handleChange}
                      maxLength="40"
                    />
                    <span className="input-status">
                      {errors.firstName ? '❌' : formData.firstName ? '✅' : ''}
                    </span>
                  </div>
                  {errors.firstName && <div className="field-msg error">{errors.firstName}</div>}
                </div>
                  {/* Last Name */}
                  <div className="form-group">
                  <div className="form-label">Last Name <span className="label-req">*</span></div>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      name="lastName"
                      className={`input-field ${errors.lastName ? 'invalid' : formData.lastName ? 'valid' : ''}`}
                      placeholder="e.g. Al-Rashidi"
                      value={formData.lastName}
                      onChange={handleChange}
                      maxLength="40"
                    />
                    <span className="input-status">
                      {errors.lastName ? '❌' : formData.lastName ? '✅' : ''}
                    </span>
                  </div>
                  {errors.lastName && <div className="field-msg error">{errors.lastName}</div>}
                </div>

                {/* Email (disabled) */}
                <div className="form-group">
                  <div className="form-label">Email Address <span className="label-req">*</span></div>
                  <div className="input-wrap">
                    <span className="input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      className="input-field valid"
                      value={formData.email}
                      disabled
                    />
                    <span className="input-status">✅</span>
                  </div>
                </div>

                {/* Age + Gender */}
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">Age <span className="label-req">*</span><span className="label-hint">Min. 16</span></div>
                    <div className="input-wrap">
                      <span className="input-icon">🎂</span>
                      <input
                        type="number"
                        name="age"
                        className={`input-field ${errors.age ? 'invalid' : formData.age ? 'valid' : ''}`}
                        placeholder="28"
                        min="16"
                        max="80"
                        value={formData.age}
                        onChange={handleChange}
                      />
                      <span className="input-status">
                        {errors.age ? '❌' : formData.age ? '✅' : ''}
                      </span>
                    </div>
                    {errors.age && <div className="field-msg error">{errors.age}</div>}
                  </div>
                  <div className="form-group">
                    <div className="form-label">Gender <span style={{ color: '#9CA3AF', fontWeight: '500', textTransform: 'none', letterSpacing: '0', fontSize: '.65rem' }}>(Optional)</span></div>
                    <div className="input-wrap">
                      <span className="input-icon" style={{ fontSize: '.85rem' }}>⚧</span>
                      <select
                        name="gender"
                        className="input-field"
                        style={{ paddingLeft: '2.4rem', cursor: 'pointer' }}
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group" style={{ marginTop: '1.1rem' }}>
                  <div className="form-label">Phone Number <span className="label-req">*</span></div>
                  <div className="phone-wrap">
                    <select className="country-select">
                      <option value="+213">🇩🇿 +213</option>
                    </select>
                    <div className="phone-input-wrap">
                      <input
                        type="tel"
                        name="phone"
                        className={`input-field no-li ${errors.phone ? 'invalid' : formData.phone ? 'valid' : ''}`}
                        placeholder="5XX XXX XXXX"
                        maxLength="15"
                        value={formData.phone}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/[^\d\s\-\(\)+]/g, '');
                          setFormData(prev => ({ ...prev, phone: cleaned }));
                        }}
                      />
                      <span className="input-status">
                        {errors.phone ? '❌' : formData.phone ? '✅' : ''}
                      </span>
                    </div>
                  </div>
                  {errors.phone && <div className="field-msg error">{errors.phone}</div>}
                </div>

                <div className="form-divider">Security</div>

                {/* Password */}
                <div className="form-group">
                  <div className="form-label">Create Password <span className="label-req">*</span><span className="label-hint">Min. 8 chars</span></div>
                  <div className="input-wrap">
                    <span className="input-icon">🔑</span>
                    <input
                      type="password"
                      name="password"
                      className={`input-field ${errors.password ? 'invalid' : formData.password ? 'valid' : ''}`}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.password && (
                    <div className="strength-wrap">
                      <div className="strength-row">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className={`strength-seg ${passwordStrength >= i ? (passwordStrength <= 1 ? 'weak' : passwordStrength <= 2 ? 'fair' : 'strong') : ''}`}
                          ></div>
                        ))}
                      </div>
                      <div className="strength-label" style={{ color: getStrengthColor(passwordStrength) }}>
                        {getStrengthLabel(passwordStrength)}
                      </div>
                    </div>
                  )}
                  {errors.password && <div className="field-msg error">{errors.password}</div>}
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <div className="form-label">Confirm Password <span className="label-req">*</span></div>
                  <div className="input-wrap">
                    <span className="input-icon">🔐</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`input-field ${errors.confirmPassword ? 'invalid' : formData.confirmPassword ? 'valid' : ''}`}
                      placeholder="Repeat your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="input-status">
                      {errors.confirmPassword ? '❌' : formData.confirmPassword && !errors.confirmPassword ? '✅' : ''}
                    </span>
                  </div>
                  {errors.confirmPassword && <div className="field-msg error">{errors.confirmPassword}</div>}
                </div>

                {/* Terms */}
                <div className="terms-row">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="terms-checkbox"
                    id="terms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms" className="terms-text">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I confirm I am at least 16 years old.
                  </label>
                </div>
                {errors.agreeTerms && <div className="field-msg error" style={{ marginTop: '-.5rem', marginBottom: '.875rem' }}>{errors.agreeTerms}</div>}

                {/* Submit */}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  <span>{loading ? 'Creating account...' : 'Complete Registration & Proceed'}</span>
                  {loading && <div className="btn-loader"></div>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;