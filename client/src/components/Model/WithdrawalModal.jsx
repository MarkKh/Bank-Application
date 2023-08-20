import Swal from 'sweetalert2';
import axios from 'axios';

export default function DepositModal({closeDepositModal}) {

const handleDeposit = async () => {
        try {
            const withdrawalAmount = parseFloat(document.getElementById('withdrawalAmount').value);

            if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
                console.error('Invalid deposit amount');
                return;
            }

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios.post('http://localhost:5001/withdrawal', { amount: withdrawalAmount }, { headers })
                .then((response) => {
                    console.log(response.data.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Withdrawal Successful',
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
        <div className={`fixed top-0 left-0 right-0 z-50 w-full h-screen bg-opacity-50 bg-gray-900`}>
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
                <form className="space-y-6" action="#">
                    <div>
                        <label htmlFor="withdrawalAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            id="withdrawalAmount"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full text inline-flex items-center justify-center px-4 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
                        onClick={handleDeposit}
                    >
                        Withdrawal Now
                    </button>
                </form>
            </div>
        </div>
    );
}
