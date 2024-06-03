import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useModules from '../hooks/useModules';
import useQuestions from '../hooks/useQuestionService';
import { Module, Question } from '../@types/common';
import QuestionDetailComponent from './QuestionDetail';

const ModuleStart: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { modules, loading, getModuleById } = useModules();
    const { getQuestion } = useQuestions();
    const [module, setModule] = useState<Module | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showExplanation, setShowExplanation] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModule = async () => {
            if (id) {
                const data = await getModuleById(id);
                if (data) {
                    setModule(data);
                    if (data.questions.length > 0) {
                        const firstQuestion = await getQuestion(data.questions[0]);
                        setCurrentQuestion(firstQuestion);
                        console.log('First question:', firstQuestion);
                    }
                }
                console.log(data);
            }
        };
        console.log(id);

        fetchModule();
    }, [id, modules, loading]);

    const handleNextQuestion = async () => {
        if (module && currentQuestionIndex < module.questions.length - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            const nextQuestion = await getQuestion(module.questions[nextQuestionIndex]);
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            // Handle end of module
            navigate(`/modules/${id}`);
        }
    };

    const handleStartModule = () => {
        setShowExplanation(false);
    };

    if (!module || !currentQuestion) {
        return <div>Loading...</div>;
    }

    if (showExplanation) {
        return (
            <div className="container mx-auto mt-5 p-4 bg-white shadow-lg rounded-md max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h2>
                <div className="mb-4">
                    <p className="text-gray-700">{module.content || "Yo DAZO"}</p>
                </div>
                <button
                    onClick={handleStartModule}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Start Module
                </button>
            </div>
        );
    }

    return (
        <div className=" mx-auto bg-white shadow-lg rounded-md ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {module.questions.length}</h3>
                <p className="text-gray-700">{currentQuestion.problemStatement}</p>
            </div>
            <QuestionDetailComponent loadQuestion={currentQuestion} />
            <button
                onClick={handleNextQuestion}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Next Question
            </button>
        </div>
    );
};

export default ModuleStart;
