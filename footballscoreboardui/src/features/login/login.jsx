import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/auth.service';
import { setUser } from './loginSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import InputField from '../signup/InputField';
import PasswordField from '../signup/PasswordField';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await login(values).unwrap();
            dispatch(setUser({
                username: response.username,
                token: response.token,
                role: response.role,
                profilePic: response.profilePic // Capture the profile picture from the response
            }));
            
            // Redirect based on user role
            if (response.role === 'admin') {
                navigate('/dashboard');
            } else if (response.role === 'user') {
                navigate('/dashboard'); // Or any other user-specific route
            }
        } catch (error) {
            setErrors({ server: error.data.message });
        }
        setSubmitting(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <InputField 
                                id="username" 
                                name="username" 
                                type="text" 
                                placeholder="Enter your username" 
                                label="Username"
                            />
                            <PasswordField 
                                id="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                label="Password"
                            />
                            {errors.server && <div className="text-danger mb-3">{errors.server}</div>}
                            <div className="d-grid">
                                <p className="text-center">If you don't have an account <Link to="/signup">Signup</Link></p>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-block" 
                                    disabled={isSubmitting}
                                    style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
