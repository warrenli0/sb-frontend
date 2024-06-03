import React from 'react';
import './NavBar.css'
import tweet from '../images/tweet.png';
import { useAuth } from '../hooks/useAuth';

import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function NavBar({ under }: any) {
    const [openoptions, setopenoptions] = useState(false);
    const { currentUser, logout } = useAuth();

    return (
        <div className='top-bar'>
            <h1><Link to="/">SB</Link></h1>
            <div className='top-bar-select'>
                <h1 data-under={under} data-link='1'><Link to="/home">Home</Link></h1>
                <h1 data-under={under} data-link='2'><Link to="/modules">Modules</Link></h1>
                <h1 data-under={under} data-link='3'><Link to="/home">Dashboard</Link></h1>
                <h1 data-under={under} data-link='4'><Link to="/home">Mock Exams</Link></h1>
                <div>
                    <img src={tweet} onClick={() => setopenoptions(!openoptions)} />
                </div>
            </div>
            <div className='top-bar-drop' data-open={openoptions}>
                {currentUser ? (
                    <>
                        {/* <img src={currentUser.photo} className="h-8 w-8 rounded-full" alt="User" /> */}
                        <h2><Link className="text-gray-700 hover:text-blue-600" to="/profile">Profile</Link></h2>
                        <h2 onClick={logout} className="text-red-500 hover:text-red-700">Logout</h2>
                    </>
                ) : (
                    <Link className="text-gray-700 hover:text-blue-600" to="/login">Login</Link>
                )}
            </div>
        </div>
    )
}