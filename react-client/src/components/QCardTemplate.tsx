import React from 'react';
import './QCardTemplate.css'
import flag from '../images/flagged.png';
import unflag from '../images/unflagged.png';
import share from '../images/share-icon.png';
import arrow from "../images/Arrow.png"
import note from "../images/note-top.png"
import show from "../images/Show.png"
import hide from "../images/Hide.png"

import TheNotepad from './TheNotepad';

import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Textfit } from 'react-textfit';

export default function QCardTemplate({}) {
    const [isNotepadOpen, setisNotepadOpen] = useState(true); // default is true
    const [selectedOption, setselectedOption] = useState('0'); // 0 = none
    const [isFlagged, setisFlagged] = useState(false); // default is false
    const [showTimer, setshowTimer] = useState(true); // default is true
    const [noteText, setnoteText] = useState(''); // for notepad

    if (isNotepadOpen == false) {
        return (
            <div className='qcard-bg'>
                <div className='qcard-top-bar'>
                    <div>
                        <div className='qcard-exit-note'>
                            <div id='qcard-back-button'>
                                <h3><Link to={"/home"}>Exit</Link></h3>
                            </div>
                            <img src={note} onClick={() => {setisNotepadOpen(true)}}/>
                        </div>
                        <div className='qcard-question-head'>
                            <h1>Q.1</h1>
                            <h3><i>Writing</i></h3>
                        </div>
                    </div>
                    <div className='qcard-timer-head' style={{"justifyContent": 'flex-start', "gap": '10px'}}>
                        <h1 data-show={showTimer.toString()}>00:00</h1>
                        <img src={show} onClick={() => {setshowTimer(false)}} id="show" data-show={showTimer.toString()}/>
                        <img src={hide} onClick={() => {setshowTimer(true)}} id="hide" data-show={showTimer.toString()}/>
                    </div>
                </div>
                <div className='qcard-top-line'></div>
                <div className='qcard-top-icons'>
                    <img src={unflag} id="unflag" data-flag={isFlagged.toString()} onClick={() => {setisFlagged(true)}}/>
                    <img src={flag} id="flag" data-flag={isFlagged.toString()} onClick={() => {setisFlagged(false)}}/>
                    <img src={share} id="share"/>
                </div>
                <div className='qcard-main-content'>    
                    <div className='qcard-text'>
                        <h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?</h2>
                    </div>
                    <div className='qcard-mid-bar'><div></div></div>
                    <div className='qcard-choices'>
                        <div className='qcard-answer-choice' id="choice1" data-selected={selectedOption} onClick={() => {setselectedOption('1')}}>
                            <div id="qcard-letter"><h2><span>A</span></h2></div>
                            <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice2" data-selected={selectedOption} onClick={() => {setselectedOption('2')}}>
                            <div id="qcard-letter"><h2><span>B</span></h2></div>
                            <div className='qcard-choice-cont'><h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% i</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice3" data-selected={selectedOption} onClick={() => {setselectedOption('3')}}>
                            <div id="qcard-letter"><h2><span>C</span></h2></div>
                            <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice4" data-selected={selectedOption} onClick={() => {setselectedOption('4')}}>
                            <div id="qcard-letter"><h2><span>D</span></h2></div>
                            <div className='qcard-choice-cont'><h2>hat charges $99.95 per night plus tax for a room.</h2></div>
                        </div>
                    </div>
                </div>
                <div className='qcard-bottom-icons'>
                    <img src={arrow} id="arrow" data-show={selectedOption}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className='qcard-bg' data-noteshow={true}>
                <div className='qcard-left-bar'>
                    <div>
                        <div id='qcard-back-button' style={{"marginLeft": "20px"}}>
                            <h3><Link to={"/home"}>Exit</Link></h3>
                        </div>
                    </div>
                    <div className='qcard-left-info'>
                        <h1>Q.1</h1>
                        <h3><i>Writing</i></h3>
                    </div>
                    <div className='qcard-left-info qcard-timer-thing'>
                        <img src={show} onClick={() => {setshowTimer(false)}} id="show" data-show={showTimer.toString()}/>
                        <img src={hide} onClick={() => {setshowTimer(true)}} id="hide" data-show={showTimer.toString()}/>
                        <h1 data-show={showTimer.toString()}>00:00</h1>
                    </div>
                    <div className='qcard-notepad-cont'>
                        <h4 onClick={() => {setisNotepadOpen(false)}}><i>close</i></h4>
                        <TheNotepad noteText={noteText} setnoteText={setnoteText}/>
                    </div>
                </div>
                <div className='qcard-vert-line'></div>
                <div>
                    <div className='qcard-main-content' data-noteshow={true}>   
                        <img src={share} id="share" data-noteshow={true}/> 
                        <img src={unflag} id="unflag" data-flag={isFlagged.toString()} onClick={() => {setisFlagged(true)}}/>
                        <img src={flag} id="flag" data-flag={isFlagged.toString()} onClick={() => {setisFlagged(false)}}/>
                        <div className='qcard-text' data-noteshow={true}>
                            <h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?</h2>
                        </div>
                        <div className='qcard-mid-bar'><div></div></div>
                        <div className='qcard-choices' data-noteshow={true}>
                            <div className='qcard-answer-choice' id="choice1" data-selected={selectedOption} onClick={() => {setselectedOption('1')}}>
                                <div id="qcard-letter"><h2><span>A</span></h2></div>
                                <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice2" data-selected={selectedOption} onClick={() => {setselectedOption('2')}}>
                                <div id="qcard-letter"><h2><span>B</span></h2></div>
                                <div className='qcard-choice-cont'><h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% i</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice3" data-selected={selectedOption} onClick={() => {setselectedOption('3')}}>
                                <div id="qcard-letter"><h2><span>C</span></h2></div>
                                <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice4" data-selected={selectedOption} onClick={() => {setselectedOption('4')}}>
                                <div id="qcard-letter"><h2><span>D</span></h2></div>
                                <div className='qcard-choice-cont'><h2>hat charges $99.95 per night plus tax for a room.</h2></div>
                            </div>
                        </div>
                        <div className='qcard-bottom-icons' data-noteshow={true}>
                            <img src={arrow} id="arrow" data-show={selectedOption}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}