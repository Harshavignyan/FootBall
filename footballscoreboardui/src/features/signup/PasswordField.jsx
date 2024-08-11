import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';

const PasswordField = ({ id, name, placeholder, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-3 position-relative">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <Field
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          className="form-control"
          placeholder={placeholder}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={toggleShowPassword}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 10 }}
        >
          <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
        </button>
      </div>
      <ErrorMessage name={name} component="div" className="text-danger mt-1" />
    </div>
  );
};

export default PasswordField;
