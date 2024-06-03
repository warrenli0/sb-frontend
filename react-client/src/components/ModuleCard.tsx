import React from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../@types/common';
import './Modules.css';

interface ModuleCardProps {
    module: Module;
    backgroundId: string;
    mastery: number; // Add mastery data later
}

const ModuleCardComponent: React.FC<ModuleCardProps> = ({ module, backgroundId, mastery }) => {
    const masteryPercentage = `${mastery}% Mastery`;
    const estimatedTime = `ET: ${module.estimatedTime} min`;

    return (
        <div className={`module-card ${backgroundId} w-1/3 min-w-[250px]`}>
            <div className='module-head'>
                <h1>{module.title}</h1>
            </div>
            <div className='module-meta'>
                <div>
                    <h3>{estimatedTime}</h3>
                    <h3>{masteryPercentage}</h3>
                </div>
                <div id='module-start'>
                    <h2>
                        <Link to={`/modules/${module._id}`}>Start</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ModuleCardComponent;
