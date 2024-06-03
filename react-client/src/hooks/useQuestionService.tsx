import { useState, useEffect } from 'react';
import { Question } from '../@types/common';

const useQuestionService = () => {
    const baseUrl = 'https://sbapidev.com/api/questions';
    const addQuestionUrl = 'https://sbapidev.com/api/add-questions';
    const submitAnswerUrl = 'https://sbapidev.com/api/submit-answer';
    const userQuestionsUrl = 'https://sbapidev.com/api/user';

    const getQuestions = async (page = 1, limit = 10) => {
        try {
            const response = await fetch(`${baseUrl}?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getQuestion = async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const addQuestion = async (questionData: Question, type: String) => {
        try {
            const response = await fetch(`${addQuestionUrl}/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: questionData._id,
                    type: type,
                    title: questionData.title,
                    author: questionData.author,
                    category: questionData.category,
                    difficulty: questionData.difficulty,
                    problemStatement: questionData.problemStatement,
                    answerChoices: questionData.answerChoices,
                    has_img: questionData.has_img,
                    img_link: questionData.img_link,
                    passage: questionData.passage,
                    explanation: questionData.explanation,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const submitAnswer = async (userId: string, questionId: string, isCorrect: boolean, isUnderstood: boolean) => {
        console.log(userId);
        if (userId === '') return;
        try {
            const response = await fetch(submitAnswerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,  // Replace with actual userId
                    questionId,
                    isCorrect,
                    isUnderstood,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const getQuestionsWithCompletionStatus = async (userId?: string, page = 1, limit = 10) => {
        try {
            const url = userId
                ? `${userQuestionsUrl}/${userId}/questions?page=${page}&limit=${limit}`
                : `${baseUrl}?page=${page}&limit=${limit}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return { getQuestions, getQuestion, addQuestion, submitAnswer, getQuestionsWithCompletionStatus };
};

export default useQuestionService;
