import './App.css';
import Books from './Books.js';
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './Signup.js';
import Login from './Login.js';
import {Navigate} from 'react-router';
import {Container} from 'react-bootstrap';
import SavedBooks from "./SavedBooks";
import Verify from './Verify';

function App() {

    const ProtectedRoute = ({
                                jwt,
                                redirectPath = '/login',
                                children,
                            }) => {
        if (!jwt) {
            return <Navigate to={redirectPath} replace />;
        }
        else {
           return children;
        }
    };

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<Books />} />*/}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute jwt={localStorage.getItem('jwt')}>
                                <Books />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute jwt={localStorage.getItem('jwt')}>
                                <SavedBooks />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
