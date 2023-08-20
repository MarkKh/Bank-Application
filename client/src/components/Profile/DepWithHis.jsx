import { useState, useEffect } from "react";
import axios from 'axios';

import inLogo from '../../assets/in.png'
import outLogo from '../../assets/out.png'

const UserList = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get('http://localhost:5001/transactions', { headers });
            
            const sortedTransactions = response.data.sort((a, b) => a.timestamp - b.timestamp); // Ascending order

            const last5Transactions = sortedTransactions.slice(-5); // Get the last 5 transactions

            setTransactions(last5Transactions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Transaction History</h1>
            <h2 className="text-lg font-semibold text-gray-400 dark:text-white mb-4">5 recent transactions (withdraw, deposit)</h2>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction, index) => (
                    <li key={index} className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={transaction.transaction_type === 'Deposit' ? inLogo : outLogo} alt="Profile" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {transaction.transaction_type}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {new Date(transaction.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div className={`inline-flex items-center text-base font-semibold ${transaction.transaction_type === 'Deposit' ? 'text-green-500' : 'text-red-500'} dark:text-white`}>
                                {transaction.transaction_type === 'Deposit' ? '+' : '-'} {transaction.amount}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
