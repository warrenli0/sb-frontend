import React from 'react';
import './Profile.css'
import tweet from '../images/tweet.png';

import NavBar from './NavBar';


import { useState, useEffect } from "react";
import { Textfit } from 'react-textfit';

export default function Profile({}) {
    return (
        <div className='profile-cont'>
            <NavBar/>
            <div className='profile-info'>
                <div>
                    <img src={tweet}/>
                </div>
                <div>
                    <h1>Neal Khemani</h1>
                    <h2>King of Chibis</h2>
                </div>
            </div>
            <div className='profile-badges'>
                <h1>Badges</h1>
            </div>
            <div className='profile-stats'>
                <div className='overall-header'>
                    <h1>Overall Stats</h1>
                    <select id="overall-select">
                        <option value="Overall">Overall</option>
                    </select>
                </div>
                <div className='overall-dough-cont'>
                        <span className="dot"></span>
                        <h3>120 attempted</h3>
                </div>
                <div className='overall-bars'>
                    <div className='overall-chunk'>
                        <div className='chunk-head'>
                            <h2 style={{color: "#0FC000"}}>Easy</h2>
                            <h3>45/50</h3>
                        </div>
                        <div className='chunk-outer-bar'>
                            <div className='chunk-inner-bar' style={{height:"100%", width: "90%", backgroundColor: "#00FF57"}}></div>
                        </div>
                    </div>
                    <div className='overall-chunk'>
                        <div className='chunk-head'>
                            <h2 style={{color: "#F0AD00"}}>Medium</h2>
                            <h3>40/50</h3>
                        </div>
                        <div className='chunk-outer-bar'>
                            <div className='chunk-inner-bar' style={{height:"100%", width: "80%", backgroundColor: "#FFD363"}}></div>
                        </div>
                    </div>
                    <div className='overall-chunk'>
                        <div className='chunk-head'>
                            <h2 style={{color: "#D92900"}}>Hard</h2>
                            <h3>15/20</h3>
                        </div>
                        <div className='chunk-outer-bar'>
                            <div className='chunk-inner-bar' style={{height:"100%", width: "75%", backgroundColor: "#FF4014"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}