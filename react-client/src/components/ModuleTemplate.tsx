import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ModuleTemplate.css';
import badge from '../images/temp-badge.png';
import peng from '../images/module-peng.png';

import NavBar from './NavBar';
import useModules from '../hooks/useModules';
import { Module } from '../@types/common';

export default function ModuleTemplate({ }: any) {
    const { modules, getModuleById } = useModules();
    const [module, setModule] = useState<Module | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchModule = async () => {
            if (id) {
                const data = await getModuleById(id);
                if (data) {
                    setModule(data);
                }
            }
        };

        fetchModule();
    }, [id, getModuleById]);

    if (!module) {
        return <div>Loading...</div>;
    }

    return (
        <div className='module-temp-cont'>
            <NavBar under="2" />
            <img src={peng} id='module-peng' alt="Module Penguin" />
            <div className='module-temp-head'>
                <div className='module-temp-info'>
                    <h1>{module.title}</h1>
                    <div></div>
                </div>
                <h2>{module.description}</h2>
            </div>

            <div className='module-temp-badge'>
                <div className='temp-badge-info'>
                    <div className='flex justify-between'>
                        <h2 className='text-lg font-medium'>{`0% Mastery`}</h2>
                        <h2 className='text-lg font-medium'>{`ET: ${module.estimatedTime} Min`}</h2>
                    </div>
                </div>
                <div className='temp-badge-show'>
                    <img src={badge} alt="Badge" />
                    <h3>Fully complete this module to earn this badge!</h3>
                </div>
                <div className='module-temp-continue'>
                    <Link to={`/modules/${module._id}/start`} className='text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded'>
                        Start
                    </Link>
                </div>
            </div>
        </div>
    );
}
