import React from 'react';
import './SignIn.css'
import outBeach from '../images/out-beach.png';
import inBeach from '../images/in-beach.png';
import beachPeng from '../images/chair-beach-peng.png';
import goog1 from '../images/googsvg.svg'
import face from '../images/facesvg.svg'
import whi from '../images/white_info.png'

import { useState, useEffect } from "react";
import { Textfit } from 'react-textfit';

export default function SignIn({ }) {
    const [loginCount, setloginCount] = useState(0);
    const [nameinvalid, setnameinvalid] = useState('0');

    // vars 4 user gen
    const [choseSAT, setchoseSAT] = useState('SAT'); // ACT or IDK
    const [name, setname] = useState('');
    const [userType, setuserType] = useState('Student');
    const [useremail, setuseremail] = useState('bingchilling@gmail.com');
    const [parentemail, setparentemail] = useState('');
    const [grade, setgrade] = useState('');
    const [schoolName, setschoolName] = useState('');

    // WAR: cont with google clicked
    function contWithGoogle() {
        setloginCount(loginCount + 1);

        // if possible to get person's full name, use setname() to prefill the field
    };

    // WAR: student about information
    function contFromAbout() {
        if (name == '') { // validity checks
            setnameinvalid('1'); // displays red border around Name input
        } else {
            setnameinvalid('0');
            setloginCount(loginCount + 1);

            /* can delete when done
            console.log(name);
            console.log(userType); // Student
            console.log(useremail);
            console.log(parentemail);
            console.log(grade); // Default, 9, 10, 11, 12, Young, Other (all strings)
            console.log(schoolName); */
        }
    }

    // WAR: chosing SAT, ACT, or IDK
    function chosenTestType(t: any) {
        // t is the var: SAT / ACT / IDK , all are strings
        setchoseSAT(t);
        setloginCount(loginCount + 1);
    };

    // WAR: test scores + exam date + goal
    function submitMiscInfo() {
        const userGoal = (document.getElementById("user-goal") as HTMLInputElement).value;

        if (choseSAT == 'IDK') {
            // only send over their goal
            return;
        }

        const examDate = (document.getElementById("exam-date") as HTMLInputElement).value;
        const engScore = (document.getElementById("english-score") as HTMLInputElement).value;
        const matScore = (document.getElementById("math-score") as HTMLInputElement).value;
        if (choseSAT == 'ACT') {
            const redScore = (document.getElementById("reading-score") as HTMLInputElement).value;
            const sciScore = (document.getElementById("science-score") as HTMLInputElement).value;
        }

        // send over scores 
        console.log(engScore);
        console.log(matScore);
        console.log(examDate);
        console.log(userGoal);

        //setloginCount(loginCount + 1);
    }

    function buttonClick() {
        setloginCount(loginCount + 1);
    };

    function ChoseSATorACT({ }) {
        return (
            <div className='login-score' data-exit={+loginCount}>
                <div className='login-score-head'>
                    <Textfit mode="single" style={{ height: '100%', display: 'flex', alignItems: "center", justifyContent: "center" }} max={60}>
                        {"Some Info..."}
                    </Textfit>
                </div>
                <div className='login-score-bar'>
                    <div className='login-score-bar-line'></div>
                </div>
                <div className='login-score-enter'>
                    <h4>Enter your current scores or Continue if you haven't taken an official or unofficial exam yet.</h4>
                    <div>
                        <h1>English</h1>
                        <input placeholder="200-800" id="english-score"></input>
                    </div>
                    <div>
                        <h1>Math</h1>
                        <input placeholder="200-800" id="math-score"></input>
                    </div>
                </div>
                <div className='login-score-bar'>
                    <div className='login-score-bar-line'></div>
                </div>
                <div className='login-score-date'>
                    <div>
                        <h1>Expected Date</h1>
                        <select id="exam-date">
                            <option value="Default">Choose</option>
                            <option value="May">May 4, 2024</option>
                            <option value="Jun">June 1, 2024</option>
                            <option value="Aug">August</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                            <option value="Later">Later</option>
                        </select>
                    </div>
                </div>
                <div className='login-score-bar'>
                    <div className='login-score-bar-line'></div>
                </div>
                <div className='login-score-misc'>
                    <div>
                        <h4>Enter in a goal you have for your test preparation!</h4>
                    </div>
                    <div>
                        <textarea id="user-goal" />
                    </div>
                    <div>
                        <div id='login-score-cont'>
                            <div onClick={() => submitMiscInfo()}>
                                <h4>Continue</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='login-cont reset-font'>
                <h1 className='login-top-left'>SB</h1>
                <img draggable="false" src={outBeach} className="login-out-beach" />
                <img draggable="false" src={inBeach} className="login-in-beach" />
                <img draggable="false" src={beachPeng} className="login-beach-peng" />

                <div className='login-box' data-exit={+loginCount}>
                    <h1>Login</h1>
                    <div className='login-box-bar'></div>
                    <div className='goog-button' onClick={() => contWithGoogle()}>
                        <img src={goog1} loading="lazy" alt="google logo"></img>
                        <p>Continue with Google</p>
                    </div>
                    <div className='goog-button' onClick={() => buttonClick()}>
                        <img src={face} loading="lazy" alt="facebook logo"></img>
                        <p>Continue with Facebook</p>
                    </div>
                    <h4>Other login formats coming soon!</h4>
                </div>

                <div className='login-about' data-exit={+loginCount}>
                    <h1>About You</h1>
                    <div className='login-about-bar'></div>
                    <div className='login-input-cont login-name-cont'>
                        <div>
                            <input placeholder="Name" data-invalid={nameinvalid} value={name} onChange={(e) => setname(e.target.value)}></input>
                        </div>
                        <div>
                            <select onChange={(e => setuserType(e.target.value))}>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                    </div>
                    <div className='login-input-cont login-email-cont'>
                        <input type="email" id="user_email" disabled={true} placeholder="Your email" value={useremail}></input>
                    </div>
                    <div className='login-input-cont login-parent-cont'>
                        <div>
                            <input type="email" placeholder="Parent's email" value={parentemail} onChange={(e) => setparentemail(e.target.value)}></input>
                        </div>
                        <div className='login-info-box'>
                            <img draggable="false" src={whi} />
                        </div>
                    </div>
                    <div className='login-input-cont login-grade-cont'>
                        <div>
                            <select onChange={(e => setgrade(e.target.value))}>
                                <option value="default">Grade:</option>
                                <option value="9">Grade 9</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                                <option value="12">Grade 12</option>
                                <option value="Young">Middle School</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <input placeholder="School Name" value={schoolName} onChange={(e) => setschoolName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='login-input-cont login-about-but' onClick={() => contFromAbout()}>
                        <h3>Sign up</h3>
                    </div>
                    <div className='login-about-tos'>
                        <h4>Privacy Policy</h4>
                        <h4>Terms of Service</h4>
                    </div>
                </div>

                <div className='login-choose' data-exit={+loginCount}>
                    <div>
                        <h1>Pick a test!</h1>
                    </div>
                    <div>
                        <div className='login-box-bar'></div>
                    </div>
                    <div className='login-choices'>
                        <div onClick={() => chosenTestType('SAT')}><h1>SAT</h1></div>
                        <div onClick={() => chosenTestType('ACT')}><h1>ACT</h1></div>
                    </div>
                    <div><h4 onClick={() => chosenTestType('IDK')}>I haven't decided yet</h4></div>
                </div>

                <ChoseSATorACT />
            </div>
        </div>
    );
}