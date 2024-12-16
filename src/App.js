import './App.css';
import Books from './Books.js';
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from './Signup.js';
import Login from './Login.js';
import {Navigate, Outlet} from 'react-router';



function App() {

    const ProtectedRoute = ({
                                jwt,
                                redirectPath = '/login',
                                children,
                            }) => {
        if (!jwt) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />;
    };

    return (
        <div className="App">

            <span className="feeding-reader">Feeding Reader</span>
            <span>Welcome {localStorage.getItem('email')}</span>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<Books />} />*/}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute jwt={localStorage.getItem('jwt')}>
                                <Books />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
