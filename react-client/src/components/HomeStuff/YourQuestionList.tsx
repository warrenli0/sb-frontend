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
        navigate(`/question/${questionId}`);
    };

    return (
        <div className='w-[100%] px-7 py-4 min-h-72 bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]'>
            <div className='mb-4'>
                <h1 className='text-3xl'>Problem List</h1>
            </div>
            <div className=''>
                <div className="flex mb-4 space-x-4">
                    <h1>Filters:</h1>
                    <button>Difficulty</button>

                </div>
            </div>
        </div>
    );
};

export default QuestionListComponent;
