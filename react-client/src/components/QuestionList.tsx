import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuestionService from '../hooks/useQuestionService';
import { Question } from '../@types/common';
import { useAuth } from '../hooks/useAuth';

import './Home.css' // Change later

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
        navigate(`/question/${questionId}`);
    };

    return (
        <div className=''>
            <div className='mb-4'>
                <div className="text-2xl font-bold text-gray-800">Problem List</div>
                <div className='qlist-bar mt-2 h-1 bg-gray-300'></div>
            </div>
            <div className='qlist-box'>
                <div className="flex mb-4 space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="category" className="block text-gray-700">Category:</label>
                        <select id="category" className="form-select mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={onCategoryChange}>
                            <option value="">All</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="difficulty" className="block text-gray-700">Difficulty:</label>
                        <select id="difficulty" className="form-select mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={onDifficultyChange}>
                            <option value="">All</option>
                            {difficulties.map((difficulty, index) => (
                                <option key={index} value={difficulty}>{difficulty}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {filteredQuestions?.map(question => (
                    <div key={question._id}
                        className={`qlist-qCont p-4 rounded-md ${question.completed ? 'bg-green-100' : ''}`}
                        onClick={() => handleQuestionClick(question._id)}>
                        <div className='question-meta'>
                            <div className="text-lg font-semibold">{question.title}</div>
                            <div className="text-sm text-gray-600">{question.category}</div>
                        </div>
                        <div className='question-diff' data-diff={question.difficulty.toLowerCase()}>
                            <div className="text-sm text-gray-800">{question.difficulty}</div>
                        </div>
                        <div className='qlist-bar'></div>
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <div className="text-gray-700">Page {currentPage} of {totalPages}</div>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionListComponent;
