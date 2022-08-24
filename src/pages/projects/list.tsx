import { axiosInstance } from '../../hooks/queries';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiSearch } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { RiTeamFill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { readJsonConfigFile } from 'typescript';

interface ProjectData {
    id: string;
    _doc: {
        _id: string;
        team: string;
        stack: string[];
        content: string;
        likes: string[];
        __v: number;
    };
}

function ProjectList() {
    const [input, setInput] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);
    const [searchResult, setSearchResult] = useState<ProjectData[]>([]);
    const [list, setList] = useState<ProjectData[]>([]);

    const [loginUserData, setLoginUserData] = useRecoilState(loginRecoilState);

    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserData({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserData({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getSessionUser();
    }, []);

    useEffect(() => {
        axiosInstance.get('/project').then(res => {
            setList(res.data.data);
        });
    }, [loginUserData]);

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
        if (keyword) {
            console.log(`keyword 있음`);
        }
        if (e.key == 'Enter' && keyword) {
            setEnterPressed(true);
            list.map(async prj => {
                const res = await axiosInstance.get(`/teams/${prj._doc.team}`);
                if (res.data.data.name.includes(keyword) == true) {
                    setSearchResult([...searchResult, prj]);
                }
            }),
                setInput('');
            searchinput.blur();
        } else {
            // 빈칸 입력 시, 전체 프로젝트 리스트 띄워줌
            setEnterPressed(true);
            setSearchResult([]);

            return;
        }
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
                        placeholder="팀명을 입력하세요."
                        value={input}
                        onChange={e => onInputChange(e)}
                        onKeyDown={e => searchUser(e)}
                        id="searchinput"
                    />
                </div>
            </section>

            {/* 프로젝트 리스트 영역 */}
            <div className="w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex flex-wrap sm:gap-[4%] mt-20 md:mt-24" id="card-wrapper">
                {(enterPressed ? searchResult : list)
                    .filter(prj => prj?._doc.team !== '62fa4a28c4dd47bee8327262')
                    .map(prj => (
                        <ProjectCard teamId={prj?._doc.team} likes={prj?._doc.likes?.length} />
                    ))}
            </div>
        </>
    );
}

export default ProjectList;
