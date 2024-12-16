import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {baseNodeUrl, baseRailsUrl, signup, axiosRails} from "./lib.js";
import axios from "axios";
import {useNavigate, Link} from 'react-router';


export default function Signup() {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

         if (!passwordConfirmation) {
            newErrors.passwordConfirmation = 'Password confirmation is required';
        }
         else if (passwordConfirmation !== password) {
             newErrors.passwordConfirmation = 'Passwords must match';
         }
        return newErrors;
    };

     const signup = async (email, password, passwordConfirmation) => {
        try {
            const response = await axiosRails.post('/signup', {
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                }
            );
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
                const userData = await signup(email, password, passwordConfirmation);
                console.log('Signup successful:', userData);
                localStorage.setItem("jwt", userData.token);
                localStorage.setItem("email", userData.user.email);
                navigate("/");
            }
            catch (error) {
                setErrors({ form: 'Signup failed. Please try again.' });
            }
            console.log('Signup attempted with:', { email, password });
            // Here you would typically send a request to your server
        }
    };

    return (
        <>
            <div className="feeding-reader">Feeding Reader</div>
              <div className="login-wrapper">
                 <div className="login-form-container">
                    <h2 className="login-title">Sign Up</h2>
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
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password Confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                isInvalid={!!errors.passwordConfirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Sign Up
                        </Button>
                        <div className="mt-3">
                            <small>Already have an account? <Link to="/login">Log In</Link></small>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}