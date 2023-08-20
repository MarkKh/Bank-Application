import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthChecker({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        
    }, [navigate]);

    return children;
}

export default AuthChecker;
