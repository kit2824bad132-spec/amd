import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get('/history');
                setHistory(res.data);
            } catch (err) {
                console.error('Failed to fetch history', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back, {user?.username}!</p>
                    </div>
                    <Link to="/upload" className="btn-primary flex items-center shadow-lg hover:shadow-xl transition-all">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Analysis
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agro-600"></div>
                    </div>
                ) : history.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <h3 className="text-lg font-medium text-gray-900">No analyses yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Upload a crop leaf image to get started with AI diagnostics.</p>
                        <Link to="/upload" className="text-agro-600 font-medium hover:text-agro-700">Go to Upload Page &rarr;</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map((record) => (
                            <div key={record._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="h-48 bg-gray-200 relative overflow-hidden">
                                    {/* Using backend URL for images */}
                                    <img
                                        src={`http://localhost:5000${record.imagePath}`}
                                        alt="Crop Leaf"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found' }}
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-sm font-semibold px-2 py-1 rounded-md text-agro-700 shadow-sm">
                                        {record.confidence_score}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{record.disease_name}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">
                                            Health: {record.crop_health_percentage}
                                        </span>
                                        <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                        <p className="text-sm text-gray-700 line-clamp-2" title={record.treatment_recommendation}>
                                            <span className="font-semibold block text-gray-900 mb-0.5">Recommendation:</span>
                                            {record.treatment_recommendation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
