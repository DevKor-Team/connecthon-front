import { CustomNextPage } from '../types/types';
import { GithubLoginBtn, GoogleLoginBtn, KakaoLoginBtn } from '../components/LoginButton';
import React, { useState } from 'react';
import { axiosInstance } from '../hooks/queries';

const LoginPage: CustomNextPage = () => {
    const [isParticipantMode, setParticipantMode] = useState(true);

    const handleCompanyLogin = (e: React.FormEvent) => {
        e.preventDefault();
        axiosInstance.post('/auth/local');
    };

    return (
        <main className={`w-full h-[100vh] md:h-[calc(100vh-4rem)] md:mt-16 flex flex-col items-center justify-center`}>
            {/* 로그인페이지 상단 해커톤 대문 섹션 */}
            <section className="w-full h-3/5 flex flex-col items-center justify-center bg-center bg-contain lg:bg-[length:90%_90%] bg-no-repeat bg-[url('/home-background.svg')]">
                <div className="flex flex-col justify-between items-center tracking-widest mb-4 mt-4 md:mt-0 md:mb-10">
                    <h1 className={`font-impact tracking-tight lg:tracking-normal text-4xl sm:text-6xl lg:text-7xl sm:mb-2`}>2022</h1>
                    <h1 className={`font-impact tracking-tight lg:tracking-normal text-4xl sm:text-6xl lg:text-7xl`}>KU HACKATHON</h1>
                </div>
                <h2 className={`text-xl sm:text2xl lg:text-3xl font-extrabold mb-5 md:mb-6`}>청춘들의 여름 항해</h2>
            </section>

            {/* 로그인 섹션 */}
            <section className="w-full h-2/5 flex flex-col items-center justify-center space-y-5 lg:pb-10">
                <div className="w-full flex flex-col items-center justify-center after:content-[' '] after:bg-gray-200 after:h-[2px] after:w-[20rem] after:rounded-full after:mt-3">
                    <div className="w-[20rem] h-full flex items-center justify-around font-semibold">
                        <button className={`${isParticipantMode ? 'bg-ourBlue text-white' : 'bg-slate-100 text-gray-400/60'} w-6/12 h-10 rounded`} onClick={() => setParticipantMode(true)}>
                            참가자 로그인
                        </button>
                        <button className={`${isParticipantMode ? 'bg-slate-100 text-gray-400/60' : 'bg-ourBlue text-white'} w-6/12 h-10 rounded`} onClick={() => setParticipantMode(false)}>
                            기업 로그인
                        </button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center">
                    {/* 참가자 로그인 섹션 */}
                    <div className={`w-full flex flex-col items-center justify-center space-y-5 ${isParticipantMode ? 'visible' : 'hidden'}`}>
                        <GithubLoginBtn />
                        <KakaoLoginBtn />
                        <GoogleLoginBtn />
                    </div>

                    {/* 기업 로그인 섹션 */}
                    <form className={`w-full h-[10.375rem] flex flex-col items-center justify-center space-y-4 ${isParticipantMode ? 'hidden' : 'visible'}`} onSubmit={handleCompanyLogin}>
                        <input type="text" name="username" className="w-[20rem] h-12 bg-slate-100 px-4 rounded focus:outline-none" placeholder="아이디" />
                        <input type="password" name="password" className="w-[20rem] h-12 bg-slate-100 px-4 rounded focus:outline-none" placeholder="비밀번호" />
                        <button type="submit" className="w-[20rem] h-12 bg-ourBlue text-white font-semibold rounded">
                            로그인
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
