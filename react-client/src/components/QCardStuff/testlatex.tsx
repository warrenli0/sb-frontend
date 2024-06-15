import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { Question } from '../../@types/common';
import './QCardSolo.css'; // necessary
import { useAuth } from '../../hooks/useAuth';
import ping from './images/blue-ping.png';
import clicked_ping from './images/blue-ping-clicked.svg';
import calc from './images/icon-calc.svg';
import clicked_calc from './images/icon-calc-clicked.svg';
import arrow from './images/arrow.svg';
import share from './images/share-icon.svg';
import unflag from './images/unflag.svg';
import flagged from './images/flagged.svg';

import DraggablePet from './DraggablePet';
import DraggabbleDesmosCalculator from './DraggableDesmosCalculator';

import { MathJaxContext, MathJax } from 'better-react-mathjax';

const mathJaxConfig = {
    loader: { load: ['input/tex', 'output/chtml'] },
  };

const LatexTest: React.FC = ({  }) => {
    const { getQuestion, submitAnswer } = useQuestionService();
    const [question, setQuestion] = useState({
        title: "bing",
        category: "chilling",
        difficulty: "easy",
        problemStatement: "What is the median of the five data values below? \\[0\\:,\\;\\frac{1}{10\\:},\\;\\fbox{$\\frac{1}{2}$}\\:,\\;\\frac{3}{4}\\:,\\;1\\:\\]",
        //"What is the median of the seven data values below? \\[10\\:, \\;13\\:, \\;14\\:, \\;14\\:, \\;12\\:, \\;13\\:, \\;14\\]",
        answerChoices: [
            {_id: "first",text:"10",isCorrect:false},
            {_id: "second",text:"12",isCorrect:false},
            {_id: "tthird",text:"13",isCorrect:true},
            {_id: "fourth",text:"14",isCorrect:false},
        ],
        explanation: "bing chilling temp"
    });
    const latexLines = [
        'The answer is \\(\\textbf{C} \\).',
        'If you order the numbers, you get: \\[10\\:, \\;12\\:, \\;13\\:, \\;13\\:, \\;14\\:, \\;14\\:, \\;14\\]',
        'Since there are an odd number of elements, the median is simply the middle number of the ordered set. Thus, the median is 13.',
        '\\[10\\:, \\;12\\:, \\;13\\:, \\;\\underline{13}\\:, \\;14\\:, \\;14\\:, \\;14\\]',
    ];

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state
    const { currentUser } = useAuth();
    const { id } = useParams();

    // used for the understood
    const [isChecked, setIsChecked] = useState(false);

    // for icons on top right; pet, calc
    const [showPet, setshowPet] = useState(false);
    const [showCalc, setshowCalc] = useState(false);

    // for flagging
    const [isFlagged, setisFlagged] = useState(false);


    // Create a ref for the form element
    const formRef = useRef<HTMLFormElement>(null);
    // Define the function to handle button click
    const handleButtonClick = () => {
        setIsCorrect(true);
    };

    return (
        <div className='w-screen max-h-dvh relative text-[#040033] select-none'>
            {/* top bar */}
            <div className='flex items-center justify-between h-11 bg-[#CAF0F8] px-4 border-b border-[#040033]'>
                <h3 className='text-white bg-[#040033] px-2 py-[.5px] rounded-md font-semibold cursor-pointer hover:bg-[#3e34ac] transition-colors'><Link to={"/current-home"}>Exit</Link></h3>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-medium'>{question.title}</h1>
                    <h3><i>{question.category}</i></h3>
                    {/* TODO: add subtopic + difficulty color */}
                    {isCorrect !== null && (<div><i>{question.difficulty}</i></div>)}
                </div>
                <div className='flex items-center gap-3'>
                    <img src={calc} className={`h-8 cursor-pointer ${!showCalc ? 'inline' : 'hidden'}`} onClick={() => { setshowCalc(!showCalc)}}/>
                    <img src={clicked_calc} className={`h-8 cursor-pointer ${showCalc ? 'inline' : 'hidden'}`} onClick={() => { setshowCalc(!showCalc)}}/>

                    <img src={ping} className={`h-9 cursor-pointer ${!showPet ? 'inline' : 'hidden'}`} onClick={() => { setshowPet(!showPet)}}/>
                    <img src={clicked_ping} className={`h-9 cursor-pointer ${showPet ? 'inline' : 'hidden'}`} onClick={() => { setshowPet(!showPet)}}/>
                </div>
            </div>
            {/* misc stuff */}
            <div className='flex items-center justify-end h-9 px-3'>
                <div className='relative'>
                    <img className={`absolute top-[-6px] right-10 h-10 cursor-pointer ${isFlagged ? 'hidden' : '' }`} onClick={() => { setisFlagged(true) }} src={unflag}/>
                    <img className={`absolute top-[-6px] right-10 h-10 cursor-pointer ${!isFlagged ? 'hidden' : '' }`} onClick={() => { setisFlagged(false) }} src={flagged}/>
                    <img className='h-7 cursor-pointer' src={share}/>
                </div>
            </div>
            {/* main content*/}
            <div className='flex relative' style={{"height": "calc(100dvh - 44px - 36px - 80px)"}}>
                <DraggablePet showPet={showPet}/>
                <DraggabbleDesmosCalculator showCalc={showCalc} setshowCalc={setshowCalc}/>
                {/* Left section */}
                <div className='flex-1 mx-10 my-2 overflow-scroll flex flex-col gap-4'>
                    <MathJaxContext config={mathJaxConfig}>
                        <MathJax dynamic>{question.problemStatement}</MathJax>
                    </MathJaxContext>
                     {/* Left hidden answer choices */}
                    {isCorrect !== null && (
                        <div className='qcard-answer-section flex flex-col gap-4'>
                            {question.answerChoices && question.answerChoices.map((choice, index) => (
                                <div
                                    key={index}
                                    className={`qcard-answer-choice pointer-events-none ${choice.isCorrect ? 'correct' : selectedAnswer === choice.text ? 'incorrect' : ''}`}
                                >
                                    <div id="qcard-letter"><h2><span>{String.fromCharCode(65 + index)}</span></h2></div>
                                    <div className='qcard-choice-cont'><h2>{choice.text}</h2></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='h-[80%] w-[1px] bg-[#040033] self-center rounded-md'></div>
                {/* Right section */}
                <div className='flex-1 mx-10 my-2 overflow-scroll'>
                    {isCorrect === null ? (
                        <form ref={formRef} className='qcard-form flex flex-col gap-4'>
                            {question.answerChoices && question.answerChoices.map((choice, index) => (
                                <div
                                    key={index}
                                    className={`qcard-answer-choice ${selectedAnswer === choice.text ? 'selected' : ''}`}
                                    onClick={() => { setSelectedAnswer(choice.text); setIsCorrect(null); }}
                                >
                                    <div id="qcard-letter"><h2><span>{String.fromCharCode(65 + index)}</span></h2></div>
                                    <div className='qcard-choice-cont'><h2>{choice.text}</h2></div>
                                </div>
                            ))}
                            <button type="submit" className="hidden mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    ) : (
                        <div className='h-full flex flex-col relative'>
                            <div className='flex-1 overflow-scroll'>
                                <h2 className='text-lg'><b>Explanation</b></h2>
                                <MathJaxContext>
                                    <div>
                                        {latexLines.map((line, index) => (
                                        <div key={index} style={{ }}>
                                            <MathJax>{line}</MathJax>
                                        </div>
                                        ))}
                                    </div>
                                </MathJaxContext>
                            </div>
                            <div className='h-20 flex flex-col items-center'>
                                <div className='h-[1px] w-[60%] bg-[#040033] rounded-md'></div>
                                <div className='flex gap-5 items-center h-full w-full justify-center'>
                                    <input className={`w-8 h-8 cursor-pointer`} checked={isChecked} onChange={() => setIsChecked(!isChecked)} type='checkbox'></input>
                                    <h1 className='text-xl font-medium'>I understand this problem</h1>
                                </div>
                            </div>
                        </div>
                    )}
                    {/*message && <p className="mt-4 text-gray-600">{message}</p>*/}
                </div>
            </div>
            <div className='h-20'>
                <div className='flex items-start justify-end px-10'>
                        <h1 className={`bg-[#040033] text-white text-xl font-semibold rounded-[12px] px-3 py-[2px] flex items-center justify-center gap-3 cursor-pointer hover:bg-[#3e34ac] transition-colors ${(isCorrect !==null) ? 'hidden' : 'inline'}  ${(selectedAnswer=='') ? 'hidden' : 'inline'}`} onClick={handleButtonClick}>Check <img className={`h-4`} src={arrow}/></h1>
                        <h1 className={`bg-[#040033] text-white text-xl font-semibold rounded-[12px] px-3 py-[2px] flex items-center justify-center gap-3 cursor-pointer hover:bg-[#3e34ac] transition-colors ${(isCorrect !==null) ? 'inline' : 'hidden'}`}>Next <img className={`h-4`} src={arrow}/></h1>
                </div>
            </div>
        </div>
    );
};

export default LatexTest;
