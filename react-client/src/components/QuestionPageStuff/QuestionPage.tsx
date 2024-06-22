import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { useAuth } from '../../hooks/useAuth';
import { Question } from '../../@types/common';
import './QCardSolo.css'; // necessary

import arrow from './images/arrow.svg';
import share from './images/share-icon.svg';
import unflag from './images/unflag.svg';
import flagged from './images/flagged.svg';
import thumbsUp from './images/thumbs-up.svg';
import thumbsDown from './images/thumbs-down.svg';
import greenthumbsUp from './images/green-thumbs.svg';
import redthumbsDown from './images/red-thumbs.svg';
import strike from './images/strike-icon.svg';

import QuestionTopBar from './TopBarStuff/QuestionTopBar';
import DraggablePet from './TopBarStuff/DraggablePet';
import DraggabbleDesmosCalculator from './TopBarStuff/DraggableDesmosCalculator';
import DraggableNotepad from './TopBarStuff/DraggableNotepad';

interface QuestionPageProps {
    loadQuestion?: Question;
    goNextQuestion?: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ loadQuestion, goNextQuestion }) => {

    const { getQuestion, submitAnswer } = useQuestionService();
    const [question, setQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state
    const { currentUser } = useAuth();
    const { id } = useParams();

    // used for the understood
    const [isChecked, setIsChecked] = useState(false);

    // for flagging
    const [isFlagged, setisFlagged] = useState(false);

    // for thumbs up / down
    const [thumbsStatus, setthumbsStatus] = useState(0); // default

    // for strike through
    const [isStriked, setisStriked] = useState(false);
    const [strikeArray, setstrikeArray] = useState([false, false, false, false]);

    // copy question link stuff
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const copyToClipboard = async () => {
        try {
        await navigator.clipboard.writeText(`http://localhost:3000/sb-frontend/current-question/${question?._id}`);
        setShowNotification(true);
        setFadeOut(false);
        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
            setShowNotification(false);
            }, 500); // Allow fade-out transition to complete before hiding
        }, 1500); // Show notification for 1.5 seconds before fading out
        } catch (err) {
        console.error('Failed to copy: ', err);
        }
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            if (loadQuestion) {
                setQuestion(loadQuestion);
                return;
            }

            const data = await getQuestion(id || '');
            if (data) {
                setQuestion(data);
            }
        };

        setSelectedAnswer('');
        setIsCorrect(null);
        setisFlagged(false);

        fetchQuestion();
    }, [id, loadQuestion]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!question || loading) {  // Prevent spamming
            return;
        }

        const correctAnswer = question.answerChoices.find((choice) => choice.isCorrect);
        if (correctAnswer && selectedAnswer === correctAnswer.text) {
            setIsCorrect(true);
            setIsChecked(true); // be default set the understood to checked
        } else {
            setIsCorrect(false);
        }

        setLoading(true);  // Disable button
        try {
            const response = await submitAnswer(currentUser?._id || '', question._id, isCorrect || false, true);  // Adjust accordingly
            setMessage(response.message || 'Answer submitted successfully.');
        } catch (error) {
            setMessage('An error occurred while submitting the answer.');
        } finally {
            setLoading(false);  // Re-enable button
        }
    };

    // Create a ref for the form element
    const formRef = useRef<HTMLFormElement>(null);
    // Define the function to handle button click
    const handleButtonClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
          }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-screen max-h-dvh fixed text-[#040033] select-none'>
            <QuestionTopBar question={question} isCorrect={isCorrect}/>

            <div className='w-full' style={{"height": "calc(100dvh - 44px"}}>
                
                {/* misc stuff */}
                <div className='flex items-center justify-end h-9 px-3'>
                    <div className='relative flex'>
                        <img className={`h-7 cursor-pointer absolute right-[80px] ${isCorrect!=null ? 'hidden' : '' }`} src={strike} onClick={() => { setisStriked(!isStriked)}}/>
                        <img className={`absolute top-[-6px] right-10 h-10 cursor-pointer ${isFlagged ? 'hidden' : '' }`} onClick={() => { setisFlagged(true) }} src={unflag}/>
                        <img className={`absolute top-[-6px] right-10 h-10 cursor-pointer ${!isFlagged ? 'hidden' : '' }`} onClick={() => { setisFlagged(false) }} src={flagged}/>
                        <img className='h-7 cursor-pointer' src={share} onClick={() => {copyToClipboard()}}/>
                        {showNotification && (
                            <div
                            className={`absolute top-0 right-8 mt-2 px-4 py-2 font-semibold bg-[#040033] text-white rounded shadow-lg transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                            >
                            Link copied!
                            </div>
                        )}
                    </div>
                </div>
                        
                {/* main stuff : question detail */}
                <div className='flex relative' style={{"height": "calc(100dvh - 44px - 36px - 80px)"}}>
                    {/* Left section */}
                    <div className='flex-1 mx-10 my-2 overflow-scroll flex flex-col gap-4'>
                        {question.problemStatement}
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
                            <form ref={formRef} onSubmit={handleSubmit} className='qcard-form flex flex-col gap-4'>
                                {question.answerChoices && question.answerChoices.map((choice, index) => (
                                    <div className='w-full flex'>   
                                        <div
                                            key={index}
                                            className={`qcard-answer-choice relative ${isStriked ? 'basis-4/5 ml-4' : 'basis-full'} ${strikeArray[index] ? 'bg-slate-300' : ''} ${selectedAnswer === choice.text ? 'selected' : ''}`}
                                            onClick={() => { setSelectedAnswer(choice.text); setIsCorrect(null); }}>
                                                <div className={`${strikeArray[index] ? 'strikethroughdiv' : 'hidden'}`}></div>
                                                <div id="qcard-letter"><h2><span>{String.fromCharCode(65 + index)}</span></h2></div>
                                                <div className='qcard-choice-cont'><h2>{choice.text}</h2></div>
                                        </div>
                                        <div className={`${isStriked ? 'basis-1/5 flex items-center justify-center' : 'hidden'}`}>
                                            <h2 id="qcard-letter-mini"><span className={`hover:bg-gray-200 transition-colors cursor-pointer ${strikeArray[index] ? 'bg-slate-300' : ''}`} 
                                                onClick={() => {setstrikeArray(prevArray => {
                                                                    const newArray = [...prevArray]; // Create a copy of the current state array
                                                                    newArray[index] = !prevArray[index]; // Update the value at index 2
                                                                    return newArray; // Return the new array
                                                                })}}>
                                                {String.fromCharCode(65 + index)}</span></h2>
                                        </div>
                                    </div>
                                ))}
                                {/*<button type="submit" className="hidden mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>*/}
                            </form>
                        ) : (
                            <div className='h-full flex flex-col relative'>
                                <div className='flex-1 overflow-scroll flex flex-col gap-2'>
                                    <div className='flex items-center gap-4 relative'>
                                        <h2 className='text-lg'><b>Explanation</b></h2>
                                        <div className='flex gap-1'>
                                            <img className={`h-5 w-5 relative bottom-[2px] cursor-pointer ${thumbsStatus == 1 ? 'hidden' : ''}`} onClick={() => { setthumbsStatus(1) }} src={thumbsUp}/>
                                            <img className={`h-5 w-5 relative bottom-[2px] cursor-pointer ${thumbsStatus != 1 ? 'hidden' : ''}`} onClick={() => { setthumbsStatus(0) }} src={greenthumbsUp}/>
                                            <img className={`h-5 w-5 relative bottom-[2px] cursor-pointer ${thumbsStatus == 2 ? 'hidden' : ''}`} onClick={() => { setthumbsStatus(2) }} src={thumbsDown}/>
                                            <img className={`h-5 w-5 relative bottom-[2px] cursor-pointer ${thumbsStatus != 2 ? 'hidden' : ''}`} onClick={() => { setthumbsStatus(0) }} src={redthumbsDown}/>
                                        </div>
                                    </div>
                                    <div className="">
                                        {question.explanation + "YO DAZO"}
                                    </div>
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
                        <h1 className={`bg-[#040033] text-white text-xl font-semibold rounded-[12px] px-3 py-[2px] flex items-center justify-center gap-3 cursor-pointer hover:bg-[#3e34ac] transition-colors ${(!goNextQuestion) ? 'hidden' : ''} ${(isCorrect !==null) ? 'inline' : 'hidden'}`} onClick={goNextQuestion}>Next <img className={`h-4`} src={arrow}/></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
