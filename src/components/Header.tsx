import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';

function Header() {
    return (
        <header>
            <div className="mt-5 ml-1 flex items-center space-x-6 md:space-x-8">
                <FiMoreVertical
                    className="text-lg font-light md:hidden cursor-pointer"
                    onClick={() => {
                        console.log('Show menu bar');
                    }}
                />
                <button className="font-bold font-impact text-xl md:text-2xl ">KU HACKATHON</button>
                <ul className="hidden space-x-4 md:flex md:space-x-6 lg:space-x-8">
                    <li>ABOUT</li>
                    <li>PROJECT</li>
                    <li>PARTICIPANTS</li>
                    <li>CHAT</li>
                </ul>
            </div>

            <div className="flex items-center text-lg font-light mt-4 mr-4 cursor-pointer">
                <BsPerson />
            </div>
        </header>
    );
}

export default Header;
