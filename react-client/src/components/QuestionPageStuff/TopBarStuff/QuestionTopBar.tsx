import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Question } from '../../../@types/common';
import ping from '../images/blue-ping.png';
import clicked_ping from '../images/blue-ping-clicked.svg';
import calc from '../images/icon-calc.svg';
import clicked_calc from '../images/icon-calc-clicked.svg';
import note from '../images/note-icon.svg';
import clicked_note from '../images/note-icon-clicked.svg';
import redNote from '../images/icon-calc-red.svg';
import show from '../images/show-icon.svg';
import hide from '../images/hide-icon.svg';

import DraggablePet from './DraggablePet';
import DraggabbleDesmosCalculator from './DraggableDesmosCalculator';
import DraggableNotepad from './DraggableNotepad';

interface QuestionPageProps {
    question: Question;
    isCorrect: boolean | null;
}

const QuestionTopBar: React.FC<QuestionPageProps> = ({question, isCorrect}) => {

    // for timer: TODO: make it work for hours
    const [showTimer, setshowTimer] = useState(false);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {

        const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
            } else {
            return prevSeconds + 1;
            }
        });
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    const formatTime = (time: number): string => {
        return time < 10 ? `0${time}` : time.toString();
    };

    // for icons on top right; pet, calc
    const [showPet, setshowPet] = useState(false);
    const [showNote, setshowNote] = useState(false);
    const [showCalc, setshowCalc] = useState(false);

    return (
        <div className='flex items-center justify-between h-11 bg-[#CAF0F8] px-4 border-b border-[#040033]'>
                <div className='basis-1/6 flex items-center gap-5'>
                    <span className='text-white bg-[#040033] px-2 py-[.5px] rounded-md font-semibold cursor-pointer hover:bg-[#3e34ac] transition-colors'><Link to={"/current-home"}>Exit</Link></span>
                    <div className='flex items-center gap-2'>
                        <img src={show} className={`h-5 cursor-pointer ${!showTimer ? 'inline' : 'hidden'}`} onClick={() => {setshowTimer(!showTimer)}}/>
                        <img src={hide} className={`h-6 cursor-pointer ${showTimer ? 'inline' : 'hidden'}`} onClick={() => {setshowTimer(!showTimer)}}/>
                        <h1 className={`text-2xl ${!showTimer ? 'inline' : 'hidden'}`}> {`${formatTime(minutes)}:${formatTime(seconds)}`}</h1>
                    </div>
                </div>
                <div className='basis-4/6 flex justify-center items-center gap-4'>
                    <h1 className='text-2xl font-medium'>{question.title}</h1>
                    <h3><i>{question.category}</i></h3>
                    {/* TODO: add subtopic + difficulty color */}
                    {isCorrect !== null && (<div><i>{question.difficulty}</i></div>)}
                </div>
                <div className='basis-1/6 flex justify-end items-center gap-3'>
                    <img src={calc} className={`h-8 pr-[6px] cursor-pointer ${!showCalc ? 'inline' : 'hidden'}`} onClick={() => { setshowCalc(!showCalc)}}/>
                    <img src={clicked_calc} className={`h-8 pr-[6px] cursor-pointer ${showCalc ? 'inline' : 'hidden'}`} onClick={() => { setshowCalc(!showCalc)}}/>

                    <img src={note} className={`h-8 cursor-pointer ${(!showNote && (isCorrect || isCorrect==null)) ? 'inline' : 'hidden'}`} onClick={() => { setshowNote(!showNote)}}/>
                    <img src={redNote} className={`h-8 cursor-pointer ${(!showNote && isCorrect == false) ? 'inline' : 'hidden'}`} onClick={() => { setshowNote(!showNote)}}/>
                    <img src={clicked_note} className={`h-8 cursor-pointer ${showNote ? 'inline' : 'hidden'}`} onClick={() => { setshowNote(!showNote)}}/>

                    <img src={ping} className={`h-9 cursor-pointer ${!showPet ? 'inline' : 'hidden'}`} onClick={() => { setshowPet(!showPet)}}/>
                    <img src={clicked_ping} className={`h-9 cursor-pointer ${showPet ? 'inline' : 'hidden'}`} onClick={() => { setshowPet(!showPet)}}/>
                </div>


                <DraggablePet showPet={showPet}/>
                <DraggabbleDesmosCalculator showCalc={showCalc} setshowCalc={setshowCalc}/>
                <DraggableNotepad showNote={showNote} setshowNote={setshowNote} isCorrect={isCorrect}/>
        </div>
    );
};

export default QuestionTopBar;
