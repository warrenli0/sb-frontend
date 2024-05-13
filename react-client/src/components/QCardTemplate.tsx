import React from 'react';
import './QCardTemplate.css'
import tweet from '../images/tweet.png';

import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Textfit } from 'react-textfit';

export default function QCardTemplate({}) {
    const [isNotepadOpen, setisNotepadOpen] = useState('0'); // 0 = false

    if (isNotepadOpen == '0') {
        return (
            <div className='qcard-bg'>
                <div className='qcard-top-bar'>
                    <div id='qcard-back-button'>
                        <h3><Link to={"/home"}>Exit</Link></h3>
                    </div>
                    <h1>Q.1</h1>
                </div>
                <div className='qcard-top-line'></div>
                <div className='qcard-main-content'>
                    <div className='qcard-text'>
                        <h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% is applied to the room rate, and an additional onetime untaxed fee of $5.00 is charged by the hotel. Which of the following represents Maria’s total charge, in dollars, for staying x nights?</h2>
                    </div>
                    <div className='qcard-mid-bar'><div></div></div>
                    <div className='qcard-choices'>
                        <div className='qcard-answer-choice'>
                            <div id="qcard-letter"><h2><span>A</span></h2></div>
                            <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                        </div>

                        <div className='qcard-answer-choice'>
                            <div id="qcard-letter"><h2><span>B</span></h2></div>
                            <div className='qcard-choice-cont'><h2>Maria is staying at a hotel that charges $99.95 per night plus tax for a room. A tax of 8% i</h2></div>
                        </div>

                        <div className='qcard-answer-choice'>
                            <div id="qcard-letter"><h2><span>C</span></h2></div>
                            <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                        </div>

                        <div className='qcard-answer-choice'>
                            <div id="qcard-letter"><h2><span>D</span></h2></div>
                            <div className='qcard-choice-cont'><h2>(99.95 + 0.08x) + 5</h2></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>hi</h1>
            </div>
        )
    }
}