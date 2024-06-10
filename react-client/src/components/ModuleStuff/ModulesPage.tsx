import React, { useState } from 'react';
import useModules from '../../hooks/useModules';
import ModuleListComponent from './YourModuleList';
import NavBar from '../NavBarStuff/NavBar';
import lines from './images/lines-view.png';

const ModulesPage: React.FC = () => {
    const { getCategoriesWithTopics, loading, error } = useModules();
    const [selectedCategory, setSelectedCategory] = useState<string>('Math'); // Default to 'Math'

    // modules misc
    const [totalModules, settotalModules] = useState(10);
    const [totalMastered, settotalMastered] = useState(2);

    const categoriesWithTopics = getCategoriesWithTopics();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className=''>
            <NavBar under="1" />
            <div className='bg-[#E9F5FF] min-h-dvh px-20 py-5 text-[#040033]'>
                <div className='w-full bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]'>
                    {/*module head*/}
                    <div className='bg-[#FFF3D6] rounded-t-2xl px-7 flex items-center justify-between h-12'>
                        <div className='flex gap-8 text-2xl'>
                            {Object.keys(categoriesWithTopics).map(category => (
                                <h1
                                    key={category}
                                    className={`font-semibold cursor-pointer ${selectedCategory === category ? 'text-[#040033]' : 'text-[#827984]'}`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </h1>
                            ))}
                        </div>
                        <div className='flex gap-3'>
                            <h3>Filter by:</h3>
                            <button className='bg-[#040033] font-medium text-white rounded-[12px] px-2 py-0.5 drop-shadow-[0_2px_0px_rgba(140,147,153,.3)] flex items-center justify-center gap-2 relative bottom-[2px]'>
                                Status
                                <svg height="10" viewBox="-2.5 -5 75 60" preserveAspectRatio="none">
                                    <path d="M0,0 l35,50 l35,-50" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-width="10" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/*misc info*/}
                    <div className='flex items-center justify-between text-xl px-7 h-12'>
                        <div className='flex iems-center gap-8'>
                            <h1>Topics: {totalModules}</h1>
                            <h1>Mastered: {totalMastered}</h1>
                        </div>
                        <div className=''>
                            <img className='h-6' src={lines}/>
                        </div>
                    </div>
                    {/*module stuff*/}
                    <div className='flex flex-col mt-5 px-7'>
                        {categoriesWithTopics[selectedCategory]?.map(topic => (
                        <div key={topic} className='flex flex-col gap-4'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-2xl font-medium text-gray-800 underline'>{topic}</h2>
                                <h3>Completed 0 of 5</h3>
                            </div>
                            <div className='w-[100%] h-56'>
                                <ModuleListComponent topic={topic} />
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
