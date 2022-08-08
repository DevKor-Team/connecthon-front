import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiSearch } from 'react-icons/fi';
import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { FiHeart } from 'react-icons/fi';
import ProjectModal from '../../components/ProjectModal';
import { Project } from '../../interfaces/project';
import { useRecoilState } from 'recoil';
import { projectRecoilState } from '../../recoil/project';
import { teamMember } from '../../interfaces/team';
import { MemberState, teamMemberRecoilState } from '../../recoil/teamMember';

type ProjectType = { team: string; prjname: string; img: string };

// const tempProjects = [
//     { team: 'Korea ABC', prjname: 'KU PROJECT - Hackathon', img: 'https://picsum.photos/200' },
//     {
//         team: 'Yonsei ABC',
//         prjname: '어딜 연새가!',
//         img: 'https://picsum.photos/200',
//     },
//     {
//         team: '호진이와 아이들',
//         prjname: '어우 세상에',
//         img: 'https://picsum.photos/200',
//     },
//     {
//         team: '승우와 아이들',
//         prjname: '우리도 TS 꽤나 좋아할지도..?',
//         img: 'https://picsum.photos/200',
//     },
// ];

const contents: Project[] = [
    {
        id: 1,
        title: 'KU PROJECT - Hackathon',
        teamName: 'Korea ABC',
        description: '우리 걍 누가봐도 1등임. 암튼 그럼',
        article: '흐흐',
        thumbnail: 'https://picsum.photos/200',
        stack: ['파이썬', '제플린'],
    },
    {
        id: 2,
        title: '어우 세상에',
        teamName: '호진이와 아이들',
        description: '누가 JS써.',
        article: 'ㅎㅎ',
        thumbnail: 'https://picsum.photos/200',
        stack: ['타입스크립트', '피그마'],
    },
    {
        id: 3,
        title: 'TS 꽤나 좋을지도..?',
        teamName: '승우와 함께하는 프론트',
        description: 'TypeScript 조아요....',
        article: '',
        thumbnail: 'https://picsum.photos/200',
        stack: ['타입스크립트', '피그마'],
    },
    {
        id: 4,
        title: '쓸데없는 프로젝트 해볼까',
        teamName: '뎁코',
        description: '우리 걍 누가봐도 1등임. 암튼 그럼',
        article: '흐흐',
        stack: ['파이썬', '제플린'],
    },
];

const team: MemberState = {
    members: [
        {
            teamName: '승우와 함께하는 프론트',
            userName: '김현아',
            image: '/designers/hyuna.png',
            position: 'planner',
        },
        {
            teamName: '승우와 함께하는 프론트',
            userName: '유지오',
            image: '/designers/jio.png',
            position: 'designer',
        },
        {
            teamName: '승우와 함께하는 프론트',
            userName: '장태웅',
            image: '/designers/taewung.png',
            position: 'designer',
        },
        {
            teamName: '승우와 함께하는 프론트',
            userName: '김지윤',
            image: '/designers/jiyoon.png',
            position: 'developer',
        },
        {
            teamName: '승우와 함께하는 프론트',
            userName: '정승연',
            image: '/designers/seungyeon.png',
            position: 'developer',
        },
    ],
};

function ProjectList() {
    const [input, setInput] = useState('');
    const [modal, setModal] = useState<boolean>(false);
    const modalEl = useRef();
    const outSection = useRef();
    const [enterPressed, setEnterPressed] = useState(false);
    const [searchResult, setSearchResult] = useState<ProjectType[]>([]);
    const [project, setProject] = useRecoilState(projectRecoilState);
    const [teamMember, setTeamMember] = useRecoilState(teamMemberRecoilState);

    // useEffect(() => {
    //     window.addEventListener('click', handleClickOutside);
    //     return () => {
    //         window.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

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
            setSearchResult(contents.filter(prj => prj.teamName.includes(keyword) || prj.title.includes(keyword)));
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
            <div className="relative">
                {modal ? (
                    <div
                        ref={outSection}
                        onClick={e => {
                            if (outSection.current === e.target) {
                                setModal(false);
                            }
                        }}
                    >
                        <ProjectModal />
                    </div>
                ) : null}
            </div>
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
                {contents.map(project => {
                    return (
                        <div
                            className="relative w-full sm:w-[48%] h-48 md:h-64 rounded-xl bg-yellow-300 mb-6 md:mb-10 cursor-pointer"
                            onClick={() => {
                                setModal(true);
                                setProject(project);
                                setTeamMember(team);
                            }}
                        >
                            <div className="transition-opacity duration-300 opacity-100 lg:opacity-0 lg:hover:opacity-100 absolute inset-0 flex flex-col justify-end p-5 lg:p-8 rounded-xl bg-gradient-to-t from-black via-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0)]">
                                <h1 className="text-white text-lg lg:text-2xl font-semibold">{project.title}</h1>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-white text-sm lg:text-base">{project.teamName}</h2>
                                    <div className="flex space-x-2 items-center">
                                        <FiHeart stroke="white" size={20} />
                                        <p className="text-white text-base lg:text-[1.25rem]">117</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* {users.map(user => {
                    <PersonCard position={user.profile.position} imgurl={user.profile.img} firstname={user.name.first} lastname={user.name.last} team={user.team} key={user.id} />
                })} */}
            </div>

            <Footer />
        </>
    );
}

export default ProjectList;
