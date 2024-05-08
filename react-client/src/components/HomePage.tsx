import React from 'react';
import './Home.css'
import info from './images/black_info.png';
import rightArrow from '../images/right_arrow.png';
import beach from '../images/pet_beach.png';
import cool from '../images/cool-peng.png';
import ball from '../images/beach-ball.png';
import umbrella from '../images/beach-umbrella.png';
import flag from '../images/flagged.png';
import bottomBeach from '../images/home-beach.png';

import fb from '../images/fb.png';
import disc from '../images/gray-disc.png';
import insta from '../images/insta.png';

import NavBar from './NavBar';

import { useState, useEffect } from "react";
import { Textfit } from 'react-textfit';
import { Outlet, Link } from "react-router-dom";

export default function HomePage({}) {
    const [openoptions, setopenoptions] = useState(false);

    return (
        <div className='home-cont'>
            <NavBar under="1"/>
            <div className='home-main'>
                <div className='home-card'>
                    <div className='home-card-head'>
                        <div className='head-info'>
                            <h1>Daily Practice</h1>
                            {/*
                            <img src={info} style={{height: "20px"}}/> */}
                            <img src={rightArrow}/>
                        </div>
                        <div className='head-streak'>

                        </div>
                    </div>
                    {/*
                    <div>
                        <h4>Solve problems in your weaker areas!</h4>
                        </div>*/}
                    <div className='home-card-prob'>
                        <h2># of Problems:</h2>
                        <div data-selected={true}><h2>5</h2></div>
                        <div><h2>10</h2></div>
                        <div><h2>15</h2></div>
                        <div><h2>20</h2></div>
                    </div>
                    <div className='home-card-start'>
                        <div className='card-review'>
                            <h2>Review:</h2>
                            <div><h2>As I Go</h2></div>
                            <div data-selected={true}><h2>At The End</h2></div>
                        </div>
                        <div id="card-start"><h2>Start</h2></div>
                    </div>
                </div>
                <div className='pet-card'>
                    <div className='pet-card-meta'>
                        <img src={beach} id="pet-beach"/>
                        <img src={umbrella} id="pet-umbrella"/>
                        <img src={cool} id="pet-cool"/>
                        <img src={ball} id="pet-ball"/>
                        <h1>Coco</h1>
                        <div>
                            <h3>Level 6</h3>
                            <div className='pet-outer-bar'>
                                <div></div>
                                <h5>15 Qs Remaining</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='module-cont'>
                    <div className='module-cont-head'>
                        <h1>Recommended Modules</h1>
                        <div>
                            <input type="checkbox"/>
                            <h3>Show In-Progress</h3>
                        </div>
                    </div>
                    <div className='module-list'>
                        <div className='module-card' id="module-bg1">
                            <div className='module-head'>
                                <h1>Linear Equations</h1>
                            </div>
                            <div className='module-meta'>
                                <div>
                                    <h3>Math</h3>
                                    <h3>0% Mastery</h3>
                                </div>
                                <div id='module-start'>
                                    <h2><Link to="/modules/example-module">Start</Link></h2>
                                </div>
                            </div>
                        </div>
                        <div className='module-card' id="module-bg2">
                            <h1>Prepositional Phrases</h1>
                            <div className='module-meta'>
                                <div>
                                    <h3>English</h3>
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
                                    <h3>Reading</h3>
                                    <h3>0% Mastery</h3>
                                </div>
                                <div id='module-start'>
                                    <h2>Start</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='qlist-cont'>
                    <div className='qlist-head'>
                        <h1>Problem List</h1>
                        <h5>Bunch of filters</h5>
                        <div className='qlist-bar'></div>
                    </div>
                    <div className='qlist-box'>
                        <div className='qlist-qCont' data-status='complete'>
                            <div className='question-meta'>
                                <h3>Problem of the Day: Graphing Linear Equations #5</h3>
                                <h4>Algebra</h4>
                            </div>
                            <div className='question-diff' data-diff="medium">
                                <h3>Medium</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont'>
                            <div className='question-meta'>
                                    <h3>1. Linear Equations #1</h3>
                                    <h4>Algebra</h4>
                                </div>
                                <div className='question-diff' data-diff="easy">
                                    <h3>Easy</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont'>
                            <div className='question-meta'>
                                    <h3>2. Apostrophes #1</h3>
                                    <h4>Punctuation</h4>
                                </div>
                                <div className='question-diff' data-diff="hard">
                                    <h3>Hard</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont' data-status='redo'>
                            <div className='question-meta'>
                                    <h3>3. Complex Numbers #1</h3>
                                    <h4>Geometry & Trig</h4>
                                </div>
                                <div className='question-diff' data-diff="easy">
                                    <h3>Easy</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont'>
                            <div className='question-meta'>
                                    <h3>4. Idioms #1</h3>
                                    <h4>Phrases</h4>
                                </div>
                                <div className='question-diff' data-diff="hard">
                                    <h3>Hard</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont' data-status='incomplete'>
                            <div className='question-meta'>
                                    <h3>5. Who vs. Whom #1</h3>
                                    <h4>Common Mistakes</h4>
                                </div>
                                <div className='question-diff' data-diff="easy">
                                    <h3>Easy</h3>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                        <div className='qlist-qCont' data-status='complete'>
                            <div className='question-meta'>
                                <h3>6. Fiction Literary Passage #1</h3>
                                <h4>Fiction</h4>
                            </div>
                            <div className='question-status'>
                                <div className='flag-cont'>
                                    <img src={flag}/>
                                </div>
                                <div className='question-diff' data-diff="medium">
                                <h3>Medium</h3>
                            </div>
                            </div>
                            <div className='qlist-bar'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-foot'>
                <img id="home-beach" src={bottomBeach}/>
                <div className='foot-meta'>
                    <h4>TOS | Privacy Policy</h4>
                    <h4>Copyright @ 2024 Scholars Beacon | scholarsbeacon@gmail.com</h4>
                </div>
                <div className='foot-info'>
                    <img src={fb}/>
                    <img src={disc}/>
                    <img src={insta}/>
                </div>
            </div>
        </div>
    )
}

/*
 <div className='home-card'>
                    <div className='home-card-head'>
                        <div className='head-info'>
                            <h1>Daily Practice</h1>
                            <img src={info} style={{height: "20px"}}/>
                            <img src={rightArrow}/>
                        </div>
                        <div className='head-streak'>

                        </div>
                    </div>
                    <div className='home-card-prob'>
                        <h2># of Problems:</h2>
                        <div data-selected={true}><h2>5</h2></div>
                        <div><h2>10</h2></div>
                        <div><h2>15</h2></div>
                        <div><h2>20</h2></div>
                    </div>
                    <div className='home-card-start'>
                        <div className='card-review'>
                            <h2>Review:</h2>
                            <div><h2>As I Go</h2></div>
                            <div data-selected={true}><h2>At The End</h2></div>
                        </div>
                        <div id="card-start"><h2>Start</h2></div>
                    </div>
                </div>
                <div className='pet-card'>
                    <div className='pet-card-meta'>
                        <h1>Coco</h1>
                        <div>
                            <h3>Level 6</h3>
                            <div className='pet-outer-bar'>
                                <div></div>
                                <h5>15 Qs Remaining</h5>
                            </div>
                        </div>
                    </div>
                    <img src={beach} id="pet-beach"/>
                    <img src={umbrella} id="pet-umbrella"/>
                    <img src={cool} id="pet-cool"/>
                    <img src={ball} id="pet-ball"/>
                </div>
                */