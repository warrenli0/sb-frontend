import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { Question } from '../../@types/common';
import { useAuth } from '../../hooks/useAuth';

import YourModuleList from './YourModuleList';
import '../Home.css' // Change later
import petBeach from './pet_images/pet-beach.png';
import cocoTemp from './pet_images/coco-placeholder.png';

const CurrentHome = () => {
    //const { getQuestions, getQuestionsWithCompletionStatus } = useQuestionService();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const categories = ["Reading", "Writing", "Math"];
    const difficulties = ["Easy", "Medium", "Hard"]; // Replace with real logic later
    const navigate = useNavigate();
    //const { currentUser } = useAuth();
    const pageSize = 10;

    /* pet stuff */
    const [petLevel, setpetLevel] = useState(7);

    /*
    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getQuestionsWithCompletionStatus(currentUser?._id, currentPage, pageSize);
            if (data) {
                setQuestions(data.questions);
                setFilteredQuestions(data.questions);
                setTotalPages(data.totalPages);
            }
            console.log(data);
        };

        fetchQuestions();
    }, [currentPage]);*/

    const onCategoryChange = (e: any) => {
        const category = e.target.value;
        // Filter questions based on the selected category
        // Update filteredQuestions state
    };

    const onDifficultyChange = (e: any) => {
        const difficulty = e.target.value;
        // Filter questions based on the selected difficulty
        // Update filteredQuestions state
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleQuestionClick = (questionId: string) => {
        navigate(`/question/${questionId}`);
    };

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
            <div className='bg-white text-[#040033] text-xl border-b border-[rgba(140,147,153,.2)] px-5 py-1.5 flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>SB</h1>
                <div className='hidden md:flex gap-x-10 font-medium'>
                    <h1 className='hover:underline'>Home</h1>
                    <h1>Modules</h1>
                    <h1>Dashboard</h1>
                    <h1>Mock Exams</h1>
                    <button className="text-xl font-semibold rounded-[12px] c px-3 bg-[#3483F9] text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)]">Login</button>
                </div>
            </div>

            <div className='bg-[#E9F5FF] min-h-dvh px-20 py-10 flex flex-col gap-10 text-[#040033]'>
                <div className="flex justify-between w-full">
                    <div className="w-[30%] min-h-60 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]">
                        <div className='bg-[#D7E7FF] rounded-t-2xl flex items-center justify-between px-7 h-[25%]'>
                            <h1 className='text-3xl'>Practice</h1>
                            <h4 className='bg-[rgba(255,255,255,.7)] px-1 rounded-sm'>{"Missed Qs >"}</h4>
                        </div>
                        <div className='h-[75%] px-7 flex flex-col justify-evenly'>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-lg underline'>Review</h2>
                                <div className='flex items-center justify-between text-lg'>
                                    <h2 className='bg-[#D7E7FF] px-1 rounded-sm'>As I Go</h2>
                                    <h2>Per Section</h2>
                                    <h2>At the End</h2>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-lg underline'>Questions</h2>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-5 text-lg'>
                                        <h2 className='bg-[#D7E7FF] px-1 rounded-sm'>5</h2>
                                        <h2>10</h2>
                                        <h2>15</h2>
                                        <h2>{"∞"}</h2>
                                    </div>
                                    <button className='text-2xl font-semibold rounded-[12px] bg-[#3483F9] px-3 text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] relative bottom-1'>Start</button>
                                </div>
                            </div>  
                        </div>
                    </div>

                    <div className="w-[30%] min-h-60 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]">
                        <div className='bg-[#FFF2CB] text-3xl rounded-t-2xl flex items-center justify-between px-7 h-[25%]'>
                            <h1 className=''>Daily Goal</h1>
                            <h1 className='text-[#F23818] text-2xl font-semibold'>7 🔥</h1>
                        </div>
                        <div className='h-[75%] px-7 flex flex-col justify-evenly'>
                        </div>
                    </div>

                    <div className="w-[30%] min-h-60 bg-[#ddfff2] overflow-hidden rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)] relative">
                        <div className='flex items-center justify-between px-7 h-[25%]'>
                            <div className='flex items-center gap-3'>
                                <h1 className='text-3xl'>Coco</h1>
                                <h4 className='font-light'>Level {petLevel}</h4>
                            </div>
                        </div>
                        <div className='bg-white ml-7 w-[40%] h-4 rounded-lg relative'>
                            <div className='bg-[#82FFCF] w-[40%] h-4 rounded-lg absolute left-0'></div>
                        </div>
                        <img className='absolute bottom-0' src={petBeach}/>
                        <img className='absolute bottom-5 right-10 h-36' src={cocoTemp}/>
                    </div>
                </div>

                <div className="w-[100%] h-72 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)] flex flex-col">
                    <div className='h-1/5 flex items-center justify-between px-7'>
                        <h1 className='text-3xl'>Your Modules</h1>
                        <div className='flex items-center gap-3'>
                            <input className='w-5 h-5' type='checkbox'></input>
                            <h4>Show In-Progress</h4>
                        </div>
                    </div>
                    <div className='h-4/5 flex items-center justify-between px-7'>
                        <YourModuleList topic="Calculus"/>
                    </div>
                </div>
                
                <div className="w-[100%] px-7 py-4 min-h-72 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]">
                    <h1 className='text-3xl'>Problem List</h1>
                </div>
            </div>
        </div>
    );
};

export default CurrentHome;
