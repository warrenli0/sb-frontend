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

import { MathJaxContext, MathJax } from 'better-react-mathjax';

import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Textfit } from 'react-textfit';

import { Question } from '../@types/common';
import useQuestionService from '../hooks/useQuestionService';
import { useParams } from 'react-router-dom';

export default function QCardTemplate({ }) {
    const [isNotepadOpen, setisNotepadOpen] = useState(true); // default is true
    const [selectedOption, setselectedOption] = useState('0'); // 0 = none
    const [isFlagged, setisFlagged] = useState(false); // default is false
    const [showTimer, setshowTimer] = useState(true); // default is true
    const [noteText, setnoteText] = useState(''); // for notepad
    const [showEcard, setshowEcard] = useState(false); // default is false
    const [checked, setchecked] = useState(false); // default is false | understood prob

    const { getQuestion } = useQuestionService();
    const [question, setQuestion] = useState<Question>();
    const { id } = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
            const data = await getQuestion(id || '');
            if (data) {
                setQuestion(data);
            }
        };

        fetchQuestion();
    }, [id]);


    const [currQuestion, setcurrQuestion] = useState({

        _id: 'example',
        type: 'English',
        title: '',
        author: '',
        category: 'Vocab in Context',
        difficulty: 'Hard',
        problemStatement: `What is the median of the \\(\\textit{seven}\\) data values below?
        \\[10,\\;13,\\;14,\\;14,\\;12,\\;13,\\;14\\]`,
        has_img: false,
        img_link: '',
        passage: '',
        explanation: 'The answer is \\(\\textbf{C}\\). If you order the numbers, you get: \\[10,\\;12,\\;13,\\;13,\\;14,\\;14,\\;14\\] Since there are an odd number of elements, the median is simply the middle number of the ordered set. Thus, the median is 13. \\[10,\\;12,\\;13,\\;\\fbox{13},\\;14,\\;14,\\;14\\]',
        answerChoices: [{
                id: 0,
                text: '10',
                isCorrect: false,
            },
            {
                id: 1,
                text: '12',
                isCorrect: false,
            },
            {
                id: 2,
                text: '13',
                isCorrect: true,
            },
            {
                id: 3,
                text: '14',
                isCorrect: false,
            },]
    })

    const [tempLatex, setTempLatex] = useState<string>('');
    const [prob, setProb] = useState<string>('What is the median of the \\(\\textit{seven}\\) data values below? \\[10,\\;13,\\;14,\\;14,\\;12,\\;13,\\;14\\]');
    function InputComponent() {
        return (
            <div className='input-thing'>
                <h1>enter shit</h1>

                <label htmlFor="input-type">type: </label>
                <select name="type" id="input-type">
                    <option value="English">English</option>
                    <option value="Math">Math</option>
                    <option value="Reading">Reading</option>
                    <option value="Science">Science</option>
                </select>
                <br/>
                <label htmlFor="input-subtopic">subtopic: </label>
                <select name="type" id="input-subtopic">
                    <option value="English">English</option>
                    <option value="Math">Math</option>
                    <option value="Reading">Reading</option>
                    <option value="Science">Science</option>
                </select>
                <br/>
                <label htmlFor="input-difficulty">difficulty: </label>
                <select name="type" id="input-difficulty">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <br/>
                <p>passage</p>
                <textarea placeholder='should be empty if no passage'/>
                <br/>
                <p>problem</p>
                <textarea value={prob} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setProb(event.target.value) }}/>
                <br/>
                <div id='input-check-thing' style={{"display": 'flex'}}>
                    <p>Choice 1</p>
                    <input type='checkbox' style={{"width": '40px'}}/>
                </div>
                <textarea/>
                
                <br/>
                <p>explanation</p>
                <textarea placeholder=''/>
            </div>
        )
    }

    if (isNotepadOpen == false) {
        return (
            <div className='qcard-bg'>
                <InputComponent />
                <div className='qcard-top-bar'>
                    <div className='qcard-exit-note'>
                        <div id='qcard-back-button'>
                            <h3><Link to={"/home"}>Exit</Link></h3>
                        </div>
                        <img src={note} onClick={() => { setisNotepadOpen(true) }} />
                    </div>
                    <div className='qcard-question-head'>
                        <h1>Q.1</h1>
                        <h3><i>{currQuestion.type}</i></h3>
                        <h3 data-ecard={showEcard}><i>{currQuestion.category}</i></h3>
                        <h3 data-ecard={showEcard} id={'sub-color-' + currQuestion.difficulty}><i>{currQuestion.difficulty}</i></h3>
                    </div>
                    <div className='qcard-timer-head' style={{ "justifyContent": 'flex-start', "gap": '20px' }}>
                        <img src={show} onClick={() => { setshowTimer(false) }} id="show" data-show={showTimer.toString()} />
                        <img src={hide} onClick={() => { setshowTimer(true) }} id="hide" data-show={showTimer.toString()} />
                        <h1 data-show={showTimer.toString()}>01:38</h1>
                    </div>
                </div>
                <div className='qcard-top-line'></div>
                <div className='qcard-top-icons'>
                    <img src={unflag} id="unflag" data-flag={isFlagged.toString()} onClick={() => { setisFlagged(true) }} />
                    <img src={flag} id="flag" data-flag={isFlagged.toString()} onClick={() => { setisFlagged(false) }} />
                    <img src={share} id="share" />
                </div>
                <div className='qcard-main-content'>
                    <div className='qcard-text'>
                        <div className="latex-h2">
                            {/* https://github.com/fast-reflexes/better-react-mathjax?tab=readme-ov-file */}
                            <MathJaxContext version={2}>
                                <MathJax hideUntilTypeset={"first"}>
                                    {currQuestion.problemStatement}
                                </MathJax>
                            </MathJaxContext>
                        </div>
                        <div className='qcard-answer-choice' id="choice1" data-correct={currQuestion.answerChoices[0].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                            <div id="qcard-letter"><h2><span>A</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[0].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice2" data-correct={currQuestion.answerChoices[1].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                            <div id="qcard-letter"><h2><span>B</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[1].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice3" data-correct={currQuestion.answerChoices[2].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                            <div id="qcard-letter"><h2><span>C</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[2].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice4" data-correct={currQuestion.answerChoices[3].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                            <div id="qcard-letter"><h2><span>D</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[3].text}</h2></div>
                        </div>
                    </div>
                    <div className='qcard-mid-bar'><div></div></div>
                    <div className='qcard-choices' data-ecard={showEcard}>
                        <div className='qcard-answer-choice' id="choice1" data-selected={selectedOption} onClick={() => { setselectedOption('1') }}>
                            <div id="qcard-letter"><h2><span>A</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[0].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice2" data-selected={selectedOption} onClick={() => { setselectedOption('2') }}>
                            <div id="qcard-letter"><h2><span>B</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[1].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice3" data-selected={selectedOption} onClick={() => { setselectedOption('3') }}>
                            <div id="qcard-letter"><h2><span>C</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[2].text}</h2></div>
                        </div>

                        <div className='qcard-answer-choice' id="choice4" data-selected={selectedOption} onClick={() => { setselectedOption('4') }}>
                            <div id="qcard-letter"><h2><span>D</span></h2></div>
                            <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[3].text}</h2></div>
                        </div>
                    </div>
                    <div className='qcard-explanation' data-ecard={showEcard}>
                        <div className='qcard-explanation-meta'>
                            <h2><b>Explanation</b></h2>
                            <div className="latex-h2">
                                    <MathJaxContext version={2}>
                                        <MathJax hideUntilTypeset={"first"}>
                                            {currQuestion.explanation}
                                        </MathJax>
                                    </MathJaxContext>
                                </div>
                        </div>
                        <div className='qcard-understandme'>
                            <div className='qcard-understand-bar'>
                                <div></div>
                            </div>
                            <div className='qcard-understand-check'>
                                <div>
                                    <input type="checkbox" id="e-understood" name="check" checked={checked} onChange={() => { setchecked(!checked) }} />
                                    <h2>I understand this problem</h2>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='qcard-bottom-icons'>
                    <img src={arrow} id="arrow" data-ecard={showEcard} data-show={selectedOption} onClick={() => { setshowEcard(true) }} />
                </div>
            </div>
        )
    } else {
        return (
            <div className='qcard-bg' data-noteshow={true}>
                <MathJaxContext version={2}>
                <InputComponent />
                <div className='qcard-left-bar'>
                    <div>
                        <div id='qcard-back-button' style={{ "marginLeft": "20px" }}>
                            <h3><Link to={"/home"}>Exit</Link></h3>
                        </div>
                    </div>
                    <div className='qcard-left-cont'>
                        <div className='qcard-left-info'>
                            <h1>Q.1</h1>
                            <h3><i>{currQuestion.type}</i></h3>
                        </div>
                        <div className='qcard-left-info' data-ecard={showEcard}>
                            <h3 data-ecard={showEcard}><i>{currQuestion.category}</i></h3>
                            <h3 data-ecard={showEcard} id={'sub-color-' + currQuestion.difficulty}><i>{currQuestion.difficulty}</i></h3>
                        </div>
                    </div>
                    <div className='qcard-left-info qcard-timer-thing'>
                        <img src={show} onClick={() => { setshowTimer(false) }} id="show" data-show={showTimer.toString()} />
                        <img src={hide} onClick={() => { setshowTimer(true) }} id="hide" data-show={showTimer.toString()} />
                        <h1 data-show={showTimer.toString()}>01:38</h1>
                    </div>
                    <div className='qcard-notepad-cont'>
                        <h4 onClick={() => { setisNotepadOpen(false) }}><i>close</i></h4>
                        <TheNotepad noteText={noteText} setnoteText={setnoteText} />
                    </div>
                </div>
                <div className='qcard-vert-line'></div>
                <div>
                    <div className='qcard-top-icons'>
                        <img src={unflag} id="unflag" data-flag={isFlagged.toString()} onClick={() => { setisFlagged(true) }} />
                        <img src={flag} id="flag" data-flag={isFlagged.toString()} onClick={() => { setisFlagged(false) }} />
                        <img src={share} id="share" />
                    </div>
                    <div className='qcard-main-content' data-noteshow={true}>
                        <div className='qcard-text' data-noteshow={true}>
                            {/*
                            <h2>{currQuestion.text}</h2>
        <                   h2>{currQuestion.problem}</h2>*/}
                            <div className="latex-h2">
                                {/* https://github.com/fast-reflexes/better-react-mathjax?tab=readme-ov-file */}
                                
                                    <MathJax hideUntilTypeset={"first"}>
                                        {prob}
                                    </MathJax>
                                
                            </div>
                            <div className='qcard-answer-choice' id="choice1" data-correct={currQuestion.answerChoices[0].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                                <div id="qcard-letter"><h2><span>A</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[0].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice2" data-correct={currQuestion.answerChoices[1].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                                <div id="qcard-letter"><h2><span>B</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[1].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice3" data-correct={currQuestion.answerChoices[2].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                                <div id="qcard-letter"><h2><span>C</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[2].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice4" data-correct={currQuestion.answerChoices[3].isCorrect} data-ecard={showEcard} data-selected={selectedOption}>
                                <div id="qcard-letter"><h2><span>D</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[3].text}</h2></div>
                            </div>
                        </div>
                        <div className='qcard-mid-bar'><div></div></div>
                        <div className='qcard-choices' data-noteshow={true} data-ecard={showEcard}>
                            <div className='qcard-answer-choice' id="choice1" data-selected={selectedOption} onClick={() => { setselectedOption('1') }}>
                                <div id="qcard-letter"><h2><span>A</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[0].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice2" data-selected={selectedOption} onClick={() => { setselectedOption('2') }}>
                                <div id="qcard-letter"><h2><span>B</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[1].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice3" data-selected={selectedOption} onClick={() => { setselectedOption('3') }}>
                                <div id="qcard-letter"><h2><span>C</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[2].text}</h2></div>
                            </div>

                            <div className='qcard-answer-choice' id="choice4" data-selected={selectedOption} onClick={() => { setselectedOption('4') }}>
                                <div id="qcard-letter"><h2><span>D</span></h2></div>
                                <div className='qcard-choice-cont'><h2>{currQuestion.answerChoices[3].text}</h2></div>
                            </div>
                        </div>
                        <div className='qcard-explanation' data-ecard={showEcard} data-noteshow={true}>
                            <div className='qcard-explanation-meta'>
                                <h2><b>Explanation</b></h2>
                                <div className="latex-h2">
                                    {/* https://github.com/fast-reflexes/better-react-mathjax?tab=readme-ov-file */}
                                </div>
                            </div>
                            <div className='qcard-understandme'>
                                <div className='qcard-understand-bar'>
                                    <div></div>
                                </div>
                                <div className='qcard-understand-check'>
                                    <div>
                                        <input type="checkbox" id="e-understood" name="check" checked={checked} onChange={() => { setchecked(!checked) }} />
                                        <h2>I understand this problem</h2>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='qcard-bottom-icons' data-noteshow={true}>
                            <img src={arrow} id="arrow" data-ecard={showEcard} data-show={selectedOption} onClick={() => { setshowEcard(true) }} />
                        </div>
                    </div>
                </div>
                </MathJaxContext>
            </div>
        )
    }
}