import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex-grow pt-16 flex flex-col justify-center overflow-hidden bg-gradient-to-br from-agro-50 via-white to-green-50 relative">

            {/* Decorative Blur Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-agro-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-20">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 drop-shadow-sm">
                    Precision Agriculture <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-600 to-emerald-500">Powered by AI</span>
                </h1>

                <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                    Detect crop diseases early, get actionable treatment recommendations, and optimize your yield using our advanced deep learning models mapped directly to AMD ROCm architecture.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="btn-primary rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all">
                        Start Free Analysis
                    </Link>
                    <Link to="/login" className="px-8 py-4 rounded-full text-lg font-medium text-agro-700 bg-white border border-agro-200 hover:bg-agro-50 shadow-sm transition-all">
                        Sign In
                    </Link>
                </div>
            </div>

            <div className="relative z-10 w-full mt-auto">
                {/* Placeholder for a nice agriculture graphic or wave */}
                <div className="h-48 bg-gradient-to-t from-agro-100 to-transparent w-full"></div>
            </div>
        </div>
    );
};

export default Home;
