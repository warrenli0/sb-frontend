import { useState, useEffect } from 'react';
import { Question } from '../@types/common';

const useQuestionService = () => {
    const baseUrl = 'https://sbapidev.com/api/questions';
    const addQuestionUrl = 'https://sbapidev.com/api/add-questions';

    const getQuestions = async () => {
        try {
            const response = await fetch(baseUrl);
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


    return { getQuestions, getQuestion, addQuestion };
};

export default useQuestionService;
