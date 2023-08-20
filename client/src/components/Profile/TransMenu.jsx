import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import inLogo from '../../assets/in.png';
import outLogo from '../../assets/out.png';
import transferLogo from '../../assets/transfer.png';
import axios from 'axios';
import Swal from 'sweetalert2';

const stats = [
    { id: 1, name: 'Deposit', value: 'Deposit', path: '/deposit', logo: inLogo },
    { id: 2, name: 'Transfers', value: 'Transfers', path: '/transfers', logo: transferLogo }, // Add your logo here
    { id: 3, name: 'Withdrawal', value: 'Withdrawal', path: '/withdrawal', logo: outLogo },
];

export default function TransactionStats() {
    const navigate = useNavigate();

    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

    const openDepositModal = () => {
        setIsDepositModalOpen(true);
    };

    const closeDepositModal = () => {
        setIsDepositModalOpen(false);
    };

    const handleDeposit = async () => {
        try {
            const depositAmount = parseFloat(document.getElementById('depositAmount').value);

            if (isNaN(depositAmount) || depositAmount <= 0) {
                console.error('Invalid deposit amount');
                return;
            }

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios.post('http://localhost:5001/deposit', { amount: depositAmount }, { headers })
                .then((response) => {
                    console.log(response.data.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deposit Successful',
                        text: response.data.message,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true);
                        }
                    });

                })
                .catch((error) => {
                    console.error('Error depositing:', error.message);
                });

            closeDepositModal();
        } catch (error) {
            console.error('Error depositing:', error.message);
        }
    };


    return (
        <div className="bg-purple-100 py-24 sm:py-32">
            <h1 className="text-center mb-8 text-4xl font-semibold text-gray-800 dark:text-white">Transaction</h1>
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="h-40 w-30 flex flex-col items-center justify-between border border-gray-300 rounded-lg p-4 sm:p-6 h-full flex-1 text-center bg-white dark:bg-gray-800 cursor-pointer"
                            onClick={stat.name === 'Deposit' ? openDepositModal : () => navigate(stat.path)}
                        >
                            {stat.logo && (
                                <img className="w-16 h-16 mb-3" src={stat.logo} alt={`${stat.name} Logo`} />
                            )}
                            <dd className="order-first text-2xl font-semibold tracking-tight text-blue-800 sm:text-3xl">
                                {stat.value}
                            </dd>
                            <button
                                className="text-purple-700 hover:text-purple-800 mt-2 cursor-pointer text-sm"
                                onClick={stat.name === 'Deposit' ? openDepositModal : () => navigate(stat.path)}
                            >
                                Go to {stat.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isDepositModalOpen && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen bg-opacity-50 bg-gray-900 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeDepositModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <div className="flex flex-col items-center">
                                <h1 className="order-first text-2xl font-semibold tracking-tight text-blue-800 sm:text-3xl mb-3">Deposit</h1>
                                <img className="w-16 h-16 mb-3" src={inLogo} alt="Deposit Logo" />
                            </div>


                            <form className="space-y-6" action="#">
                                <div>
                                    <label htmlFor="depositAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        id="depositAmount"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter amount"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
                                    onClick={handleDeposit}
                                >
                                    Deposit Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}





