import { useState } from 'react';
import ReceiveHis from './TransferReceiverHis';
import SenderHis from './TransferSenderHis';

const stats = [
    { id: 1, name: 'Transfer Menu', value: 'Transfer Menu', color: 'red' },
    { id: 2, name: 'Receive Menu', value: 'Receive Menu', color: 'green' },
];

function TransferMenu() {
    const [activeMenu, setActiveMenu] = useState('Transfer Menu');

    const toggleMenu = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div>
            <h1 className="text-center mb-8 text-4xl font-semibold text-gray-800 dark:text-white"></h1>
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center lg:grid-cols-2">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`h-40 w-30 flex flex-col items-center justify-between border border-gray-300 rounded-lg p-4 sm:p-6 h-full flex-1 text-center bg-white dark:bg-gray-800 cursor-pointer ${activeMenu === stat.name ? `bg-${stat.color}-100` : ''}`}
                            onClick={() => toggleMenu(stat.name)}
                        >
                            <dd className={`order-first text-2xl font-semibold tracking-tight text-${stat.color}-800 sm:text-3xl`}>
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </div>
            </div>

            {activeMenu === 'Transfer Menu' && <SenderHis />}
            {activeMenu === 'Receive Menu' && <ReceiveHis />}
        </div>
    );
}

export default TransferMenu;
