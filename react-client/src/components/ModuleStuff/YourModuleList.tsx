import React from 'react';
import { Link } from 'react-router-dom';
import useModules from '../../hooks/useModules';
import { Module } from '../../@types/common';
import SingleModuleCardComponent from './SingleModuleCard';

interface ModuleListProps {
    topic: string;
}

const YourModuleList: React.FC<ModuleListProps> = ({ topic }) => {
    const { modules, getModulesByTopic, loading, error } = useModules();
    const filteredModules = getModulesByTopic(topic);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full h-full grid grid-cols-3 place-items-center pb-4">
            {filteredModules.map((module, index) => (
                <SingleModuleCardComponent
                    key={module._id}
                    module={module}
                    backgroundId={`module-bg${index + 1}`}
                    mastery={0} // Replace with actual mastery data later
                />
            ))}
        </div>
    );
};

export default YourModuleList;
