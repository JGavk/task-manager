

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">

                < div className="navbar-brand fw-bold fs-3" to="/">
                    Task's To Do
                </div>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        <button className="btn btn-outline-light me-2">
                            Register
                        </button>
                        <button className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;