const TransactionStats = () => {
    return (
        <div className="flex items-center p-4 space-x-4 dark:bg-gray-800">
            <button className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Button 1
            </button>
            <button className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                Button 2
            </button>
            <button className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                Button 3
            </button>
        </div>
    );
};

export default TransactionStats;