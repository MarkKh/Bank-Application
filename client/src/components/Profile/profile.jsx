import { useState, useEffect } from "react";
import axios from 'axios';

import DepWithHis from './DepWithHis'

const HeroSection = () => {

    const [account, setAccount] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get('http://localhost:5001/account', { headers });
            setAccount(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container grid px-12 mx-auto md:grid-cols-2">
        <div className="py-16">
            <h1 className="mb-4 text-3xl font-extrabold text-purple-500 dark:text-white md:text-3xl lg:text-4xl">
                Account <span className="text-gray-800">{account.account_id}</span>
            </h1>
            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-sm dark:text-gray-400">Name</dt>
                    <dd className="text-lg font-semibold text-blue-800">{account.name}</dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-sm dark:text-gray-400">Email address</dt>
                    <dd className="text-lg font-semibold text-blue-800">{account.username}</dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-sm dark:text-gray-400">Home address</dt>
                    <dd className="text-lg font-semibold text-blue-800">{account.address}</dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-sm dark:text-gray-400">Balance</dt>
                    <dd className="text-lg font-semibold text-blue-800">{account.balance} THB</dd>
                </div>
            </dl>
        </div>
        <div className="flex flex-col py-16">
            <DepWithHis />
        </div>
    </div>
    );
};

export default HeroSection;