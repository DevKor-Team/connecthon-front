import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import { axiosInstance } from '../hooks/queries';
import Participant from '../interfaces/participant';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';

function Participants() {
    let initialLength: number, initialLeft: number;
    const [users, setUsers] = useState<Participant[]>([]);
    const [queryUsers, setQueryUsers] = useState<Participant[]>([]);
    // const [developers, setDevelopers] = useState<Participant[]>([]);
    // const [planners, setPlanners] = useState<Participant[]>([]);
    // const [designers, setDesigners] = useState<Participant[]>([]);

    const [currentCategory, setCurrentCategory] = useState('users');
    // const [searchResult, setSearchResult] = useState<Participant[]>([]);
    // const [_, setEnterPressed] = useState(false);

    const [input, setInput] = useState('');

    // const router = useRouter();

    const [_, setLoginUserState] = useRecoilState(loginRecoilState);

    //로그인 풀리지 않게
    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type === 'user') {
                        setLoginUserState({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type === 'company') {
                        setLoginUserState({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                // alert('로그인이 필요한 서비스입니다.');
                // router.push('/login');
            }
        };

        getSessionUser();
    }, []);

    // 유저 정보 가져오기
    useEffect(() => {
        const fetchUsers = () => {
            try {
                axiosInstance.get('/users').then(response => setUsers(response.data.data));
            } catch (err) {
                console.dir(err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length !== 0) {
            setQueryUsers(users.filter(user => currentCategory === 'users' || user.profile?.position === currentCategory));
            // setDesigners(users.filter(user => user.profile?.position === 'designer'));
            // setPlanners(users.filter(user => user.profile?.position === 'planner'));

            // users.forEach(user => {
            //     if (user.profile?.position == 'developer') {
            //         setDevelopers(developers.concat(user));
            //     } else if (user.profile?.position == 'designer') {
            //         setDesigners(designers.concat(user));
            //     } else {
            //         setPlanners(planners.concat(user));
            //     }
            // });
        }
    }, [users, currentCategory]);

    /* ------- 슬라이딩 메뉴 애니메이션을 위해서 초기 width, left값 세팅 ------- */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const all = document.querySelector('#users') as HTMLElement;
            const underline = document.querySelector('#underline') as HTMLDivElement;
            if (all == null) return;
            if (underline == null) return;

            initialLength = all?.offsetWidth;
            initialLeft = all?.getBoundingClientRect().left;

            underline.style.width = `${initialLength}px`;
            underline.style.left = `${initialLeft}px`;
        }
    }, []);
    /* --------------------------------------------------------------- */

    const delay = 300;
    let resizeEvent: ReturnType<typeof setTimeout>;

    if (typeof window !== 'undefined') {
        window?.addEventListener('resize', function () {
            this.clearTimeout(Number(resizeEvent));
            resizeEvent = setTimeout(function () {
                const cur = document.querySelector(`#${currentCategory}`) as HTMLElement;
                const underline = document.querySelector('#underline') as HTMLDivElement;
                if (cur == null) return;
                if (underline == null) return;

                initialLength = cur?.offsetWidth;
                initialLeft = cur?.getBoundingClientRect().left;

                underline.style.width = `${initialLength}px`;
                underline.style.left = `${initialLeft}px`;
            }, delay);
        });
    }

    /* ------- All, Developers, Designers, Planners 포지션 카테고리 선택 시 관련 애니메이션 구현 ------- */
    function onSelectCategory(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        //다시 카테고리 선택을 하면 이전의 검색결과는 사라져야 함.
        // setEnterPressed(false);

        const target = e.target as HTMLLIElement;
        const removeTarget = document.querySelector('.text-black');
        const underline = document.querySelector('#underline') as HTMLElement;

        const cardWrapper = document.getElementById('card-wrapper') as HTMLDivElement;
        cardWrapper.classList.replace('opacity-100', 'opacity-80');

        //검정색이었던 카테고리를 다시 옅은회색으로 바꾸고, 새롭게 선택된 카테고리에 검정색을 입힌다.
        removeTarget?.classList.replace('text-black', 'text-[rgba(0,0,0,0.1)]');
        target.classList.replace('text-[rgba(0,0,0,0.1)]', 'text-black');

        //새롭게 선택된 카테고리의 left값, width값에 맞춰서 underline이 이동하도록 한다.
        const newLength = target.offsetWidth;
        const newLeft = target.getBoundingClientRect().left;

        underline.style.width = `${newLength}px`;
        underline.style.left = `${newLeft}px`;

        //선택한 카테고리의 이름으로 id를 바꿔서 해당 카테고리의 카드들만 나타나게 한다.'
        setTimeout(() => {
            setCurrentCategory(target.id);
        }, 150);

        setTimeout(() => {
            cardWrapper.classList.replace('opacity-80', 'opacity-100');
        }, 200);
    }
    /* -------------------------------------------------------------------------------- */

    /* ------------ 검색창에 input 입력시 검색어 업데이트 함수 -------------- */
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        setInput(currentValue);
    }
    /* ------------------------------------------------------------- */

    /* ------- 사용자가 Enter 눌렀을 시 입력한 검색어에 대해 검색해주는 함수 ------- */
    function searchUser(e: React.KeyboardEvent<HTMLInputElement>) {
        const keyword = input;
        const firstname = input.slice(0, 1);
        const lastname = input.slice(1);
        const searchinput = document.querySelector('#searchinput') as HTMLInputElement;

        if (e.key == 'Enter') {
            // setEnterPressed(true);
            setQueryUsers(
                queryUsers.filter(user => user.team?.name?.includes(keyword) || user.name?.last?.includes(keyword) || (user.name?.first == firstname && user.name?.last?.includes(lastname))),
            );
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
                    <input
                        className="w-full h-14 rounded-xl pl-16 md:pl-18 focus:outline-none shadow-[0px_1px_12px_1px_rgba(0,0,0,0.1)]"
                        placeholder="이름, 팀명을 입력하세요."
                        value={input}
                        onChange={e => onInputChange(e)}
                        onKeyDown={e => searchUser(e)}
                        id="searchinput"
                    />
                </div>
            </section>

            {/* 참가자 카테고리 선택 영역 */}
            <section className="relative w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] mt-14 mb-8 lg:mb-24">
                <ul className="relative w-full flex items-center justify-evenly md:justify-center md:space-x-6 xl:space-x-8 2xl:space-x-10">
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-600 text-black cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="users"
                    >
                        All
                    </li>
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-300 text-[rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="planner"
                    >
                        Planner
                    </li>
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-300 text-[rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="developer"
                    >
                        Developer
                    </li>
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-300 text-[rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="designer"
                    >
                        Designer
                    </li>
                </ul>
                <div className={`absolute bottom-0 h-[2px] bg-black transition-all ease-in duration-300`} id="underline" />
            </section>

            {/* 참가자 리스트 영역 */}
            <div className="transition-all opacity-100 duration-200 w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex flex-wrap gap-[4%] md:gap-[3.5%] 2xl:gap-[1.333333333%]" id="card-wrapper">
                {queryUsers
                    .filter(user => user.team?.name !== 'Staff')
                    .map(user => (
                        <PersonCard
                            id={user.id}
                            position={user.profile?.position}
                            imgurl={user.profile?.img}
                            firstname={user.name.first}
                            lastname={user.name.last}
                            team={user.team?.name}
                            key={user.id}
                        />
                    ))}
            </div>
        </>
    );
}

export default Participants;
