import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useUsersignupMutation, useAdminsignupMutation } from '../../services/auth.service';
import countryCallingCode from 'country-calling-code';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [adminsignup] = useAdminsignupMutation();
    const [usersignup] = useUsersignupMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [countryCode, setCountryCode] = useState(countryCallingCode[0].countryCodes);

    const initialValues = {
        email: '',
        password: '',
        username: '',
        contact: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),
        username: Yup.string()
            .matches(/^\S*$/, 'Username must not contain spaces')
            .required('Username is required'),
        contact: Yup.string()
            .matches(/^\d{10}$/, 'Contact must be exactly 10 digits')
            .required('Contact is required'),
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="text-center mb-4">Signup</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
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
                                <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <Field
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter your username"
                                />
                                <ErrorMessage name="username" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact</label>
                                <div className="input-group">
                                    <select
                                        className="form-select"
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        value={countryCode}
                                    >
                                        {countryCallingCode.map((country) => (
                                            <option key={country.countryCodes} value={country.countryCodes}>
                                                {country.isoCode3} (+{country.countryCodes})
                                            </option>
                                        ))}
                                    </select>
                                    <Field
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        className="form-control"
                                        placeholder="Enter your contact number"
                                    />
                                </div>
                                <ErrorMessage name="contact" component="div" className="text-danger mt-1" />
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
