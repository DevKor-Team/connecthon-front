import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';

function SideMenu({ setMenuOpened }: { setMenuOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="fixed z-50 inset-0 md:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm">
                <div className="fixed w-[315px] h-full bg-white font-bold px-4 pt-6 shadow-lg">
                    <MdOutlineClose className="absolute top-9 right-4" size={20} onClick={() => setMenuOpened(false)} />
                    <div className="border-b border-slate-200 py-2 mb-7">MENU</div>
                    <ul className="space-y-8">
                        <li>ABOUT</li>
                        <li>PROJECT</li>
                        <li>PARTICIPANTS</li>
                        <li>CHAT</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Header() {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <header>
            {menuOpened && <SideMenu setMenuOpened={setMenuOpened} />}
            <div className="mt-5 ml-1 flex items-center space-x-6 md:space-x-16">
                <FiMenu
                    size={24}
                    className="text-lg font-light md:hidden cursor-pointer"
                    onClick={() => {
                        console.log('Show menu bar');
                        setMenuOpened(true);
                    }}
                />
                <button className="font-bold font-impact text-xl md:text-2xl md:mr-6">KU HACKATHON</button>
                <ul className="hidden space-x-4 md:flex md:space-x-6 lg:space-x-8 font-semibold">
                    <li>ABOUT</li>
                    <li>PROJECT</li>
                    <li>PARTICIPANTS</li>
                    <li>CHAT</li>
                </ul>
            </div>

            <div className="flex items-center font-light mt-4 mr-4 cursor-pointer md:mr-12">
                <BsPerson size={22} />
            </div>
        </header>
    );
}

export default Header;
