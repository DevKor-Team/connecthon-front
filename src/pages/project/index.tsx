import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiSearch } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';

type ProjectType = { team: string; prjname: string; img: string };

const tempProjects = [
    { team: 'Korea ABC', prjname: 'KU PROJECT - Hackathon', img: 'https://picsum.photos/200' },
    {
        team: 'Yonsei ABC',
        prjname: 'KU PROJECT- Hackathon',
        img: 'https://picsum.photos/200',
    },
];

function ProjectList() {
    const [input, setInput] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);
    const [searchResult, setSearchResult] = useState<ProjectType[]>([]);

    /* ------------ 검색창에 input 입력시 검색어 업데이트 함수 -------------- */
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        setInput(currentValue);
    }
    /* ------------------------------------------------------------- */

    /* ------ 사용자가 Enter 눌렀을 시 입력한 검색어에 대해 검색해주는 함수 ------ */
    function searchUser(e: React.KeyboardEvent<HTMLInputElement>) {
        const keyword = input;
        const searchinput = document.querySelector('#searchinput') as HTMLInputElement;

        if (e.key == 'Enter') {
            setEnterPressed(true);
            setSearchResult(tempProjects.filter(prj => prj.team.includes(keyword) || prj.prjname.includes(keyword)));
            setInput('');
            searchinput.blur();
        } else return;
    }
    /* ---------------------------------------------------------------- */

    return (
        <>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol-2d.svg" />
            </Head>
            <Header />
            {/* 페이지 메인 / 검색창까지 영역 */}
            <section className="relative w-full h-72 bg-center bg-cover bg-no-repeat bg-[url('/participants_temp.svg')] mt-16 md:mt-20 flex flex-col justify-center items-center mb-8">
                <h1 className="text-white text-3xl lg:text-[2.5rem] lg:leading-tight font-bold mb-4">2022 해커톤 프로젝트</h1>

                {/* Mobile Subtitle */}
                <div className="flex flex-col justify-center items-center text-white lg:hidden">
                    <p className="text-white text-sm tracking-tight">기획자, 개발자, 디자이너로 선원들이</p>
                    <p className="text-white text-sm tracking-tight">함께 항해한 최종 결과물들입니다.</p>
                    <p className="text-white text-sm tracking-tight">자세한 설명은 프로젝트 프로필을 클릭해 살펴보세요.</p>
                </div>

                {/* PC Subtitle */}
                <div className="hidden lg:flex flex-col justify-center items-center text-white">
                    <p className="text-white text-lg">기획자, 개발자, 디자이너로 선원들이 함께 항해한 최종 결과물들입니다.</p>
                    <p className="text-white text-lg">자세한 설명은 프로젝트 프로필을 클릭해 살펴보세요.</p>
                </div>

                {/* 검색창 */}
                <div className="absolute w-full -bottom-8 px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex">
                    <FiSearch size={24} className="absolute left-10 md:left-[5.5rem] lg:left-[6.5rem] xl:left-60 top-4" />
                    <input
                        className="w-full h-14 rounded-xl pl-16 md:pl-18 focus:outline-none shadow-[0px_1px_12px_1px_rgba(0,0,0,0.1)]"
                        placeholder="프로젝트 이름, 팀명을 입력하세요."
                        value={input}
                        onChange={e => onInputChange(e)}
                        onKeyDown={e => searchUser(e)}
                        id="searchinput"
                    />
                </div>
            </section>

            {/* 프로젝트 리스트 영역 */}
            <div className="w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex flex-wrap sm:gap-[4%] mt-20 md:mt-24" id="card-wrapper">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                {/* {users.map(user => {
                    <PersonCard position={user.profile.position} imgurl={user.profile.img} firstname={user.name.first} lastname={user.name.last} team={user.team} key={user.id} />
                })} */}
            </div>

            <Footer />
        </>
    );
}

export default ProjectList;
