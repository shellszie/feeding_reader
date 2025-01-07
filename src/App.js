import './App.css';
import Books from './Books.js';
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './Signup.js';
import Login from './Login.js';
import {Navigate} from 'react-router';
import {Container} from 'react-bootstrap';
import SavedBooks from "./SavedBooks";
import Verify from './Verify';
import Code from './Code';
import Home from './Home.js'
import {SavedProvider} from "./context/SavedContext";
import {ThumbsUpProvider} from "./context/ThumbsUpContext";
import {ThumbsDownProvider} from "./context/ThumbsDownContext";
import {EmailProvider} from "./context/EmailContext";

function App() {

    const ProtectedRoute = ({children}) => {
        if (!localStorage.getItem('jwt')) {
            return <Navigate to="/login" replace />;
        }
        else {
           return children;
        }
    };

    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup pw_reset={false}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/code" element={<Code />} />
                    <Route path="/update_pw" element={<Signup pw_reset={true} />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <EmailProvider>
                                    <ThumbsDownProvider>
                                        <ThumbsUpProvider>
                                            <SavedProvider>
                                                <Home />
                                            </SavedProvider>
                                        </ThumbsUpProvider>
                                    </ThumbsDownProvider>
                                </EmailProvider>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
