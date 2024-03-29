import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { loginRecoilState } from '../recoil/loginuser';
import { useRecoilState } from 'recoil';
import { axiosInstance } from '../hooks/queries';

function SideMenu({ theme }: { theme?: 'dark' | 'light' }) {
    const [loginUserData, setLoginUserData] = useRecoilState(loginRecoilState);

    function closeMenu() {
        if (typeof window !== 'undefined') {
            const sidebg = document.getElementById('sidebg');
            const wrapper = document.getElementById('wrapper');
            const sidebar = document.getElementById('sidebar');
            //wrapper?.classList.remove('z-[110]');
            sidebg?.classList.replace('visible', 'invisible');
            sidebg?.classList.remove('backdrop-blur-sm');
            sidebg?.classList.replace('bg-black/20', 'bg-black/0');
            sidebar?.classList.replace('left-0', '-left-[100vw]');
        }
    }
    return (
        <div className="fixed inset-0 z-[110] w-[100vw] invisible md:hidden" id="wrapper">
            <div className="fixed invisible bg-black/0 w-[100vw] inset-0 transition-all duration-400" id="sidebg">
                <div className="fixed -left-[100vw] transition-[left] duration-500 w-80 h-full bg-white px-4 pt-2 shadow-lg" id="sidebar">
                    <MdOutlineClose className="absolute top-5 right-4" size={20} onClick={closeMenu} />
                    <div className="font-impact border-b border-slate-200 py-2 mb-7 text-xl">KU HACKATHON</div>
                    <ul className="font-bold space-y-8">
                        <li onClick={closeMenu}>
                            <Link href="/about">ABOUT</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link href="/projects/main">PROJECT</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link href="/participants">PARTICIPANTS</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link href={`${loginUserData.isLogin ? '/chatting' : '/login'}`}>CHAT</Link>
                        </li>
                        <li onClick={closeMenu}>
                            <Link href="/projects/list">WORKS</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Header({ theme }: { theme?: 'dark' | 'light' }) {
    const [loginUserData, setLoginUserData] = useRecoilState(loginRecoilState);

    function openMenu() {
        if (typeof window !== 'undefined') {
            const sidebg = document.getElementById('sidebg');
            const wrapper = document.getElementById('wrapper');
            const sidebar = document.getElementById('sidebar');
            //wrapper?.classList.add('z-[110]');
            sidebg?.classList.replace('invisible', 'visible');
            sidebg?.classList.add('backdrop-blur-sm');
            sidebg?.classList.replace('bg-black/0', 'bg-black/20');
            sidebar?.classList.replace('-left-[100vw]', 'left-0');
        }
    }

    // async function handleLogOut() {
    //     await axiosInstance.get('/auth/logout');
    //     setLoginUserData({
    //         isLogin: false,
    //         user: null,
    //     });
    // }

    return (
        <>
            <SideMenu theme={theme} />
            <header className={`z-[100] ${theme == 'dark' ? 'bg-ourBlack' : 'bg-white'} w-[100vw] box-border`}>
                <div className="flex z-70 items-center space-x-6 md:space-x-12 lg:space-x-16">
                    <FiMenu size={24} stroke={`${theme == 'dark' ? 'white' : 'black'}`} className={`text-lg font-light md:hidden cursor-pointer`} onClick={openMenu} />
                    <Link href="/home">
                        <button className={`${theme == 'dark' ? 'text-ourWhite' : ''} font-normal font-impact text-xl md:text-2xl md:mr-6`}>KU HACKATHON</button>
                    </Link>
                    <ul className={`${theme == 'dark' ? 'text-ourWhite' : ''} hidden space-x-4 md:flex md:space-x-6 lg:space-x-8 font-semibold`}>
                        <li>
                            <Link href="/about">ABOUT</Link>
                        </li>
                        <li>
                            <Link href="/projects/main">PROJECT</Link>
                        </li>
                        <li>
                            <Link href="/participants">PARTICIPANTS</Link>
                        </li>
                        <li>
                            <Link href={`${loginUserData.isLogin ? '/chatting' : '/login'}`}>CHAT</Link>
                        </li>
                        <li>
                            <Link href="/projects/list">WORKS</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center space-x-3 md:space-x-6 font-light cursor-pointer md:mr-12 lg:mr-16">
                    <Link href={`${loginUserData.isLogin ? (loginUserData.user?.type == 'user' ? '/mypage' : '/myCompany') : '/login'}`}>
                        <BsPerson size={22} fill={`${theme == 'dark' ? 'white' : 'black'}`} />
                    </Link>
                    {/* {loginUserData.isLogin ? <FiLogOut size={20} stroke={`${theme == 'dark' ? 'white' : 'black'}`} onClick={handleLogOut} /> : null} */}
                </div>
            </header>
        </>
    );
}

export default Header;
