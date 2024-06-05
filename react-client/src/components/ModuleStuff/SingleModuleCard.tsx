import React from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../../@types/common';
import './SingleModuleCard.css'
import calc from './images/orange-calc.png';
import eng from './images/turq-book.png';
import read from './images/purp-book.png';

interface ModuleCardProps {
    module: Module;
    backgroundId: string;
    mastery: number; // Add mastery data later
}

const SingleModuleCardComponent: React.FC<ModuleCardProps> = ({ module, backgroundId, mastery }) => {
    const masteryPercentage = `${mastery}% Mastery`;
    const estimatedTime = `ET: ${module.estimatedTime} min`;

    return (
        <div className={`module-card-cont ${backgroundId} overflow-hidden w-1/3 min-w-[250px] a${module._id} relative`}>
            <img className='hidden absolute top-0 right-0 h-4/5' data-ver='m1' src={calc}/>
            <img className='hidden absolute top-0 right-0 h-4/5' data-ver='m2' src={eng}/>
            <img className='hidden absolute top-0 right-0 h-4/5' data-ver='m3' src={read}/>
            <div className='text-3xl z-10'>
                <h1>{module.title}</h1>
            </div>
            <div className='flex justify-between items-end text-xl'>
                <div>
                    <h3>{module.category}</h3>
                    <h3>{masteryPercentage}</h3>
                </div>
                <div className={'flex justify-start'}>
                    <h2 className='text-2xl font-semibold rounded-[12px] px-3 text-white'>
                        <Link to={`/modules/${module._id}`}>Start</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default SingleModuleCardComponent;
