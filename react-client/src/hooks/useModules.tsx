import { useState, useEffect } from 'react';
import { Module, Question } from '../@types/common';

const useModules = () => {
    const baseUrl = 'https://sbapidev.com/api/modules';
    const addModuleUrl = 'https://sbapidev.com/api/add-module';

    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModules = async () => {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setModules(data);
            setLoading(false);

            console.log(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('Failed to fetch modules');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const getCategoriesWithTopics = () => {
        const categories: { [key: string]: string[] } = {};

        modules.forEach(module => {
            if (!categories[module.category]) {
                categories[module.category] = [];
            }
            if (!categories[module.category].includes(module.topic)) {
                categories[module.category].push(module.topic);
            }
        });

        return categories;
    };

    const getModulesByTopic = (topic: string) => {
        return modules.filter(module => module.topic === topic);
    };

    const getModuleById = (id: string) => {
        return modules.find(module => module._id === id);
    };

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

    const addModule = async (moduleData: Module) => {
        try {
            const response = await fetch(`${addModuleUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: moduleData._id,
                    title: moduleData.title,
                    category: moduleData.category,
                    topic: moduleData.topic,
                    estimatedTime: moduleData.estimatedTime,
                    description: moduleData.description,
                    questions: moduleData.questions,
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


    return { modules, getCategoriesWithTopics, getModulesByTopic, getModuleById, getModules, getModule, addModule, loading, error };
};

export default useModules;
