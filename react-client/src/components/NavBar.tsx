import React from 'react';
import './NavBar.css'
import tweet from '../images/tweet.png';

import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Textfit } from 'react-textfit';

export default function NavBar({under}: any) {
    const [openoptions, setopenoptions] = useState(false);

    return (
        <div className='top-bar'>
            <h1><Link to="/">SB</Link></h1>
            <div className='top-bar-select'>
                <h1 data-under={under} data-link='1'><Link to="/home">Home</Link></h1>
                <h1 data-under={under} data-link='2'><Link to="/modules">Modules</Link></h1>
                <h1 data-under={under} data-link='3'><Link to="/home">Dashboard</Link></h1>
                <h1 data-under={under} data-link='4'><Link to="/home">Mock Exams</Link></h1>
                <div>
                    <img src={tweet} onClick={() => setopenoptions(!openoptions)}/>
                </div>
            </div>
            <div className='top-bar-drop' data-open={openoptions}>
                <h2><Link to="/profile">Profile</Link></h2>
                <h2>Settings</h2>
                <h2>Logout</h2>
            </div>
        </div>
    )
}