import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {axiosRails} from './lib.js';
import {Link, useNavigate} from "react-router";


const Code = () => {

    let navigate = useNavigate();
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!code) {
            newErrors.code = 'Code is required';
        } else if (!(code.match(/[a-zA-Z]/))) {
            newErrors.code = 'Code is invalid';
        }
        return newErrors;
    };

    const verify_code = async () => {
        try {
            const response = await axiosRails.post('/verify_code', {
                code: code,
                email: localStorage.getItem('email')
            });
            return response.statusText;
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
                const result = await verify_code(code);
                if (result == "OK") {
                    navigate("/update_pw");
                }
                else {
                    console.log("error with auth code");
                }
            } catch (error) {
                setErrors({form: 'Code entered did not work.'});
            }
        }
    };

    return (
        <>
            <div className="feeding-reader center-text">
                Feeding Reader
            </div>
            <div className="login-wrapper">
                <div className="login-form-container">
                    <h2 className="login-title">Enter Authentication Code</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                isInvalid={!!errors.code}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.code}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Submit
                        </Button>

                    </Form>
                </div>
            </div>
        </>
    );

}

export default Code;
