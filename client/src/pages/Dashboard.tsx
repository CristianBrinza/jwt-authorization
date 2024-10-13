import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/user/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(res.data.msg);
            } catch (err: any) {
                setError(err.response.data.msg || 'Failed to load dashboard');
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <p>{message}</p>
            )}
            {/* Additional content based on role */}
            {authContext?.user.role === 'admin' && <AdminPanel />}
            {authContext?.user.role === 'user' && <UserPanel />}
            {authContext?.user.role === 'visitor' && <VisitorPanel />}
        </div>
    );
};

const AdminPanel = () => (
    <div>
        <h3>Admin Panel</h3>
        <p>Admin-specific content goes here.</p>
    </div>
);

const UserPanel = () => (
    <div>
        <h3>User Panel</h3>
        <p>User-specific content goes here.</p>
    </div>
);

const VisitorPanel = () => (
    <div>
        <h3>Visitor Panel</h3>
        <p>Visitor-specific content goes here.</p>
    </div>
);

export default Dashboard;
