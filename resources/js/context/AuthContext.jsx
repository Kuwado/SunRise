import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    console.log(user);
    console.log(currentUser);

    const fetchUser = async () => {
        const resonse = await axios.get(`/api/user?id=${userId}`);
        setUser(resonse.data.user);
        setCurrentUser(resonse.data.user);
    };

    useEffect(() => {
        if (userId) {
            fetchUser();
        } else {
            setUser({});
            setCurrentUser({});
        }
    }, [userId]);

    const updateUser = async () => {
        const formData = new FormData();
        Object.entries(currentUser).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        try {
            const response = await axios.post(`/api/user/update/${currentUser.id}`, formData);
            if (response.status === 200) {
                alert(response.data.message);
                fetchUser();
            }
        } catch (error) {
            alert(response.data.message);
            console.log(error);
        }
    };

    const handleLogin = (token, userRole, user_id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', user_id);
        setIsAuthenticated(true);
        setRole(userRole);
        setUserId(user_id);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setRole('');
        setUserId('');
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                userId,
                user,
                currentUser,
                setUser,
                setCurrentUser,
                updateUser,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
