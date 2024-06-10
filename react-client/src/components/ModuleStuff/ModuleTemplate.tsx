import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import badge from './images/temp-badge.png';
import peng from './images/module-peng.png';

import NavBar from '../NavBarStuff/NavBar';
import useModules from '../../hooks/useModules';
import { Module } from '../../@types/common';

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
        <div className='w-dvw h-dvh bg-[#E9F5FF] text-[#040033] flex flex-col'>
            <NavBar under="1" />

            <div className='flex-1 mx-20 my-5 py-10 flex gap-10 relative bg-white rounded-2xl drop-shadow-[0_4px_0px_rgba(140,147,153,.3)]'>

                <div className='w-3/5 px-10'>
                    <div className='text-3xl font-medium underline'>
                        <h1>{module.title + ": Graphing Linear Equations"}</h1>
                    </div>
                    <h2 className='mt-2 text-2xl font-normal'>{module.description + " Well what is linear equation. That I do not know either my friend. But what i do know is that graphing is a necessary skill in order to do a few problems on the exam 👍🏻 "}</h2>
                </div>

                <div className='w-2/5 px-10'>
                    <div className='border-2 border-[#040033] text-xl rounded-2xl px-5 py-5 flex flex-col gap-2 shadow-lg '>
                        <div className='flex justify-evenly'>
                            <h2 className=' font-medium'>{`0% Mastery`}</h2>
                            <h2 className=' font-medium'>{`ET: ${module.estimatedTime} Min`}</h2>
                        </div>
                        <div className='flex items-center gap-5'>
                            <img src={badge} className='h-20' alt="Badge" />
                            <h3 >Fully complete this module to earn this badge!</h3>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Link to={`/current-modules/${module._id}/start`} className='text-2xl font-semibold rounded-[12px] bg-[#3483F9] px-3 text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] hover:bg-[#0e6bf8] transition-colors'>Start</Link>
                        </div>
                    </div>
                </div>

                <img src={peng} className='absolute bottom-0  h-[40%] left-[50%]' alt="Module Penguin" />
            </div>

        </div>
    );
}
