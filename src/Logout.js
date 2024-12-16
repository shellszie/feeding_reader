import {Link, useNavigate} from "react-router";
import Login from './Login.js';
export default function Logout() {

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <Link to='/login' onClick={handleLogout}>Logout</Link>
    )
}