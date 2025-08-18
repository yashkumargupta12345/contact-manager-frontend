import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../api/services/authService.js';
import { handleApiError } from '../../utils/errorHandler.js';



const Login = ({ onLogin, onSwitchPage, prefillEmail = '' }) => {
    const [formData, setFormData] = useState({
        email: prefillEmail, // Pre-fill with signup email
        password: ''
    });

    // Update email when prefillEmail changes
    useEffect(() => {
        if (prefillEmail) {
            setFormData(prev => ({ ...prev, email: prefillEmail }));
        }
    }, [prefillEmail]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await authService.login(formData);
            onLogin(result.user);
        } catch (error) {
            setError(handleApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">Contact Manager</h1>
                <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-indigo-200"
                >
                    Sign In
                </button>
            </form>

            <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                    onClick={onSwitchPage}
                    className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default Login;


