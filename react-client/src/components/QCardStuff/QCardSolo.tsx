import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useQuestionService from '../../hooks/useQuestionService';
import { Question } from '../../@types/common';
import './QCardSolo.css';
import { useAuth } from '../../hooks/useAuth';

interface QuestionDetailProps {
    loadQuestion?: Question;
}

const QCardSolo: React.FC<QuestionDetailProps> = ({ loadQuestion }) => {
    const { getQuestion, submitAnswer } = useQuestionService();
    const [question, setQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state
    const { currentUser } = useAuth();
    const { id } = useParams();

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

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-screen max-h-dvh relative'>
            <div className='flex items-center justify-between h-11 bg-[#CAF0F8] px-4 border-b border-[rgba(140,147,153,.2)]'>
                <h3 className='text-white bg-[#040033] px-2 py-[.5px] rounded-md font-semibold cursor-pointer'><Link to={"/current-home"}>Exit</Link></h3>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl'>{question.title}</h1>
                    <h3><i>{question.category}</i></h3>
                </div>
                <h3>Ping</h3>
            </div>
            <div className='flex relative' style={{"height": "calc(100dvh - 44px - 80px)"}}>
                {/* Left section */}
                <div className='flex-1 mx-10 my-7 font-medium overflow-scroll flex flex-col gap-4'>
                    {question.problemStatement}
                     {/* Left hidden answer choices */}
                    {isCorrect !== null && (
                        <div className='qcard-answer-section flex flex-col gap-4'>
                            {question.answerChoices && question.answerChoices.map((choice, index) => (
                                <div
                                    key={index}
                                    className={`qcard-answer-choice ${choice.isCorrect ? 'correct' : selectedAnswer === choice.text ? 'incorrect' : ''}`}
                                >
                                    <div id="qcard-letter"><h2><span>{String.fromCharCode(65 + index)}</span></h2></div>
                                    <div className='qcard-choice-cont'><h2>{choice.text}</h2></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='h-[80%] w-[2px] bg-[#040033] self-center rounded-md'></div>
                {/* Right section */}
                <div className='flex-1 mx-10 my-7'>
                    {isCorrect === null ? (
                        <form onSubmit={handleSubmit} className='qcard-form flex flex-col gap-4'>
                            {question.answerChoices && question.answerChoices.map((choice, index) => (
                                <div
                                    key={index}
                                    className={`qcard-answer-choice ${selectedAnswer === choice.text ? 'selected' : ''}`}
                                    onClick={() => { setSelectedAnswer(choice.text); setIsCorrect(null); }}
                                >
                                    <div id="qcard-letter"><h2><span>{String.fromCharCode(65 + index)}</span></h2></div>
                                    <div className='qcard-choice-cont'><h2>{choice.text}</h2></div>
                                </div>
                            ))}
                            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    ) : (
                        <div className=''>
                            <h2 className='text-lg'><b>Explanation</b></h2>
                            <div className="">
                                {question.explanation + "YO DAZO"}
                            </div>
                        </div>
                    )}
                    {message && <p className="mt-4 text-gray-600">{message}</p>}
                </div>
            </div>
            <div className='h-20'>
                <h3 className='text-right px-10'>{' Continue -->'}</h3>
            </div>
        </div>
    );
};

export default QCardSolo;
