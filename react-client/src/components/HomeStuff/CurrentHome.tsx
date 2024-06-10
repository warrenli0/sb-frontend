import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { Question } from '../../@types/common';
import { useAuth } from '../../hooks/useAuth';

import YourModuleList from '../ModuleStuff/YourModuleList';
import YourQuestionList from './YourQuestionList';
import '../Home.css' // Change later > TODO: delete
import './CurrentHome.css' // needed for minor stuff

import petBeach from './pet_images/pet-beach.png';
import cocoTemp from './pet_images/coco-placeholder.png';
import eggo from './pet_images/temp-egg.png';

import NavBar from '../NavBarStuff/NavBar';

const CurrentHome = () => {

    /* goal + pet stuff */
    const [petLevel, setpetLevel] = useState(7);
    const [progress, setProgress] = useState(75); //unused
    const [probSolvedToday, setprobSolvedToday] = useState(12);
    const [goalProblems, setgoalProblems] = useState(21);
    
    /* practice card stuff */
    const [reviewStyle, setreviewStyle] = useState(0); // 0 = as i go, 1 = per section, 2 = at the end
    const [questionNums, setquestionNums] = useState(0);

    /*
        <div className="container mx-auto flex justify-between items-center">
                    <div className="font-bold text-lg">SB</div>
                    <div className="hidden sm:flex space-x-4 font-medium">
                        <a href="#home" className="hover:underline">Home</a>
                        <a href="#modules" className="hover:underline">Modules</a>
                        <a href="#dashboard" className="hover:underline">Dashboard</a>
                        <a href="#mockexam" className="hover:underline">Mock Exam</a>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                    </div>
                    <div className="sm:hidden">
                        <button className="text-[#040033] focus:outline-none">Menu</button>
                    </div>
                </div>
    */  

    return (
        <div>
            {/*NavBar*/}
            <NavBar under={0}/>

            <div className='bg-[#E9F5FF] min-h-dvh px-20 pt-5 pb-10 flex flex-col gap-10 text-[#040033]'>
                {/*Top3*/}
                <div className="flex justify-between w-full">
                    {/*Practice*/}
                    <div className="w-[30%] min-h-60 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]">
                        <div className='bg-[#D7E7FF] rounded-t-2xl flex items-center justify-between px-7 h-[25%]'>
                            <h1 className='text-3xl font-medium'>Practice</h1>
                            <h4 className='bg-[rgba(255,255,255,.7)] px-1 rounded-sm cursor-pointer'>{"Missed Qs >"}</h4>
                        </div>
                        <div className='h-[75%] px-7 flex flex-col justify-evenly'>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-lg underline'>Review</h2>
                                <div className='flex items-center justify-between text-lg'>
                                    <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${reviewStyle==0 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`}  onClick={() => {setreviewStyle(0)}}>As I Go</h2>
                                    <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${reviewStyle==1 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`}  onClick={() => {setreviewStyle(1)}}>Per Section</h2>
                                    <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${reviewStyle==2 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`}  onClick={() => {setreviewStyle(2)}}>At the End</h2>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-lg underline'>Questions</h2>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3 text-lg'>
                                        <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${questionNums==0 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`} onClick={() => {setquestionNums(0)}}>5</h2>
                                        <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${questionNums==1 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`} onClick={() => {setquestionNums(1)}}>10</h2>
                                        <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${questionNums==2 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`} onClick={() => {setquestionNums(2)}}>15</h2>
                                        <h2 className={`px-1 rounded-sm cursor-pointer transition-all hover:bg-[#f1f7ff] ${questionNums==3 ? 'bg-[#D7E7FF] hover:bg-[#D7E7FF]' : ''}`} onClick={() => {setquestionNums(3)}}>{"∞"}</h2>
                                    </div>
                                    <button className='text-2xl font-semibold rounded-[12px] bg-[#3483F9] px-3 text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] relative bottom-1 hover:bg-[#0e6bf8] transition-colors'>Start</button>
                                </div>
                            </div>  
                        </div>
                    </div>

                    {/*Daily Goal*/}
                    <div className="w-[30%] min-h-60 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]">
                        <div className='bg-[#FFF2CB] text-3xl rounded-t-2xl flex items-center justify-between px-7 h-[25%]'>
                            <h1 className='font-medium'>Daily Goal</h1>
                            <h1 className='text-[#F23818] text-2xl font-semibold'>7 🔥</h1>
                        </div>
                        <div className='h-[75%] w-full px-7 flex flex-col justify-evenly relative'>
                            <div className='w-full flex items-center justify-evenly'>
                                <div className='w-[40%] flex justify-center'>
                                    <div className='w-[100px] h-[100px] rounded-[50%] flex items-center justify-center'
                                        style={{
                                        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#FFCA41 ${Math.trunc((probSolvedToday/goalProblems)*100)}%, #FFF2CB 0)`
                                        }}
                                    >
                                        <h1 className='text-3xl text-[#FFCA41] font-bold'>{Math.trunc((probSolvedToday/goalProblems)*100)}%</h1>
                                    </div>
                                </div>
                                <div className='w-[60%]'>
                                    <h2 className='text-xl text-center'>{probSolvedToday}/{goalProblems} Problems Completed</h2>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <h4 className='font-light'>“studying hard or hardly studying?”</h4>
                            </div>
                        </div>
                    </div>

                    {/*Pet*/}
                    <div className="w-[30%] min-h-60 bg-[#ddfff2] overflow-hidden rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)] relative">
                        <div className='flex items-center justify-between px-7 h-[25%]'>
                            <div className='flex items-center gap-3'>
                                <h1 className='text-3xl font-medium'>Coco</h1>
                                <h4 className='font-light'>Level {petLevel}</h4>
                            </div>
                        </div>
                        <div className='bg-white ml-7 w-[40%] h-4 rounded-lg relative'>
                            <div className='bg-[#82FFCF] w-[40%] h-4 rounded-lg absolute left-0'></div>
                            <h4 className='font-light absolute top-7'>Qs Left: 20</h4>
                        </div>
                        <img className='absolute bottom-0' src={petBeach}/>
                        <img className='absolute bottom-5 right-10 h-36' src={cocoTemp}/>
                    </div>
                </div>

                {/*Your Modules*/}                          
                <div className="w-[100%] h-72 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)] flex flex-col">
                    <div className='h-1/5 flex items-center justify-between px-7'>
                        <h1 className='text-3xl font-medium'>Your Modules</h1>
                        <div className='flex items-center gap-3'>
                            <input className='w-5 h-5' type='checkbox'></input>
                            <h4>Show In-Progress</h4>
                        </div>
                    </div>
                    <div className='h-4/5 flex items-center justify-between px-7'>
                        <YourModuleList topic="Calculus"/>
                    </div>
                </div>
                
                {/*Q List*/}
                <YourQuestionList />
            </div>

            {/*Footer*/}
            <div className='bg-white text-[#040033] text-xl border-t border-[rgba(140,147,153,.2)] px-5 py-1.5 flex justify-between items-center'>
                <h4 className=''>Copyright @ 2024 Scholars Beacon</h4>
            </div>
        </div>
    );
};

export default CurrentHome;
