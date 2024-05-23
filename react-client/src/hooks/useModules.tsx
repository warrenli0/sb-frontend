import { useState, useEffect } from 'react';
import { Module, Question } from '../@types/common';

const useModules = () => {
    const baseUrl = 'https://sbapidev.com/api/modules';
    const addQuestionUrl = 'https://sbapidev.com/api/add-modules';

    const getModules = async () => {
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

    const getModule = async (id: string) => {
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

    const addModule = async (questionData: Question, type: String) => {
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


    return { getModules, getModule, addModule };
};

export default useModules;
