import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import img from '../../assets/in-trans.png'

const Transfer = () => {
    const [transferData, setTransferData] = useState([]);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await axios.get('http://localhost:5001/transfers', { headers });
                setTransferData(response.data);
            } catch (error) {
                console.error('Error fetching transfers:', error.message);
            }
        };

        fetchTransfers();
    }, []);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const checkID = parseInt(decodedToken.id, 10);

    const filteredTransferData = transferData.filter(transfer => transfer.receiver_account_id === checkID);


    return (
        <div className="container grid px-12 mx-auto md:grid-cols-4">
            <div className="py-16 col-span-1">
                <div className="flex items-center justify-center mx-auto max-w-6xl px-4 lg:px-6 h-full">
                    <img src={img} className="w-20 mb-2" alt="Transfer Menu" />
                </div>
            </div>


            <div className="py-16 col-span-3">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Datetime
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User (receiver)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remain
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sender From
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransferData.map(transfer => (
                                <tr
                                    key={transfer.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{new Date(transfer.timestamp).toLocaleString()}</td>
                                    <td className="px-6 py-4">{transfer.receiver_name}</td>
                                    <td className="px-6 py-4">{transfer.receiver_remain}</td>
                                    <td className="px-6 py-4">
                                        {transfer.sender_account_id === checkID
                                            ? "Sender"
                                            : checkID === transfer.receiver_account_id
                                                ? "Receiver"
                                                : "Other"}
                                    </td>

                                    <td className="px-6 py-4">{transfer.sender_name}</td>
                                    <td className="px-6 py-4 font-semibold text-green-600">+ {transfer.amount}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );

}
export default Transfer;
