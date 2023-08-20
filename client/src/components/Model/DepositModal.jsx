import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DepositForm = ({ onClose }) => {
    const [depositAmount, setDepositAmount] = useState('');

    const handleDeposit = async () => {
        try {
            const parsedAmount = parseFloat(depositAmount);

            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                console.error('Invalid deposit amount');
                return;
            }

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios.post('http://localhost:5001/deposit', { amount: parsedAmount }, { headers })
                .then((response) => {
                    console.log(response.data.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deposit Successful',
                        text: response.data.message,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            onClose();
                            window.location.reload(true);
                        }
                    });

                })
                .catch((error) => {
                    console.error('Error depositing:', error.message);
                });
        } catch (error) {
            console.error('Error depositing:', error.message);
        }
    };

    return (
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
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                />
            </div>

            <button
                type="button"
                className="w-full text inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
                onClick={handleDeposit}
            >
                Deposit Now
            </button>
        </form>
    );
};

export default DepositForm;
