import React, { useState } from 'react';
import useModules from '../hooks/useModules'; // Make sure to create this hook to handle API calls
import { Module } from '../@types/common'; // Define the Module type in your types

const AddModuleComponent = () => {
    const { addModule } = useModules();
    const [module, setModule] = useState<Module>({
        _id: '',
        title: '',
        category: '',
        topic: '',
        estimatedTime: 0,
        description: '',
        questions: [],
        content: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setModule({ ...module, [name]: name === 'questions' ? value.split(',').map((q: any) => q.trim()) : value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await addModule(module);
            // Handle successful module submission
            alert('Module submitted successfully!');
        } catch (error) {
            // Handle error
            console.error('Submission error:', error);
            alert('Failed to submit the module. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Module</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 rounded-md" value={module.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="category" className="block text-gray-700">Category:</label>
                    <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 rounded-md" value={module.category} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="topic" className="block text-gray-700">Topic:</label>
                    <input type="text" id="topic" name="topic" className="w-full p-2 border border-gray-300 rounded-md" value={module.topic} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="estimatedTime" className="block text-gray-700">Estimated Time (minutes):</label>
                    <input type="number" id="estimatedTime" name="estimatedTime" className="w-full p-2 border border-gray-300 rounded-md" value={module.estimatedTime} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea id="description" name="description" className="w-full p-2 border border-gray-300 rounded-md" value={module.description} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="questions" className="block text-gray-700">Questions (comma-separated IDs):</label>
                    <input type="text" id="questions" name="questions" className="w-full p-2 border border-gray-300 rounded-md" value={module.questions.join(', ')} onChange={handleChange} required />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Submit</button>
            </form>
        </div>
    );
};

export default AddModuleComponent;
