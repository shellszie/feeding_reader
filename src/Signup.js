import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {axiosNode, axiosRails} from "./lib.js";
import {useNavigate, Link} from 'react-router';
import Nav from "./Nav.js";


export default function Signup({pw_reset}) {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (pw_reset) {
            setEmail(localStorage.getItem('email'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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

    const update_pw = async (email, password, passwordConfirmation) => {
        try {
            const response = await axiosRails.put('/update_pw', {
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                }
            );
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
                let userData = null;
                if (pw_reset) {
                    userData = await update_pw(email, password, passwordConfirmation);
                    localStorage.setItem("jwt", userData)
                }
                else {
                    userData = await signup(email, password, passwordConfirmation);
                    localStorage.setItem("email", userData.user.email);
                    localStorage.setItem("jwt", userData.token)
                }
                navigate("/");
            }
            catch (error) {
                setErrors({ form: 'Signup failed. Please try again.' });
            }
            console.log('Signup attempted with:', { email, password });
        }
    };

    return (
        <>
             <Nav/>
              <div className="login-wrapper">
                 <div className="login-form-container">
                     {pw_reset &&
                         <h2 className="login-title">
                             Reset Password
                         </h2>
                     }
                     {!pw_reset &&
                         <h2 className="login-title">
                             Sign Up
                         </h2>
                     }
                     <Form onSubmit={handleSubmit}>

                         {
                             !pw_reset &&
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
                         }

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