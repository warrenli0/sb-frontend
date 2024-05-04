import React from 'react';
import './Modules.css'
import arrow from '../images/right_arrow.png';

import NavBar from './NavBar';


import { useState, useEffect } from "react";
import { Textfit } from 'react-textfit';

export default function Modules({}) {
    return (
        <div className=''>
            <NavBar under="2"/>
            <div className='modules-cont'>
                <div className='module-header'>
                    <div className='module-types'>
                        <h1 data-selected='1' data-type='1'>Math</h1>
                        <h1>Writing</h1>
                        <h1>Reading</h1>
                        <h1>All</h1>
                    </div>
                    <div className='module-head-filter'>
                        <h2>Filter by:</h2> 
                        <select id="module-select">
                            <option value="Status">Status</option>
                        </select>
                    </div>
                </div>
                <div className='modules-head-bar'></div>
                <div className='modules-main-content'>
                    <div className='modules-second-head'>
                        <div className='modules-topics'>
                            <h2>Topics: 21</h2>
                            <h2>Mastered: 2</h2>
                        </div>
                        <div>
                            <input placeholder='\ Search'/>
                        </div>
                    </div>
                    <div className='module-list-cont'>
                        <div className='modulelist-head'>
                            <h2 id="mListTitle">Algebra</h2>
                            <h2 style={{fontWeight: '500', paddingRight: '10px'}}>Completed 0 of 5</h2>
                        </div>
                        <div className='module-list modules-page-list'>
                            <div className='module-card' id="module-bg1">
                                <div className='module-head'>
                                    <h1>Linear Equations</h1>
                                </div>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 20 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg2">
                                <h1>Prepositional Phrases</h1>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 5 min</h3>
                                        <h3>80% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Continue</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg3">
                                <h1>Find the Main Idea</h1>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 30 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={arrow} />
                            </div>
                        </div>
                    </div>
                    <div className='module-list-cont'>
                        <div className='modulelist-head'>
                            <h2 id="mListTitle">Advanced Math</h2>
                            <h2 style={{fontWeight: '500', paddingRight: '10px'}}>Completed 0 of 4</h2>
                        </div>
                        <div className='module-list modules-page-list'>
                            <div className='module-card' id="module-bg4">
                                <div className='module-head'>
                                    <h1>Exponents</h1>
                                </div>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 40 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg3">
                                <h1>Quadratic Equations</h1>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 20 min</h3>
                                        <h3>20% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Continue</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg1">
                                <div className='module-head'>
                                    <h1>Rates, Ratios, Proportions</h1>
                                </div>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 30 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={arrow} />
                            </div>
                        </div>
                    </div>
                    <div className='module-list-cont'>
                        <div className='modulelist-head'>
                            <h2 id="mListTitle">Problem Solving & Data Analysis</h2>
                            <h2 style={{fontWeight: '500', paddingRight: '10px'}}>Completed 0 of 4</h2>
                        </div>
                        <div className='module-list modules-page-list'>
                            <div className='module-card' id="module-bg2">
                                <div className='module-head'>
                                    <h1>Word Problems</h1>
                                </div>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 40 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg1">
                                <h1>Percents</h1>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 20 min</h3>
                                        <h3>20% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Continue</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='module-card' id="module-bg4">
                                <div className='module-head'>
                                    <h1>Prepositional Phrases</h1>
                                </div>
                                <div className='module-meta'>
                                    <div>
                                        <h3>ET: 30 min</h3>
                                        <h3>0% Mastery</h3>
                                    </div>
                                    <div id='module-start'>
                                        <h2>Start</h2>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={arrow} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}