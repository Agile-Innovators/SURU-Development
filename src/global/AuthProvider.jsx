import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(
        () => localStorage.getItem('authToken') || null
    );

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
        authToken
            ? localStorage.setItem('authToken', authToken)
            : localStorage.removeItem('authToken');
    }, [authToken]);

    useEffect(() => {
        user
            ? localStorage.setItem('user', JSON.stringify(user))
            : localStorage.removeItem('user');
    }, [user]);

    const login = (token, userInfo) => {
        setAuthToken(token);
        setUser(userInfo);
        setIsSessionExpired(false);
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
    };

    const getAuthToken = () => {
        return authToken;
    };

    const getUser = () => {
        return { user, authToken };
    };

    const updateUser = (userData) => {
        setUser(userData);
        
    };

    return (
        <AuthContext.Provider value={{ login, logout, getAuthToken, getUser, updateUser, isSessionExpired, setIsSessionExpired }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
