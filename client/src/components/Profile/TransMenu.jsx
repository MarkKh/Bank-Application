import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import inLogo from '../../assets/in.png';
import outLogo from '../../assets/out.png';
import transferLogo from '../../assets/transfer.png';


import DepositForm from '../Model/DepositModal';
import WithdrawalForm from '../Model/WithdrawalModal';
import TransferForm from '../Model/TransferModal';

const stats = [
    { id: 1, name: 'Deposit', value: 'Deposit', path: '', logo: inLogo },
    { id: 2, name: 'Transfers', value: 'Transfers', path: '', logo: transferLogo }, // Add your logo here
    { id: 3, name: 'Withdrawal', value: 'Withdrawal', path: '', logo: outLogo },
];

export default function TransactionStats() {
    const navigate = useNavigate();

    // Deposit
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

    const openDepositModal = () => {
        setIsDepositModalOpen(true);
    };

    const closeDepositModal = () => {
        setIsDepositModalOpen(false);
    };

    //Withdrawal
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

    const openWithdrawalModal = () => {
        setIsWithdrawalModalOpen(true);
    };

    const closeWithdrawalModal = () => {
        setIsWithdrawalModalOpen(false);
    }


    //Transfer
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

    const openTransferlModal = () => {
        setIsTransferModalOpen(true);
    };

    const closeTransferModal = () => {
        setIsTransferModalOpen(false);
    }

    return (
        <div className="bg-purple-100 py-24 sm:py-32">
            <h1 className="text-center mb-8 text-4xl font-semibold text-gray-800 dark:text-white">Transaction</h1>
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="h-40 w-30 flex flex-col items-center justify-between border border-gray-300 rounded-lg p-4 sm:p-6 h-full flex-1 text-center bg-white dark:bg-gray-800 cursor-pointer"
                            onClick={() => stat.name === 'Deposit' ? openDepositModal() : stat.name === 'Withdrawal' ? openWithdrawalModal() : stat.name === 'Transfers' ? openTransferlModal() : () => navigate(stat.path)}
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

                            <DepositForm onClose={closeDepositModal} />
                        </div>
                    </div>
                </div>
            )}

            {isWithdrawalModalOpen && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen bg-opacity-50 bg-gray-900 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeWithdrawalModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <div className="flex flex-col items-center">
                                <h1 className="order-first text-2xl font-semibold tracking-tight text-blue-800 sm:text-3xl mb-3">Withdrawal</h1>
                                <img className="w-16 h-16 mb-3" src={outLogo} alt="Deposit Logo" />
                            </div>

                            <WithdrawalForm onClose={closeWithdrawalModal} />
                        </div>
                    </div>
                </div>
            )}

            {isTransferModalOpen && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen bg-opacity-50 bg-gray-900 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeTransferModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <div className="flex flex-col items-center">
                                <h1 className="order-first text-2xl font-semibold tracking-tight text-blue-800 sm:text-3xl mb-3">Transfer</h1>
                                <img className="w-16 h-16 mb-3" src={transferLogo} alt="Deposit Logo" />
                            </div>

                            <TransferForm onClose={closeTransferModal} />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}





