import { CustomNextPage } from '../../types/types';
import { FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import { FiMail, FiInstagram, FiGithub, FiHome } from 'react-icons/fi';
import Link from 'next/link';
import { Project } from '../../interfaces/project';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';

const MyPage: CustomNextPage = () => {
    const router = useRouter();
    // const UserProfile: User = {
    //     type: 'user',
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
    //     provider: 'kakao',
    //     isAdmin: true,
    // };

    const Project: Project = {
        id: 1,
        team: 'Tiger',
        title: '해커톤 웹 개발기',
        content: '뎁코의 노예들 입니다.',
        thumbnail: '/project-ex.svg',
    };

    const [onMail, setOnMail] = useState<boolean>(false);
    const [onInstagram, setOnInstagram] = useState<boolean>(false);
    const [onGithub, setOnGithub] = useState<boolean>(false);

    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    console.log(`userState in main user page : ${loginUserState.user?.profile?.img}`);
    console.log(`경력은 어떻게 가나 : ${loginUserState.user?.profile?.career}`);

    return (
        <main className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">
            <div className="mt-[5rem] flex w-[100%] items-center h-[calc(100vh-4rem)]">
                <div className="grow">
                    <div className="flex mb-10">
                        <div className="w-[30%] rounded-[1.25rem] h-[85vh] bg-ourWhite drop-shadow-lg p-[1rem] max-w-[25rem] z-10 min-w-[15rem]">
                            <div className="flex flex-col items-center">
                                {loginUserState.user?.profile?.img ? (
                                    <img src={loginUserState.user?.profile?.img} alt="my photo" className="rounded-full w-[50%] my-2" />
                                ) : (
                                    <img src="/profile-default.jpg" alt="default-profile" className="rounded-full w-[50%] my-2" />
                                )}
                                <div className="flex items-center my-2">
                                    <h4 className={`text-${loginUserState.user?.profile?.position} mx-1`}>{loginUserState.user?.profile?.position}</h4>
                                    <FiEdit
                                        className="pb-[0.1rem] cursor-pointer"
                                        onClick={() => {
                                            router.push('/mypage/edit');
                                        }}
                                    />
                                </div>
                                <h3 className="font-bold text-[1.75rem] my-1">{`${loginUserState.user?.name}`}</h3>
                                <p className="mt-1 mb-5">{`TEAM ${loginUserState.user?.team}`}</p>
                            </div>

                            <div className="flex flex-col mx-5 pt-1 pb-10 w-[90%] border-t-2">
                                <div className="my-4">
                                    <h4 className="font-semibold">한 줄 소개</h4>
                                    <p>{loginUserState.user?.profile?.introduction}</p>
                                </div>
                                <div className="my-4">
                                    <h4 className="font-semibold">학력</h4>
                                    <p>{`${loginUserState.user?.profile?.university} ${loginUserState.user?.profile?.major}`}</p>
                                </div>
                                <div className="my-4">
                                    <h4 className="font-semibold mb-1">경력</h4>

                                    <div>{loginUserState.user?.profile?.career ? loginUserState.user?.profile?.career.map(crr => <p>{crr}</p>) : null}</div>
                                </div>

                                <h4 className="font-semibold my-2">SNS</h4>
                                <div className="flex items-center space-x-4">
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
                                    <div className="mx-2">
                                        <Link href={loginUserState.user?.profile?.link?.instagram ? `https://www.instagram.com/${loginUserState.user?.profile?.link.instagram}` : ''}>
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

                                        {onInstagram ? <img src="/instagram-text.svg" alt="mail-text" className="absolute left-[2.8rem] drop-shadow-lg" /> : null}
                                    </div>
                                    <div>
                                        <Link href={loginUserState.user?.profile?.link?.github ? `https://github.com/${loginUserState.user?.profile?.link.github}` : ''}>
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

                                        {onGithub ? <img src="/github-text.svg" alt="github-text" className="absolute left-[6.2rem] drop-shadow-lg" /> : null}
                                    </div>
                                    <div>
                                        <Link href={loginUserState.user?.profile?.link?.blog ? loginUserState.user?.profile?.link.blog : ''}>
                                            <a>
                                                <FiHome className="text-2xl cursor-pointer" />
                                            </a>
                                        </Link>
                                    </div>
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
                                    <h4 className="text-lg font-semibold my-1">{`TEAM ${loginUserState.user?.team}`}</h4>
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
            </div>
        </main>
    );
};

export default MyPage;
