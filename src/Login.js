import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {axiosRails} from './lib.js';
import {Link, useNavigate} from "react-router";
import Nav from "./Nav.js";

export default function Login() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };


    const login = async (email, password) => {
        try {
            const response = await axiosRails.post('/login', {
                email: email,
                password: password
            });
            // { withCredentials: true });
            console.log("response.data = " + response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            try {
                const userData = await login(email, password);
                console.log('Login successful:', userData);
                localStorage.setItem("jwt", userData.token);
                localStorage.setItem('email', userData.user.email);
                navigate("/");
            } catch (error) {
                setErrors({form: 'Login failed. Please try again.'});
            }
            console.log('Login attempted with:', {email, password});
            // Here you would typically send a request to your server
        }
    };

    return (
        <>
            <Nav />
            <div className="login-wrapper">
                <div className="login-form-container">
                    <h2 className="login-title">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>

                        <div className="mt-3">
                            <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
                        </div>
                        <div className="mt-3">
                            <small>Forgot Password? <Link to="/verify">Reset Password</Link></small>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    );
}