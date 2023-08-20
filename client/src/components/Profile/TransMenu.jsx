import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import inLogo from '../../assets/in.png';
import outLogo from '../../assets/out.png';
import transferLogo from '../../assets/transfer.png';
import DepositModal from '../Model/DepositModal';

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
                <DepositModal
                    closeDepositModal={closeDepositModal}
                />
            )}
        </div>
    );
}





