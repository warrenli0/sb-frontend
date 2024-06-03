import React from 'react';
import { Link } from 'react-router-dom';
import useModules from '../hooks/useModules';
import { Module } from '../@types/common';
import ModuleCardComponent from './ModuleCard';

interface ModuleListProps {
    topic: string;
}

const ModuleListComponent: React.FC<ModuleListProps> = ({ topic }) => {
    const { modules, getModulesByTopic, loading, error } = useModules();
    const filteredModules = getModulesByTopic(topic);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto mt-5 p-4 bg-white shadow-lg rounded-md max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module List</h2>
            <div className="flex overflow-x-auto space-x-4">
                {filteredModules.map((module, index) => (
                    <ModuleCardComponent
                        key={module._id}
                        module={module}
                        backgroundId={`module-bg${index + 1}`}
                        mastery={0} // Replace with actual mastery data later
                    />
                ))}
            </div>
        </div>
    );
};

export default ModuleListComponent;
