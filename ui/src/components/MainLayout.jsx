import React from 'react';
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Fixed navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add">Add Product</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-shrink-0">
                <div className="container">
                    <Outlet />
                </div>
            </main>

            {/* <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">Place sticky footer content here.</span>
                </div>
            </footer> */}
        </>
    );
}

export default MainLayout;
