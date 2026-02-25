import React, { useState, useRef } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        if (!selectedFile.type.match('image.*')) {
            setError('Please select an image file (JPEG, PNG).');
            return;
        }
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setError('');
        setResult(null);
    };

    const resetForm = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please select an image first.');
            return;
        }

        setIsAnalyzing(true);
        setError('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await api.post('/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error communicating with AI Service.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-8">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analyze Crop Health</h1>
                        <p className="text-gray-600 mt-1">Upload a leaf image for AI-powered disease detection.</p>
                    </div>
                    <Link to="/dashboard" className="text-agro-600 hover:text-agro-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-1 lg:p-10 flex flex-col md:flex-row gap-10">

                        {/* Upload Area */}
                        <div className={`flex-1 ${result ? 'hidden md:block' : ''}`}>
                            {!preview ? (
                                <div
                                    className="border-3 border-dashed border-gray-300 rounded-2xl h-80 flex flex-col items-center justify-center bg-gray-50 hover:bg-agro-50 hover:border-agro-400 transition-colors cursor-pointer group p-6"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-10 h-10 text-agro-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    </div>
                                    <p className="text-lg font-medium text-gray-700 mb-1">Click or drag image here</p>
                                    <p className="text-sm text-gray-500 text-center">Supported formats: JPG, PNG</p>
                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg, image/png" />
                                </div>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden h-80 bg-gray-900 shadow-inner group">
                                    <img src={preview} alt="Upload Preview" className="w-full h-full object-contain" />

                                    {/* Scanning Animation */}
                                    {isAnalyzing && (
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-agro-400 to-transparent animate-scan shadow-[0_0_15px_rgba(74,222,128,0.8)] filter drop-shadow-[0_0_5px_rgba(74,222,128,1)]" style={{ animationDuration: '2s' }}></div>
                                    )}

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <button onClick={resetForm} disabled={isAnalyzing} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                                            Choose Different Image
                                        </button>
                                    </div>
                                </div>
                            )}

                            {error && <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm">{error}</div>}

                            {preview && !result && (
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className={`mt-6 w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-all ${isAnalyzing ? 'bg-gray-400 animate-pulse' : 'bg-gradient-to-r from-agro-600 to-emerald-500 hover:from-agro-700 hover:to-emerald-600 hover:shadow-xl hover:-translate-y-1'}`}
                                >
                                    {isAnalyzing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            AI is Analyzing...
                                        </span>
                                    ) : 'Start AI Analysis'}
                                </button>
                            )}
                        </div>

                        {/* Results Panel */}
                        {result && (
                            <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm relative overflow-hidden animate-fade-in-up">

                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-agro-100 rounded-full blur-3xl opacity-60"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-agro-100 text-agro-600 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
                                            <p className="text-sm text-gray-500">AMD ROCm Accelerated Model</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Disease Detected</p>
                                            <p className="text-2xl font-extrabold text-gray-900">{result.disease_name}</p>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <p className="text-xs text-gray-500 mb-1 font-medium">CONFIDENCE</p>
                                                <p className="text-xl font-bold text-agro-600">{result.confidence_score}</p>
                                            </div>
                                            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                <p className="text-xs text-gray-500 mb-1 font-medium">PLANT HEALTH</p>
                                                <p className="text-xl font-bold text-emerald-600">{result.crop_health_percentage}</p>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                                            <p className="text-sm font-bold text-yellow-800 mb-1 flex items-center">
                                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                Treatment Recommendation
                                            </p>
                                            <p className="text-gray-700 text-sm">{result.treatment_recommendation}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetForm}
                                        className="w-full mt-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
                                    >
                                        Scan Another Leaf
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
