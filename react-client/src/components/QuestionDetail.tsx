import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useQuestionService from '../hooks/useQuestionService';
import { Question } from '../@types/common';

const QuestionDetailComponent = () => {
    const { getQuestion } = useQuestionService();
    const [question, setQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!question) {
            return;
        }

        const correctAnswer = question.answerChoices.find((choice) => choice.isCorrect);
        if (correctAnswer && selectedAnswer === correctAnswer.text) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.title}</h2>
            <p className="text-gray-600"><strong>Category:</strong> {question.category}</p>
            <p className="text-gray-600"><strong>Difficulty:</strong> {question.difficulty}</p>
            <p className="text-gray-600 mb-4"><strong>Problem Statement:</strong> {question.problemStatement}</p>

            <form onSubmit={handleSubmit} className="mt-4">
                <fieldset id="answerGroup">
                    {question.answerChoices && question.answerChoices.map((choice, index) => (
                        <div key={index} className={`flex items-center mb-2 ${selectedAnswer === choice.text && isCorrect === false ? 'bg-red-200' : selectedAnswer === choice.text && isCorrect === true ? 'bg-green-200' : ''}`}>
                            <input
                                className="form-radio h-5 w-5 text-blue-600"
                                type="radio"
                                value={choice.text}
                                checked={selectedAnswer === choice.text}
                                onChange={(e) => { setSelectedAnswer(e.target.value); setIsCorrect(null); }}
                                name="answer"
                                id={`choice${index}`}
                            />
                            <label className="ml-2 text-gray-700" htmlFor={`choice${index}`}>{choice.text}</label>
                        </div>
                    ))}
                </fieldset>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
            </form>
            {isCorrect !== null && (
                <p className={`mt-4 text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Correct answer!' : 'Incorrect answer, please try again.'}
                </p>
            )}
            {message && <p className="mt-4 text-gray-600">{message}</p>}
        </div>
    );
};

export default QuestionDetailComponent;
