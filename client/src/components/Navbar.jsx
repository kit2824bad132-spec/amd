import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-agro-600 to-agro-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
                            🌿 AgroIntel AI
                        </Link>
                    </div>
                    <div className="flex space-x-4 items-center">
                        {token ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-agro-600 font-medium transition-colors">Dashboard</Link>
                                <Link to="/upload" className="text-gray-700 hover:text-agro-600 font-medium transition-colors">Analyze Leaf</Link>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors shadow-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-agro-600 font-medium transition-colors">Login</Link>
                                <Link to="/register" className="btn-primary rounded-full px-5">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
