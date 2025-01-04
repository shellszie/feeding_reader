import {Link, useNavigate} from "react-router";
export default function Logout() {

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <Link to='/login' onClick={handleLogout}><small>Logout</small></Link>
    )
}