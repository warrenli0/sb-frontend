import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useQuestionService from '../hooks/useQuestionService';
import { Question } from '../@types/common';
import './QCardTemplate.css';
import { useAuth } from '../hooks/useAuth';

interface QuestionDetailProps {
    loadQuestion?: Question;
}

const QuestionDetailComponent: React.FC<QuestionDetailProps> = ({ loadQuestion }) => {
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
        <div className='qcard-bg'>
            <div className='qcard-top-bar'>
                <div className='qcard-exit-note'>
                    <div id='qcard-back-button'>
                        <h3><Link to={"/home"}>Exit</Link></h3>
                    </div>
                </div>
                <div className='qcard-question-head'>
                    <h1>{question.title}</h1>
                    <h3><i>{question.category}</i></h3>
                    <h3 id={'sub-color-' + question.difficulty}><i>{question.difficulty}</i></h3>
                </div>
            </div>
            <div className='qcard-top-line'></div>
            <div className='qcard-main-content'>
                <div className='qcard-left'>
                    <div className='latex-h2'>
                        {question.problemStatement}
                    </div>
                    {isCorrect !== null && (
                        <div className='qcard-answer-section'>
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
                <div className='qcard-mid-bar'><div></div></div>
                <div className='qcard-right'>
                    {isCorrect === null ? (
                        <form onSubmit={handleSubmit} className='qcard-form'>
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
                            <h2><b>Explanation</b></h2>
                            <div className="latex-h2">
                                {question.explanation + "YO DAZO"}
                            </div>
                        </div>
                    )}
                    {message && <p className="mt-4 text-gray-600">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default QuestionDetailComponent;
