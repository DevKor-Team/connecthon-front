import BusinessSchool from './_business';
import DevKor from './_devkor';
import Dijo from './_designer';
import useAutoScroll from '../../hooks/useAutoScroll';
import { axiosInstance } from '../../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { useEffect } from 'react';

const AboutUs = () => {
    const organizationTab = {
        0: useAutoScroll(),
        1: useAutoScroll(),
        2: useAutoScroll(),
    };

    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserState({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserState({
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

    return (
        <>
            <div className="flex flex-col justify-center items-center pt-[8rem] relative ">
                <div className="ml-5 sm:ml-0 md:pt-[8rem] px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">
                    <div className="text-center w-[100%]">
                        <h4 className="font-impact text-sm sm:text-md md:text-3xl">2022 KU SUMMER HACKATHON's</h4>
                        <h1 className="font-impact text-2xl sm:text-3xl mt-1 md:text-7xl md:mt-3">The Management Team</h1>
                        <div className="mt-[2rem] md:mt-[8rem]">
                            <h3 className="text-md sm:text-lg text-[#2087FF] font-semibold tracking-wide md:text-xl">청춘들의 여름 항해를 도울 운영진</h3>
                            <p className="text-[0.6rem] sm:text-[0.75rem] mt-5 md:mt-[4rem] md:text-lg leading-snug">청춘들의 성공적인 여름 항해를 돕기 위한 각 분야의 운영진 입니다.</p>
                            <p className="text-[0.6rem] sm:text-[0.75rem] md:text-lg leading-snug">청춘들의 성공적인 항해를 진심으로 응원할, 고려대학교 최고의 </p>
                            <p className="text-[0.6rem] sm:text-[0.75rem] md:text-lg leading-snug">PLANNER / DEVELOPER / DESIGNER 를 소개합니다.</p>
                        </div>
                        <img
                            src="/organization-bg.svg"
                            alt="organization-background "
                            className="absolute w-[50rem] left-[-12.5rem] top-[20rem] sm:top-[20rem] sm:left-[-22rem] md:top-[50rem] md:left-[-25rem]"
                        />

                        <div className="relative mt-[5rem]">
                            <div className="w-[100%] h-[60rem] relative">
                                <img
                                    src="/business-org.svg"
                                    alt="business-text"
                                    className="absolute w-[14rem] top-[8rem] left-[-1rem] sm:w-[18rem] sm:left-[-4rem] md:w-[21rem] md:left-[4rem] lg:w-[24rem] lg:left-0 md:grayscale md:hover:grayscale-0 hover:md:w-[27rem] duration-200 "
                                    onClick={organizationTab[1].onElement}
                                />
                                <img
                                    src="/devkor-org.svg"
                                    alt="devkor-text"
                                    className="absolute w-[14rem] top-[18.5rem] right-[-4rem] sm:w-[18rem] sm:top-[20rem] sm:right-[-7rem] md:w-[21rem] md:right-0 md:top-[23rem] lg:w-[24rem] lg:right-[-5rem] md:grayscale md:hover:grayscale-0 hover:md:w-[27rem] duration-200"
                                    onClick={organizationTab[0].onElement}
                                />
                                <img
                                    src="/designer-org.svg"
                                    alt="designer-text"
                                    className="absolute w-[16rem] top-[28rem] left-0 sm:w-[20rem] sm:left-[-1rem] sm:top-[29rem] md:w-[25rem] md:top-[35rem] md:left-[6rem] lg:w-[29rem] lg:left-[4rem] md:grayscale md:hover:grayscale-0 hover:md:w-[32rem] duration-200 "
                                    onClick={organizationTab[2].onElement}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1D1D1D] opacity-85 mt-[10rem]">
                    <div className="w-[100%] mt-[8rem] md:pt-[13rem] px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">
                        <div className="ml-5 text-center p-1">
                            <h2 className="font-impact text-ourWhite text-2xl mt-[10rem] md:text-3xl ">Who We Are?</h2>
                            <h4 className="mt-3 text-ourWhite md:text-lg">2022 KU SUMMER HACKATHON 운영진 소개</h4>
                        </div>
                        <div className="mt-[20rem]">
                            <div ref={organizationTab[1].element} className="ml-10 md:ml-0 mt-[2rem] pt-[15rem] md:mt-[9rem] md:pt-[12rem]">
                                <BusinessSchool />
                            </div>
                            <div ref={organizationTab[0].element} className="mr-5 md:mr-0 mt-[28rem] pt-[15rem] md:mt-[20rem] md:pt-[10rem]">
                                <DevKor />
                            </div>
                            <div ref={organizationTab[2].element} className="ml-10 md:ml-0 mt-[28rem] pt-[15rem] md:mt-[20rem] md:pt-[12rem]">
                                <Dijo />
                            </div>
                        </div>
                        <div className="w-[25rem] mx-auto mt-[37rem] md:w-[70%]">
                            <h4 className="text-ourWhite text-[1.1rem] text-center md:text-[1.25rem]">
                                <span className="text-ourWhite font-impact md:text-[1.25rem]">2022 KU SUMMER HACKATHON MANAGEMENT </span>
                                운영진이
                            </h4>
                            <h4 className="text-ourWhite text-center pb-[25rem] text-[1.1rem] md:text-[1.25rem] pt-1"> 청춘들의 성공적인 항해를 진심으로 응원합니다.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
