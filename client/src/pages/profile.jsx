import axios from 'axios';
import { useState, useEffect } from "react";

import CTA from '../components/Profile/TransMenu'
import Header from '../components/MainHeader'
import ProfileData from '../components/Profile/profile'

function Profile(){
    const [transaction, setTransaction] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get('http://localhost:5001/transactions', { headers });
            setTransaction(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <ProfileData />
            <CTA />
            <h1>Transaction History</h1>
            <ul>
                {transaction.map((transaction, index) => (
                    <li key={index}>
                        Transaction Type: {transaction.transaction_type}<br />
                        Amount: {transaction.amount}<br />
                        Date: {transaction.timestamp}<br />
                        {/* Add more fields as needed */}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;
