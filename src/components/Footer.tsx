import Link from 'next/link';
import { FiPhoneCall, FiMail, FiInstagram } from 'react-icons/fi';
import { SiNotion } from 'react-icons/si';
import { loginRecoilState } from '../recoil/loginuser';
import { useRecoilState } from 'recoil';

function Footer({ theme }: { theme?: 'dark' | 'light' }) {
    const [loginUserData, setLoginUserData] = useRecoilState(loginRecoilState);

    return (
        <footer className={`w-screen px-4 md:px-16 lg:px-20 xl:px-[13.375rem] pt-10 pb-5 lg:py-8 ${theme == 'dark' ? 'bg-ourBlack' : 'bg-ourWhite'} border-t border-ourWhite`}>
            <div className="lg:pb-0 lg:h-36 lg:grid lg:grid-cols-9">
                {/* 문의 영역 */}
                <section
                    className={`relative lg:col-span-6 flex flex-col h-full after:bottom-0 after:content-[' '] after:h-0.5 after:mt-4 lg:after:mt-6 after:w-full ${
                        theme == 'dark' ? 'after:bg-ourWhite' : 'after:bg-ourGrey after:bg-opacity-25'
                    } after:rounded-full`}
                >
                    <h1 className={`font-impact ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} mb-5 xl:mb-11 text-xl`}>KU HACKATHON</h1>
                    <h3 className={`font-bold text-sm lg:text-lg mb-5 xl:mb-3 ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'}`}>문의</h3>
                    <nav className="flex space-x-6">
                        <FiPhoneCall size={22} className="cursor-pointer" stroke={`${theme == 'dark' ? '#F8F8F8' : 'black'}`} />
                        <FiMail size={22} className="cursor-pointer" stroke={`${theme == 'dark' ? '#F8F8F8' : 'black'}`} />
                        <SiNotion size={22} className="cursor-pointer" fill={`${theme == 'dark' ? '#F8F8F8' : 'black'}`} />
                        <FiInstagram size={22} className="cursor-pointer" stroke={`${theme == 'dark' ? '#F8F8F8' : 'black'}`} />
                    </nav>
                </section>

                {/* 네비게이션 링크 영역 */}
                <section className="lg:col-span-3 lg:ml-12 2xl:ml-24 h-full">
                    <div className="lg:flex lg:h-full lg:justify-between">
                        <nav className="space-y-3 lg:space-y-0 mt-4 lg:mt-0 mb-6 lg:mb-0 flex flex-col justify-between items-start">
                            <Link href="/about">
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>ABOUT</span>
                            </Link>
                            <Link href="/projects">
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>PROJECT</span>
                            </Link>
                            <Link href="/participants">
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>PARTICIPANTS</span>
                            </Link>
                            <Link href={`${loginUserData.isLogin ? '/chat' : '/login'}`}>
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>CHAT</span>
                            </Link>
                        </nav>
                        <nav
                            className={`relative space-y-3 lg:space-y-0 flex flex-col justify-between items-start after:bottom-0 after:content-[' '] after:h-0.5 after:mt-4 after:w-full ${
                                theme == 'dark' ? 'after:bg-ourWhite' : 'after:bg-ourGrey after:bg-opacity-25'
                            } after:rounded-full lg:after:content-none`}
                        >
                            <Link href="/homepage">
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>HOME PAGE</span>
                            </Link>
                            <Link href={`${loginUserData.isLogin ? '/mypage' : '/login'}`}>
                                <span className={`font-semibold ${theme == 'dark' ? 'text-ourWhite' : 'text-ourBlack'} cursor-pointer`}>MY PAGE</span>
                            </Link>
                            <span className="hidden lg:inline-block font-semibold text-ourBlack invisible">BLANK</span>
                            <span className="hidden lg:inline-block font-semibold text-ourBlack invisible">BLANK</span>
                        </nav>
                    </div>
                </section>
            </div>
            <div className="text-[0.625rem] md:text-sm lg:text-base box-border text-center lg:text-left lg:px-0 mt-4 lg:mt-6 xl:mt-9 text-ourGrey w-full">
                Copyright ⓒ 2022 KU SUMMER HACKATHON. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
