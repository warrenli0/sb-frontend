import React, { useState, useEffect } from 'react';
import { UserProfile } from '../@types/common';
import { useAuth } from '../hooks/useAuth';

const UserProfileComponent = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentUser.username}'s Profile</h1>
            <p className="text-gray-600 mb-2">Email: {currentUser.email}</p>
            {/* Add more fields as necessary */}
        </div>
    );
};

export default UserProfileComponent;
