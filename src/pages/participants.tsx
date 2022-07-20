import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch } from 'react-icons/fi';
import React, { ReactText, useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import axios from 'axios';

const tempUsers: UserType[] = [
    {
        id: '62c17f43fa7b4dd475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '정',
            last: '호진',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'developer',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '62c17f43fa7b4dd4753sdf8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '이',
            last: '승우',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'designer',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '62c17f43faasddd475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '안',
            last: '수진',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'planner',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '62c17f43asdfedd475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '노',
            last: '정훈',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'developer',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '62c17f43dd7b4dd475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '장',
            last: '태웅',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'designer',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '62c17f43fa7b4ww475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '백',
            last: '승윤',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'planner',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
    {
        id: '11c17f43fa7b4dd475343b8b',
        email: 'froggagul@gmail.com',
        name: {
            first: '강',
            last: '슬기',
        },
        team: 'TEAM ABC',
        profile: {
            link: {
                github: 'https://github.com/froggagul',
                blog: 'https://www.hojins.life',
            },
            position: 'developer',
            img: 'https://picsum.photos/200',
            career: 'hello im hojin',
            _id: '62c182186667b242ad1f878c',
        },
        provider: 'GOOGLE',
        isAdmin: false,
    },
];

interface UserType {
    id: string;
    email: string;
    name: {
        first: string;
        last: string;
    };
    team: string;
    profile: {
        link: {
            github: string;
            blog: string;
        };
        position: 'developer' | 'designer' | 'planner';
        img: string;
        career: string;
        _id: string;
    };
    provider: string;
    isAdmin: boolean;
}

function Participants() {
    let initialLength: number, initialLeft: number;
    const [users, setUsers] = useState<UserType[]>([]);
    const [developers, setDevelopers] = useState<UserType[]>([]);
    const [planners, setPlanners] = useState<UserType[]>([]);
    const [designers, setDesigners] = useState<UserType[]>([]);
    const [currentCategory, setCurrentCategory] = useState('users');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [enterPressed, setEnterPressed] = useState(false);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState('');

    useEffect(() => {
        tempUsers.forEach(user => {
            if (user.profile.position == 'developer') {
                setDevelopers(prev => prev.concat(user));
                console.log(`${user.name.last}를 developers에 추가`);
            } else if (user.profile.position == 'designer') {
                setDesigners(prev => prev.concat(user));
                console.log(`${user.name.last}를 designers에 추가`);
            } else {
                setPlanners(prev => prev.concat(user));
                console.log(`${user.name.last}를 planners에 추가`);
            }
        });
    }, []);

    // 유저 정보 가져오기
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             //요청이 시작될 때는 error와 users를 초기화
    //             setUsers([]);
    //             setError(null);
    //             //로딩상태는 true로 변경시킨다.
    //             setLoading(true);

    //             await axios.get('/users').then(response => setUsers(response.data));
    //             users.forEach(user => {
    //                 if (user.profile.position == 'developer') {
    //                     setDevelopers(developers.concat(user));
    //                 } else if (user.profile.position == 'designer') {
    //                     setDesigners(designers.concat(user));
    //                 } else {
    //                     setPlanners(planners.concat(user));
    //                 }
    //             });
    //         } catch (e: any) {
    //             setError(e);
    //             console.log(error);
    //         }

    //         setLoading(false);
    //     };

    //     fetchUsers();
    // }, []);

    //슬라이딩 메뉴 애니메이션을 위해서 초기 width, left값 세팅
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

    function onSelectCategory(e) {
        let newLength, newLeft;

        //다시 카테고리 선택을 하면 이전의 검색결과는 사라져야 함.
        setEnterPressed(false);

        const target = e.target;
        const removeTarget = document.querySelector('.text-black');
        const underline = document.querySelector('#underline') as HTMLElement;

        //검정색이었던 카테고리를 다시 옅은회색으로 바꾸고, 새롭게 선택된 카테고리에 검정색을 입힌다.
        removeTarget?.classList.replace('text-black', 'text-[rgba(0,0,0,0.1)]');
        target.classList.replace('text-[rgba(0,0,0,0.1)]', 'text-black');

        //새롭게 선택된 카테고리의 left값, width값에 맞춰서 underline이 이동하도록 한다.
        newLength = target.offsetWidth;
        newLeft = target.getBoundingClientRect().left;

        underline.style.width = `${newLength}px`;
        underline.style.left = `${newLeft}px`;

        //선택한 카테고리의 이름으로 id를 바꿔서 해당 카테고리의 카드들만 나타나게 한다.
        setCurrentCategory(target.id);
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        setInput(currentValue);
    }

    function searchUser(e: React.KeyboardEvent<HTMLInputElement>) {
        const keyword = input;
        const firstname = input.slice(0, 1);
        const lastname = input.slice(1);
        const searchinput = document.querySelector('#searchinput') as HTMLInputElement;

        if (e.key == 'Enter') {
            setEnterPressed(true);
            setSearchResult(tempUsers.filter(user => user.team == keyword || (user.name.first == firstname && user.name.last == lastname)));
            setInput('');
            searchinput.blur();
        } else return;
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
                        id="planners"
                    >
                        Planner
                    </li>
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-300 text-[rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="developers"
                    >
                        Developer
                    </li>
                    <li
                        className="text-center font-bold flex justify-center items-center px-4 pb-1 transition-all ease-in duration-300 text-[rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={e => onSelectCategory(e)}
                        id="designers"
                    >
                        Designer
                    </li>
                </ul>
                <div className={`absolute bottom-0 h-[2px] bg-black transition-all ease-in duration-300`} id="underline" />
            </section>

            {/* 참가자 리스트 영역 */}
            <div className="w-full px-4 md:px-16 lg:px-20 xl:px-[13.375rem] flex flex-wrap gap-[4%] md:gap-[3.5%] 2xl:gap-[1.333333333%]">
                {(enterPressed ? searchResult : currentCategory == 'users' ? tempUsers : currentCategory == 'developers' ? developers : currentCategory == 'designers' ? designers : planners).map(
                    user => (
                        <PersonCard position={user.profile.position} firstname={user.name.first} lastname={user.name.last} team={user.team} key={user.id} />
                    ),
                )}

                {/* {users.map(user => {
                    <PersonCard position={user.profile.position} imgurl={user.profile.img} firstname={user.name.first} lastname={user.name.last} team={user.team} key={user.id} />
                })} */}
            </div>
            <Footer />
        </>
    );
}

export default Participants;
