import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                     Task's To Do
                </Link>
                
                <div className="navbar-nav ms-auto">
                    {user ? (
                        <div className="d-flex align-items-center">
                            <Link to="/tasks" className="btn btn-outline-light btn-sm me-2">
                                My Tasks
                            </Link>
                            <span className="navbar-text text-light me-3">
                                Welcome, {user.email}
                            </span>
                            <button 
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                          
                            <Link to="/register" className="btn btn-outline-light me-2">
                                Register
                            </Link>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;