import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { Question } from '../../@types/common';
import { useAuth } from '../../hooks/useAuth';

import '../Home.css' // Change later

const QuestionListComponent = () => {
    const { getQuestions, getQuestionsWithCompletionStatus } = useQuestionService();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const categories = ["Reading", "Writing", "Math"];
    const difficulties = ["Easy", "Medium", "Hard"]; // Replace with real logic later
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const pageSize = 10;

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
    }, [currentPage]);

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
        navigate(`/current-question/${questionId}`);
    };

    return (
        <div className='w-[100%] px-7 py-4 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]'>
            <div className='mb-4'>
                <h1 className='text-3xl'>Problem List</h1>
            </div>
            <div className="w-full flex mb-6 justify-between">
                <div className='flex space-x-4'>
                    <h1>Filters:</h1>
                    <button className='bg-[#F2F3F4] text-[#555555] rounded-[12px] px-2 py-0.5 drop-shadow-[0_2px_0px_rgba(140,147,153,.3)] flex items-center justify-center gap-2 relative bottom-[2px]'>
                        Difficulty
                        <svg height="10" viewBox="-2.5 -5 75 60" preserveAspectRatio="none">
                            <path d="M0,0 l35,50 l35,-50" fill="none" stroke="#555555" stroke-linecap="round" stroke-width="10" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button className='bg-[#3483F9] text-white font-bold rounded-[12px] px-2 py-0.5 drop-shadow-[0_2px_0px_rgba(9,85,199,1)] relative bottom-[2px]'>Create Custom Set</button>
                </div>
            </div>

            <div className='w-full h-[1px] bg-[#040033] thisisabarBTW'></div>
            {filteredQuestions?.map(question => (
                <div className=''>
                    <div key={question._id}
                        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors ${question.completed ? 'bg-green-100' : ''}`}
                        onClick={() => handleQuestionClick(question._id)}>
                        <div className='flex items-center gap-4'>
                            <div className="text-lg font-medium">{question.title}</div>
                            <div className="text-sm text-[#555555]">{question.category}</div> {/* TODO: for now category but should be subtopic */}
                        </div>
                        <div className='text-lg font-medium question-diff' data-diff={question.difficulty.toLowerCase()}>{question.difficulty}</div>
                    </div>
                    <div className='w-full h-[1px] bg-[#040033] thisisabarBTW'></div>
                </div>
            ))}
            
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <div className="text-gray-700">Page {currentPage} of {totalPages}</div>
                <button
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuestionListComponent;
