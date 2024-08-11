import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useUsersignupMutation, useAdminsignupMutation } from '../../services/auth.service';
import countryCallingCode from 'country-calling-code';
import InputField from './InputField';
import PasswordField from './PasswordField';
import CountryCodeSelector from './CountryCodeSelector';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminsignup] = useAdminsignupMutation();
  const [usersignup] = useUsersignupMutation();
  const [profilePic, setProfilePic] = useState(null);
  const [countryCode, setCountryCode] = useState(countryCallingCode[0].countryCodes);

  const initialValues = {
    email: '',
    password: '',
    username: '',
    contact: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    username: Yup.string().matches(/^\S*$/, 'Username must not contain spaces').required('Username is required'),
    contact: Yup.string().matches(/^\d{10}$/, 'Contact must be exactly 10 digits').required('Contact is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formattedContact = `+${countryCode}${values.contact}`; // Correctly format the contact number
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('username', values.username);
    formData.append('contact', formattedContact); // Use the formatted contact number
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      if (location.pathname === '/signup') {
        await usersignup(formData).unwrap();
        navigate('/login');
      } else if (location.pathname === '/dashboard/signup') {
        await adminsignup(formData).unwrap();
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ server: error.data.message });
    }
    setSubmitting(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="text-center mb-4">Signup</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting, errors }) => (
            <Form>
              <InputField id="email" name="email" type="email" placeholder="Enter your email" label="Email" />
              <InputField id="username" name="username" type="text" placeholder="Enter your username" label="Username" />
              <PasswordField id="password" name="password" placeholder="Enter your password" label="Password" />
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <CountryCodeSelector
                  countryCallingCode={countryCallingCode}
                  selectedCountryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                />
                <InputField id="contact" name="contact" type="text" placeholder="Enter your contact number" label="Contact" />
              </div>
              <div className="mb-3">
                <label htmlFor="profilePic" className="form-label">Profile Picture</label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  className="form-control"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              {errors.server && <div className="text-danger mb-3">{errors.server}</div>}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}
                >
                  {isSubmitting ? 'Signing up...' : 'Signup'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
