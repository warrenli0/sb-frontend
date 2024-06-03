import React, { useState } from 'react';
import useModules from '../hooks/useModules';
import ModuleListComponent from './ModuleList';
import NavBar from './NavBar';
import arrow from '../images/right_arrow.png';

const ModulesPage: React.FC = () => {
    const { getCategoriesWithTopics, loading, error } = useModules();
    const [selectedCategory, setSelectedCategory] = useState<string>('Math'); // Default to 'Math'

    const categoriesWithTopics = getCategoriesWithTopics();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className=''>
            <NavBar under="2" />
            <div className='modules-cont  mx-auto bg-white shadow-lg rounded-md '>
                <div className='module-header '>
                    <div className='flex space-x-4'>
                        {Object.keys(categoriesWithTopics).map(category => (
                            <h1
                                key={category}
                                className={`text-xl font-bold cursor-pointer ${selectedCategory === category ? 'text-blue-500' : 'text-gray-700'}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </h1>
                        ))}
                    </div>
                    <div className='module-head-filter flex items-center space-x-2'>
                        <h2 className='text-lg'>Filter by:</h2>
                        <select id="module-select" className='form-select mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                            <option value="Status">Status</option>
                        </select>
                    </div>
                </div>
                <div className='modules-head-bar bg-gray-200 '></div>
                <div className='modules-main-content'>
                    {categoriesWithTopics[selectedCategory]?.map(topic => (
                        <div key={topic} className='module-list-cont '>
                            <div className='modulelist-head  '>
                                <h2 id="mListTitle" className='text-2xl font-bold text-gray-800'>{topic}</h2>
                            </div>
                            <ModuleListComponent topic={topic} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
