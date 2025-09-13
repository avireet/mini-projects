import React, { useState } from 'react';
import './PasswordValidator.css';

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return 'weak';
  if (strength === 2 || strength === 3) return 'medium';
  return 'strong';
};

const generatePassword = () => {
  const length = Math.floor(Math.random() * 9) + 8;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default function PasswordValidator() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setStrength(getPasswordStrength(val));
  };

  const handleGenerate = () => {
    const newPass = generatePassword();
    setPassword(newPass);
    setStrength(getPasswordStrength(newPass));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <h2>Password Strength Checker</h2>

      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChange}
          className={`input ${strength}`}
          placeholder="Enter password"
        />
        <span className="toggle-btn" onClick={toggleShowPassword}>
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      {password && (
        <p className={`strength-label ${strength}`}>
          Strength: {strength.charAt(0).toUpperCase() + strength.slice(1)}
        </p>
      )}

      {strength === 'weak' && (
        <button onClick={handleGenerate} className="generate-btn">
          Generate Strong Password
        </button>
      )}
    </div>
  );
}
