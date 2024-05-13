import React from 'react';
import './ModuleTemplate.css'
import badge from '../images/temp-badge.png';
import peng from '../images/module-peng.png';

import NavBar from './NavBar';


import { useState, useEffect } from "react";
import { Textfit } from 'react-textfit';
import { Outlet, Link } from "react-router-dom";

export default function ModuleTemplate({prevRoute='/modules'}: any) {
    return (
        <div className='module-temp-cont'>
            <NavBar under="2"/>
            <img src={peng} id='module-peng'/>
            {/* Back TBD
            <div id='module-temp-back-button'>
                <h3><Link to={prevRoute}>Back</Link></h3>
            </div>
            */}
            <div className='module-temp-head'>
                <div className='module-temp-info'>
                    <h1>Linear Equations</h1>
                    <div></div>
                </div>
                <h2>
                    Well what is linear equation. That I do not know either my friend. But what i do know is that graphing is a necessary skill in order to do a few
                    problems on the exam 👍🏻 
                </h2>
            </div>

            <div className='module-temp-badge'>
                <div className='temp-badge-info'>
                    <Textfit mode="single" max={30}>0% Mastery</Textfit>
                    <Textfit mode="single" max={30} style={{display: "flex", justifyContent: "end", alignItems: "center"}}>ET: 45 Min</Textfit>
                </div>
                <div className='temp-badge-show'>
                    <img src={badge}/>
                    <h3>Fully complete this module to earn this badge!</h3>
                </div>
                <div className='module-temp-continue'>
                    <h2>Start</h2>
                </div>
            </div>
        </div>
    )
}