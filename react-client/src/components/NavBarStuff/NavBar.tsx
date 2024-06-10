import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ under }: any) => {

    return (
        <div className='bg-white text-[#040033] text-xl border-b border-[rgba(140,147,153,.2)] px-5 py-1.5 flex justify-between items-center'>
            <h1 className='font-bold text-2xl'>SB</h1>
            <div className='hidden md:flex gap-x-10 font-medium'>
                <h1 className={`hover:underline underline-offset-2 cursor-pointer ${under==0 ? 'underline underline-offset-2 decoration-[#040033]' : ''}`}><Link to={"/current-home"}>Home</Link></h1>
                <h1 className={`hover:underline underline-offset-2 cursor-pointer ${under==1 ? 'underline underline-offset-2 decoration-[#040033]' : ''}`}><Link to={"/current-modules"}>Modules</Link></h1>
                <h1 className='hover:underline underline-offset-2 cursor-pointer'>Dashboard</h1>
                <h1 className='hover:underline underline-offset-2 cursor-pointer'>Mock Exams</h1>
                <button className="text-xl font-semibold rounded-[12px] c px-3 bg-[#3483F9] text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] hover:bg-[#0e6bf8] transition-colors">Login</button>
            </div>
        </div>
    );
};

export default NavBar;
