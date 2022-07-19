import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch } from 'react-icons/fi';
import { useEffect } from 'react';

function Participants() {
    let initialLength: number, initialLeft: number;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const all = document.querySelector('#all') as HTMLElement;
            const underline = document.querySelector('#underline') as HTMLDivElement;
            if (all == null) return;
            if (underline == null) return;

            initialLength = all?.offsetWidth;
            initialLeft = all?.getBoundingClientRect().left;

            underline.style.width = `${initialLength}px`;
            underline.style.left = `${initialLeft}px`;
        }
    });

    function onSelectCategory(e) {
        let newLength, newLeft;

        const target = e.target;
        const removeTarget = document.querySelector('.text-black');
        const underline = document.querySelector('#underline') as HTMLElement;

        removeTarget?.classList.replace('text-black', 'text-[rgba(0,0,0,0.1)]');

        target.classList.replace('text-[rgba(0,0,0,0.1)]', 'text-black');

        newLength = target.offsetWidth;
        newLeft = target.getBoundingClientRect().left;

        underline.style.width = `${newLength}px`;
        underline.style.left = `${newLeft}px`;

        console.log(newLength);
        console.log(newLeft);
    }

    return (
        <>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol-2d.svg" />
            </Head>
            <Header />
            {/* 페이지 메인 / 검색창까지 영역 */}
            <section className="relative w-full h-72 bg-center bg-cover bg-no-repeat bg-[url('/participants_temp.svg')] mt-16 md:mt-20 flex flex-col justify-center items-center">
                <h1 className="text-white text-3xl lg:text-4xl font-bold mb-4">2022 해커톤 선원들</h1>

                {/* Mobile Subtitle */}
                <div className="flex flex-col justify-center items-center text-white lg:hidden">
                    <p className="text-white text-sm">기획자, 개발자, 디자이너로 이루어진</p>
                    <p className="text-white text-sm">2022 KU HACKATHON 참가자 리스트입니다.</p>
                    <p className="text-white text-sm">궁금한 참여자가 있다면 프로필을 눌러 자세한 정보를</p>
                    <p className="text-white text-sm">확인 후 컨택해 보세요.</p>
                </div>

                {/* PC Subtitle */}
                <div className="hidden lg:flex flex-col justify-center items-center text-white">
                    <p className="text-white text-base">기획자, 개발자, 디자이너로 이루어진 2022 KU HACKATHON 참가자 리스트입니다.</p>
                    <p className="text-white text-base">궁금한 참여자가 있다면 프로필을 눌러 자세한 정보를 확인 후 컨택해 보세요.</p>
                </div>

                {/* 검색창 */}
                <div className="absolute w-full -bottom-8 px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex">
                    <FiSearch size={24} className="absolute left-10 md:left-[5.5rem] lg:left-[6.5rem] xl:left-60 top-4" />
                    <input className="w-full h-14 rounded-xl pl-16 md:pl-18 focus:outline-none shadow-[0px_1px_12px_1px_rgba(0,0,0,0.1)]" placeholder="이름, 팀명을 입력하세요." />
                </div>
            </section>

            {/* 참가자 리스트 영역 */}
            <section className="relative w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] mt-14">
                <ul className="relative w-full flex items-center justify-evenly md:justify-center md:space-x-6 xl:space-x-8 2xl:space-x-10">
                    <li className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all text-black cursor-pointer" onClick={e => onSelectCategory(e)} id="all">
                        All
                    </li>
                    <li className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all text-[rgba(0,0,0,0.1)] cursor-pointer" onClick={e => onSelectCategory(e)}>
                        Planner
                    </li>
                    <li className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all text-[rgba(0,0,0,0.1)] cursor-pointer" onClick={e => onSelectCategory(e)}>
                        Developer
                    </li>
                    <li className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all text-[rgba(0,0,0,0.1)] cursor-pointer" onClick={e => onSelectCategory(e)}>
                        Designer
                    </li>
                </ul>
                <div className={`absolute bottom-0 h-[2px] bg-black transition-all`} id="underline" />
            </section>
            <Footer />
        </>
    );
}

export default Participants;
