import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import bankLogo from '../assets/bank.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            const { message, token } = response.data;
            if (message === 'Login successful') {
                // Save the token to localStorage
                localStorage.setItem('token', token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate('/profile');
                });
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/profile');
        }
    }, [navigate]);



    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-12 mr-2" src={bankLogo} alt="logo" />
                    XYZ Bank
                </a>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="password"
                                    placeholder="••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
                                >
                                    Sign in
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/index')}
                                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
