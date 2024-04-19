import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useQuestionService from '../hooks/useQuestionService';
import { Question } from '../@types/common';

const QuestionListComponent = () => {
    const { getQuestions } = useQuestionService();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const categories = ["Reading", "Writing", "Math"];
    const difficulties = ["Easy", "Medium", "Hard"]; // Replace with real logic later

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getQuestions();
            if (data) {
                setQuestions(data);
                setFilteredQuestions(data);
            }
        };

        fetchQuestions();
    }, []);

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

    return (
        <div className="container mx-auto mt-5 p-4 bg-white shadow-lg rounded-md max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Question List</h2>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category:</label>
                <select id="category" className="form-select mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={onCategoryChange}>
                    <option value="">All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="difficulty" className="block text-gray-700">Difficulty:</label>
                <select id="difficulty" className="form-select mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={onDifficultyChange}>
                    <option value="">All</option>
                    {difficulties.map((difficulty, index) => (
                        <option key={index} value={difficulty}>{difficulty}</option>
                    ))}
                </select>
            </div>

            <ul className="list-group">
                {filteredQuestions.map(question => (
                    <li key={question._id} className="list-group-item mb-2 p-3 bg-gray-100 rounded-md hover:bg-gray-200">
                        <Link to={`/question/${question._id}`} className="text-blue-600 hover:text-blue-800">{question.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionListComponent;
