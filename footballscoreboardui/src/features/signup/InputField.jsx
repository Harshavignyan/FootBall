import React from 'react';
import { Field, ErrorMessage } from 'formik';

const InputField = ({ id, name, type, placeholder, label, ...rest }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <Field
      type={type}
      id={id}
      name={name}
      className="form-control"
      placeholder={placeholder}
      {...rest}
    />
    <ErrorMessage name={name} component="div" className="text-danger mt-1" />
  </div>
);

export default InputField;
