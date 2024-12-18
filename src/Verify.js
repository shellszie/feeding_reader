import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {axiosRails} from './lib.js';
import {Link, useNavigate} from "react-router";


const Verify = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        return newErrors;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            try {
                // const userData = await login(email, password);
                // console.log('Login successful:', userData);
                // localStorage.setItem("jwt", userData.token);
                // localStorage.setItem('email', userData.user.email);
                navigate("/");
            } catch (error) {
                setErrors({form: 'Login failed. Please try again.'});
            }

            // Here you would typically send a request to your server
        }
    };

    return (
        <>
            <div className="feeding-reader center-text">
                Feeding Reader
            </div>
            <div className="login-wrapper">
                <div className="login-form-container">
                    <h2 className="login-title">Reset Password</h2>
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

                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>

                        <Button variant="primary" type="submit" className="w-100">
                            Get verification code
                        </Button>


                    </Form>
                </div>
            </div>
        </>
    );

}

export default Verify;
