import React, { useState } from 'react';
import useQuestionService from '../hooks/useQuestionService';
import { Question } from '../@types/common';

const AddQuestionComponent = () => {
    const { addQuestion } = useQuestionService();
    const [type, setType] = useState('');
    const [question, setQuestion] = useState<Question>({
        _id: '',
        type: '',
        title: '',
        author: '',
        problemStatement: '',
        category: '',
        difficulty: '',
        answerChoices: Array(4).fill({ text: '', isCorrect: false }),
        has_img: false,
        img_link: '',
        passage: '',
        explanation: '',
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target; // Destructure 'type' and 'checked' from the event target

        if (name.startsWith('choice')) {
            const index = parseInt(name.replace('choice', ''), 10);
            const newChoices = [...question.answerChoices];
            newChoices[index] = { ...newChoices[index], text: value };
            setQuestion({ ...question, answerChoices: newChoices });
        } else if (name.startsWith('isCorrect')) {
            const index = parseInt(name.replace('isCorrect', ''), 10);
            const newChoices = [...question.answerChoices];
            newChoices[index] = { ...newChoices[index], isCorrect: checked }; // Use 'checked' for checkboxes
            setQuestion({ ...question, answerChoices: newChoices });
        } else if (type === 'checkbox') {
            // This will handle any checkbox inputs, including 'has_img'
            setQuestion({ ...question, [name]: checked, img_link: name === 'has_img' ? '' : question.img_link }); // Use 'checked' for checkboxes
        } else {
            // This handles all other inputs (e.g., text, textarea)
            setQuestion({ ...question, [name]: value }); // Use 'value' for other inputs
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await addQuestion(question, type);
            // Handle successful question submission
            alert('Question submitted successfully!'); // This line adds the alert
        } catch (error) {
            // Handle error
            console.error('Submission error:', error);
            alert('Failed to submit the question. Please try again.'); // Optional: alert for an error
        }
    };


    return (
        <div className="max-w-4xl mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 rounded-md" value={question.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="title" className="block text-gray-700">Author:</label>
                    <input type="text" id="author" name="author" className="w-full p-2 border border-gray-300 rounded-md" value={question.author} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="type" className="block text-gray-700">Question Type:</label>
                    <select
                        id="type"
                        name="type"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Select Question Type</option>
                        <option value="math">Math</option>
                        <option value="calc">Math with Calculator</option>
                        <option value="grammar">Grammar</option>
                        <option value="science">Science</option>
                        <option value="reading">Reading</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="problemStatement" className="block text-gray-700">Problem Statement:</label>
                    <textarea id="problemStatement" name="problemStatement" className="w-full p-2 border border-gray-300 rounded-md" value={question.problemStatement} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="category" className="block text-gray-700">Category:</label>
                    <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 rounded-md" value={question.category} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-gray-700">Difficulty:</label>
                    <input type="text" id="difficulty" name="difficulty" className="w-full p-2 border border-gray-300 rounded-md" value={question.difficulty} onChange={handleChange} required />
                </div>

                {question.answerChoices.map((choice, index) => (
                    <div key={index} className="space-y-2">
                        <label htmlFor={`choice${index}`} className="block text-gray-700">Choice {index + 1}:</label>
                        <input type="text" id={`choice${index}`} name={`choice${index}`} className="w-full p-2 border border-gray-300 rounded-md" value={choice.text} onChange={handleChange} required />
                        <div className="flex items-center">
                            <input type="checkbox" id={`isCorrect${index}`} name={`isCorrect${index}`} className="form-checkbox h-5 w-5 text-blue-600" checked={choice.isCorrect} onChange={handleChange} />
                            <label htmlFor={`isCorrect${index}`} className="ml-2 text-gray-700">Is Correct</label>
                        </div>
                    </div>
                ))}

                <div>
                    <label htmlFor="has_img" className="block text-gray-700">Has Image:</label>
                    <input
                        type="checkbox"
                        id="has_img"
                        name="has_img"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={question.has_img}
                        onChange={handleChange}
                    />
                </div>

                {question.has_img && (
                    <div>
                        <label htmlFor="img_link" className="block text-gray-700">Image Link:</label>
                        <input
                            type="text"
                            id="img_link"
                            name="img_link"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={question.img_link}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="passage" className="block text-gray-700">Passage:</label>
                    <textarea
                        id="passage"
                        name="passage"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={question.passage}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="explanation" className="block text-gray-700">Explanation:</label>
                    <textarea
                        id="explanation"
                        name="explanation"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={question.explanation}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Submit</button>
            </form>
        </div>
    );
};

export default AddQuestionComponent;
