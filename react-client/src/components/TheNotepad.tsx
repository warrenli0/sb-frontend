import note from "../images/note-icon.png"
import draw from "../images/draw-icon.png"
import ping from "../images/ping-icon.png"
import calc_icon from "../images/calc-icon.png"
import trashcan from "../images/trashcan.png"
import eraser from "../images/eraser.png"
import pen from "../images/pen.png"
import beach from "../images/ping-beach.png"
import beach_peng from "../images/main-peng.png"
import beach_ball from "../images/beach-ball.png"
import beach_umbrella from "../images/beach-umbrella.png"

import React, { useState, useEffect, useRef } from "react";

function Content({version, noteText, setnoteText}: any) {
    const calculatorRef = useRef(null);

    useEffect(() => {
        if (calculatorRef.current) {
            
            //const calculator = window.Desmos.GraphingCalculator(calculatorRef.current, {"keypad": false, "border": false});
            //const elt = document.getElementById('calculator');
            //const calculator = Desmos.GraphingCalculator(elt);
        }
    }, []);

    return (
        <div>
            <div className="note-text-cont" data-version={version}>
                <textarea className="note-input" placeholder="Notes..." onChange={(e) => setnoteText(e.target.value)} value={noteText}></textarea>
            </div>
            <div className="note-ping-cont" data-version={version}>
                <div>
                    <img src={beach_umbrella} className="beach-umbrella"/>
                </div>
                <div className="note-ping-beach-cont">
                    <img src={beach} className="ping-beach"/>
                    <img src={beach_peng} className="ping-on-beach"/>
                    <img src={beach_ball} className="beach-ball"/>
                </div>
            </div>
            {/* desmos calculator TBD */}
            <div className="note-calc-cont" ref={calculatorRef} data-version={version}><p>calc</p></div>
        </div>
    )
}

export default function TheNotepad({calc='true', noteText, setnoteText}: any) {
    const [selectedChoice, setselectedChoice] = useState('1');

    if (selectedChoice == '4' && calc == 'false') {
        setselectedChoice('1');
    }

    return (
        <div className="qcard-notepad" data-calculator={calc} data-version={selectedChoice}>
            <div className="note-cont icon-note" onClick={() => {setselectedChoice('1')}} data-chosen={selectedChoice} data-calculator={calc}><img src={note}/></div>
            <div className="note-cont ping-note" onClick={() => {setselectedChoice('2')}} data-chosen={selectedChoice} data-calculator={calc}><img src={ping}/></div>
            <div className="note-cont calc-note" onClick={() => {setselectedChoice('3')}} data-chosen={selectedChoice} data-calculator={calc}><img src={calc_icon}/></div>
            <div className="the-notepad-line" data-calculator={calc}><div className="the-note-real-line"></div></div>
            <div className="notepad-content" data-calculator={calc}>
                <Content version={selectedChoice} noteText={noteText} setnoteText={setnoteText}/>
            </div>
        </div>
    )
}