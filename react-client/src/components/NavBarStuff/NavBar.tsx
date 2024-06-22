import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import tweet from './images/tweet.svg';

const NavBar = ({ under }: any) => {
    const [openMenu, setOpenMenu] = useState(false);
    const { currentUser, logout } = useAuth();

    return (
        <div className='bg-white text-[#040033] text-xl border-b border-[rgba(140,147,153,.2)] px-5 py-1.5 flex justify-between items-center'>
            <h1 className='font-bold text-2xl'>SB</h1>
            <div className='hidden md:flex gap-x-10 font-medium'>
                <h1 className={`hover:underline underline-offset-2 cursor-pointer ${under==0 ? 'underline underline-offset-2 decoration-[#040033]' : ''}`}><Link to={"/current-home"}>Home</Link></h1>
                <h1 className={`hover:underline underline-offset-2 cursor-pointer ${under==1 ? 'underline underline-offset-2 decoration-[#040033]' : ''}`}><Link to={"/current-modules"}>Modules</Link></h1>
                <h1 className='hover:underline underline-offset-2 cursor-pointer'>Dashboard</h1>
                <h1 className='hover:underline underline-offset-2 cursor-pointer'>Mock Exams</h1>
                {currentUser ? (
                    <>
                        <img src={tweet} className="h-7 cursor-pointer" onClick={() => setOpenMenu(!openMenu)}/>
                        <div className={`${openMenu ? 'block' : 'hidden'} flex flex-col gap-1 z-10 border-l border-b border-t rounded-bl-md absolute right-0 top-[44px] bg-gray-100 p-2`}>
                            <h1 className='cursor-pointer hover:underline text-lg font-normal'><Link to={"/profile"}>Profile</Link></h1>
                            <button onClick={logout} className="text-lg font-semibold rounded-[12px] px-2 bg-[#3483F9] text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] hover:bg-[#0e6bf8] transition-colors">Logout</button>
                        </div>  
                    </>
                ) : (
                    <Link to={"/current-login"}><button className="text-xl font-semibold rounded-[12px] px-3 bg-[#3483F9] text-white drop-shadow-[0_2px_0px_rgba(9,85,199,1)] hover:bg-[#0e6bf8] transition-colors">Login</button></Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
