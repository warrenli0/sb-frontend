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

declare const window: any;

function Content({ version, noteText, setnoteText }: any) {
    const calculatorRef = useRef(null);

    const [story1, setstory1] = useState(["Nice to meet you!", "I'm just your", "Except that I am a", "I learned it all", "She used to teach", "I remember this", "I got a geometry", "She drew out a", "It was almost as", "and I learned", "and what it", "to be a penguin.", "In the days of ice,", "We were primitive", "Our species is", "and we began to", "the World. It is", "Knowledge is", "We penguins", "In order to not", "savage, primal", "We wrote", "and made the", "and we test", "and make them", "to determine their", 'Just like you I', "Anyways, I'll let", "Thanks for"]);
    const [story2, setstory2] = useState(["I am Coco.", "average penguin", "master of SAT", "from my mom", "me right here", "one time", "problem wrong", "circle in the sand", "big as my head", "about geometry...", "means to be...", "", "we would swim", "& hunted to live", "now civilized...", "learn about...", "truly incredible.", "power", "devised a plan.", "revert to our ...", "ways...", "textbooks...", "education system", "young penguins", "all take the SAT", "colleges...", "suppose!", "you get back to it", "listening, i <3 u"]);
    const [storyindex, setstoryindex] = useState(-1);
    const [showStory, setshowStory] = useState('0');
    function pingClick() {
        if (storyindex == (story1.length - 1)) {
            setshowStory('fin');
            return;
        }
        setshowStory('0'); // opacity down
        setTimeout(function(){
            setstoryindex(storyindex + 1);
            setshowStory('1');
        }, 10);
    }

    useEffect(() => {
        if (calculatorRef.current) {

            //const calculator = window.Desmos.GraphingCalculator(calculatorRef.current, { "keypad": false, "border": false });
            
        }
    }, []);

    return (
        <div>
            <div className="note-text-cont" data-version={version}>
                <textarea className="note-input" placeholder="Notes..." onChange={(e) => setnoteText(e.target.value)} value={noteText}></textarea>
            </div>
            <div className="note-ping-cont" data-version={version}>
                <div>
                    <img src={beach_umbrella} className="beach-umbrella" />
                    <div className='beach-text-container' data-story={showStory}>
                        <h3 data-version={version} data-story={showStory}>{story1[storyindex]}</h3>
                        <h3 data-version={version} data-story={showStory}>{story2[storyindex]}</h3>
                    </div>
                </div>
                <div className="note-ping-beach-cont">
                    <img src={beach} className="ping-beach" />
                    <img src={beach_peng} className="ping-on-beach" onClick={() => {pingClick()}}/>
                    <img src={beach_ball} className="beach-ball" />
                </div>
            </div>
            {/* desmos calculator TBD */}
            <div className="note-calc-cont" ref={calculatorRef} data-version={version}></div>
        </div>
    )
}

export default function TheNotepad({ calc = 'true', noteText, setnoteText }: any) {
    const [selectedChoice, setselectedChoice] = useState('1');

    if (selectedChoice == '4' && calc == 'false') {
        setselectedChoice('1');
    }

    return (
        <div className="qcard-notepad" data-calculator={calc} data-version={selectedChoice}>
            <div className="note-cont icon-note" onClick={() => { setselectedChoice('1') }} data-chosen={selectedChoice} data-calculator={calc}><img src={note} /></div>
            <div className="note-cont ping-note" onClick={() => { setselectedChoice('2') }} data-chosen={selectedChoice} data-calculator={calc}><img src={ping} /></div>
            <div className="note-cont calc-note" onClick={() => { setselectedChoice('3') }} data-chosen={selectedChoice} data-calculator={calc}><img src={calc_icon} /></div>
            <div className="the-notepad-line" data-calculator={calc}><div className="the-note-real-line"></div></div>
            <div className="notepad-content" data-calculator={calc}>
                <Content version={selectedChoice} noteText={noteText} setnoteText={setnoteText} />
            </div>
        </div>
    )
}