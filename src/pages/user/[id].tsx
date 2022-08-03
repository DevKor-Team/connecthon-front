import { CustomNextPage } from '../../types/types';
import Layout from '../../layouts/Layout';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsChatLeft, BsFillChatLeftFill } from 'react-icons/bs';
import { useState } from 'react';
import { User } from '../../interfaces/user';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { Project } from '../../interfaces/project';
import { useRouter } from 'next/router';

const MyPage: CustomNextPage = () => {
    const router = useRouter();
    const UserProfile: User = {
        id: 1,
        name: '안수진',
        image: '/soojin.png',
        position: 'developer',
        teamName: 'Tiger',
        introduction: '내가 생각한 프로젝트를 현실로',
        university: '고려대학교',
        major: '국제학부',
        career: [
            {
                startYear: 2022,
                startMonth: 'Aug',
                onProgress: false,
                endYear: 2022,
                endMonth: 'Aug',
                content: '2022 KU Summer Hackathon Finalist',
            },
            {
                startYear: 2021,
                startMonth: 'Sep',
                onProgress: true,
                content: 'Corca ML Engineer',
            },
        ],
        email: 'aiccuracy@gmail.com',
        instagram: '@10issoojin_',
        github: 'aiccuracy',
    };

    const Project: Project = {
        id: 1,
        teamName: 'Tiger',
        teamMember: ['이승우', '안수진', '정호진', '노정훈'],
        projectTitle: '해커톤 웹 개발기',
        projectDescription: '뎁코의 노예들 입니다.',
        projectImage: '/project-ex.svg',
    };

    const [onChat, setOnChat] = useState<boolean>(false);
    const [onMail, setOnMail] = useState<boolean>(false);
    const [onInstagram, setOnInstagram] = useState<boolean>(false);
    const [onGithub, setOnGithub] = useState<boolean>(false);
    const userId = Number(router.query.id);
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
                            <h4 className={`text-${UserProfile.position} my-2`}>{UserProfile.position?.toUpperCase()}</h4>
                            <h3 className="font-bold text-[1.75rem] my-1">{UserProfile.name}</h3>
                            <p className="mt-1 mb-5">{`TEAM ${UserProfile.teamName}`}</p>
                        </div>

                        <div className="flex flex-col mx-5 pt-1 pb-10 w-[90%] border-t-2">
                            <div className="my-4">
                                <h4 className="font-semibold">한 줄 소개</h4>
                                <p>{UserProfile.introduction}</p>
                            </div>
                            <div className="my-4">
                                <h4 className="font-semibold">학력</h4>
                                <p>{`${UserProfile.university} ${UserProfile.major}`}</p>
                            </div>
                            <div className="my-4">
                                <h4 className="font-semibold mb-1">경력</h4>
                                <div>{UserProfile.career ? <p>{UserProfile.career[0].content}</p> : null}</div>
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
                            {onChat ? (
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
                            )}
                        </div>
                        <div className="flex flex-col bg-ourWhite rounded-lg w-[100%] h-[80vh] p-8 ">
                            <div className="grow">
                                <h4 className="text-lg tracking-wider font-semibold my-1">{`TEAM ${Project.teamName}`}</h4>
                                <h2 className="text-4xl tracking-wide font-bold my-2">{Project.projectTitle}</h2>
                                <h3 className="text-lg tracking-normal">{Project.projectDescription}</h3>
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
