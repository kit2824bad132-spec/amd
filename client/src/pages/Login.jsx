import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-agro-50 to-green-100">
            <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">

                {/* Soft decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-agro-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                <div className="relative z-10">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Sign in to manage your precision agriculture reports.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg border border-red-200">{error}</div>}

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="input-field bg-white/50 backdrop-blur-sm"
                                    placeholder="farmer@agrointel.ai"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="input-field bg-white/50 backdrop-blur-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-agro-600 hover:bg-agro-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agro-500'} transition-all`}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-agro-600 hover:text-agro-500 transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
