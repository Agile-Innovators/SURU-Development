import React from 'react';
import { useAuth } from '../../../global/AuthProvider.jsx';

export const UserAuth = () => {
    const { getUser } = useAuth();
    const user = getUser();

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome!</p>
                    <p>Email: {user.email}</p>
                    <p>ID:{user.id}</p>
                </div>
            ) : (
                <p>No user is logged in.</p>
            )}
        </div>
    );
};
