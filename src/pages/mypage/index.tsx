import { CustomNextPage } from '../../types/types';
import Layout from '../../layouts/Layout';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import { User } from '../../interfaces/user';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { Project } from '../../interfaces/project';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userRecoilState } from '../../recoil/user';

const MyPage: CustomNextPage = () => {
    const router = useRouter();
    // const UserProfile: User = {
    //     id: 1,
    //     name: '안수진',
    //     email: 'asj0816@korea.ac.kr',
    //     teamName: 'Tiger',
    //     profile: {
    //         link: {
    //             github: 'aiccuracy',
    //             blog: 'www.hojins.life',
    //             instagram: '@10issoojin_',
    //         },
    //         position: 'developer',
    //         img: '/soojin.png',
    //         introduction: '뎁코 화이팅',
    //         university: '고려대학교',
    //         major: '국제학부',
    //         career: ['코르카 ML 엔지니어', 'DevKor 노예'],
    //     },
    // };

    const Project: Project = {
        id: 1,
        teamName: 'Tiger',
        title: '해커톤 웹 개발기',
        description: '뎁코의 노예들 입니다.',
        thumbnail: '/project-ex.svg',
    };

    const [onMail, setOnMail] = useState<boolean>(false);
    const [onInstagram, setOnInstagram] = useState<boolean>(false);
    const [onGithub, setOnGithub] = useState<boolean>(false);
    const userId = Number(router.query.id);
    const [userState, setUserState] = useRecoilState(userRecoilState);
    console.log(`userState in main user page : ${userState.user?.profile.introduction}`);
    return (
        <div className="mt-[8rem] flex w-[100%] items-center">
            <div className="grow-0 mr-4 cursor-pointer">
                <AiOutlineLeft
                    className="cursor-pointer"
                    onClick={() => {
                        if (userId - 1 > 0) {
                            router.push(`/user/${userId - 1}`);
                        } else {
                            return;
                        }
                    }}
                />
            </div>
            <div className="grow">
                <div className="flex mb-10">
                    <div className="w-[30%] rounded-[1.25rem] h-[85vh] bg-ourWhite drop-shadow-lg p-[1rem] max-w-[25rem] z-10 min-w-[15rem]">
                        <div className="flex flex-col items-center">
                            <img src="/soojin.png" alt="soojin" className="rounded-full w-[50%] my-2" />
                            <div className="flex items-center my-2">
                                <h4 className={`text-${userState.user?.profile.position} mx-1`}>{userState.user?.profile.position}</h4>
                                <FiEdit
                                    className="pb-[0.1rem] cursor-pointer"
                                    onClick={() => {
                                        router.push('/mypage/edit');
                                    }}
                                />
                            </div>
                            <h3 className="font-bold text-[1.75rem] my-1">{userState.user?.name}</h3>
                            <p className="mt-1 mb-5">{`TEAM ${userState.user?.team}`}</p>
                        </div>

                        <div className="flex flex-col mx-5 pt-1 pb-10 w-[90%] border-t-2">
                            <div className="my-4">
                                <h4 className="font-semibold">한 줄 소개</h4>
                                <p>{userState.user?.profile.introduction}</p>
                            </div>
                            <div className="my-4">
                                <h4 className="font-semibold">학력</h4>
                                <p>{`${userState.user?.profile.university} ${userState.user?.profile.major}`}</p>
                            </div>
                            <div className="my-4">
                                <h4 className="font-semibold mb-1">경력</h4>

                                <div>{userState.user?.profile.career ? null : null}</div>
                            </div>

                            <h4 className="font-semibold my-2">SNS</h4>
                            <div className="flex">
                                <div>
                                    <FiMail
                                        className="text-2xl cursor-pointer"
                                        onMouseOver={() => {
                                            setOnMail(true);
                                        }}
                                        onMouseOut={() => {
                                            setOnMail(false);
                                        }}
                                    />
                                    {onMail ? <img src="/mail-text.svg" alt="mail-text" className="absolute left-6 w-[3rem] drop-shadow-lg" /> : null}
                                </div>
                                <div className="px-3">
                                    <Link href="https://www.instagram.com/10issoojin_/">
                                        <a>
                                            <FiInstagram
                                                className="text-2xl cursor-pointer"
                                                onMouseOver={() => {
                                                    setOnInstagram(true);
                                                }}
                                                onMouseOut={() => {
                                                    setOnInstagram(false);
                                                }}
                                            />
                                        </a>
                                    </Link>

                                    {onInstagram ? <img src="/instagram-text.svg" alt="mail-text" className="absolute left-[2.65rem] drop-shadow-lg" /> : null}
                                </div>
                                <div>
                                    <Link href="https://github.com/aiccuracy">
                                        <a>
                                            <FiGithub
                                                className="text-2xl cursor-pointer"
                                                onMouseOver={() => {
                                                    setOnGithub(true);
                                                }}
                                                onMouseOut={() => {
                                                    setOnGithub(false);
                                                }}
                                            />
                                        </a>
                                    </Link>

                                    {onGithub ? <img src="/github-text.svg" alt="github-text" className="absolute left-[5.8rem] drop-shadow-lg" /> : null}
                                </div>
                            </div>
                            <div className="border-t-2 my-7">
                                <h4 className="font-extralight text-sm mt-5">Participant in the 2022 KU Hackathon.</h4>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] h-[85vh] flex flex-col justify-end min-w-[25rem] max-w-[100rem]">
                        <div className="flex flex-col items-end m-4">
                            {/* {onChat ? (
                                <BsFillChatLeftFill
                                    style={{ fill: '#2087FF' }}
                                    className="text-[1.5rem] cursor-pointer"
                                    onMouseOver={() => {
                                        setOnChat(true);
                                    }}
                                    onMouseLeave={() => {
                                        setOnChat(false);
                                    }}
                                />
                            ) : (
                                <BsChatLeft
                                    style={{ fill: '#2087FF' }}
                                    className="text-[1.5rem] cursor-pointer"
                                    onMouseOver={() => {
                                        setOnChat(true);
                                    }}
                                    onMouseLeave={() => {
                                        setOnChat(false);
                                    }}
                                />
                            )} */}
                        </div>
                        <div className="flex flex-col bg-ourWhite rounded-lg w-[100%] h-[80vh] p-8 ">
                            <div className="grow">
                                <h4 className="text-lg tracking-wider font-semibold my-1">{`TEAM ${userState.user?.team}`}</h4>
                                <h2 className="text-4xl tracking-wide font-bold my-2">{Project.title}</h2>
                                <h3 className="text-lg tracking-normal">{Project.description}</h3>
                                <div className="relative">
                                    <img src="/project-ex.svg" alt="project-example" className="absolute top-[-1rem] w-[80%] opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grow-0 ml-4 cursor-pointer">
                <AiOutlineRight
                    className="cursor-pointer"
                    onClick={() => {
                        router.push(`/user/${userId + 1}`);
                    }}
                />
            </div>
        </div>
    );
};

MyPage.Layout = Layout;
export default MyPage;
