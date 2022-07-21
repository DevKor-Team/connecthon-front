import Layout from '../../layouts/Layout';
import BusinessSchool from './_business';
import DevKor from './_devkor';
import Dijo from './_designer';
import useAutoScroll from '../../hooks/useAutoScroll';

const AboutUs = () => {
    const organizationTab = {
        0: useAutoScroll(),
        1: useAutoScroll(),
        2: useAutoScroll(),
    };
    return (
        <div className="mt-[5rem]">
            <div className="mt-[6rem] text-center">
                {/* <img src="/background-symbol.svg" alt="background-symbol" className="absolute" /> */}
                <h4 className="font-impact text-md md:text-xl">2022 KU SUMMER HACKATHON's</h4>
                <h1 className="font-impact text-4xl md:text-5xl">The Management Team</h1>

                <div className="mt-[2rem]">
                    <h3 className="text-lg text-[#2087FF] font-semibold tracking-wide md:text-xl">청춘들의 여름 항해를 도울 운영진</h3>
                    <p className="mt-[1.5rem] text-sm md:text-lg">청춘들의 성공적인 여름 항해를 돕기 위한 각 분야의 운영진 입니다.</p>
                    <p className="text-sm md:text-lg">청춘들의 성공적인 항해를 진심으로 응원할, 고려대학교 최고의</p>
                    <p className="text-sm md:text-lg">PLANNER / DEVELOPER / DESIGNER 를 소개합니다.</p>
                </div>
                <div className="mx-[1rem] mb-[10rem] mt-[4rem] md:mx-[10rem] lg:mx-[15rem]">
                    <img src="/devkor-text.svg" alt="devkor-text" className="ml-auto mr-0 md:w-[18rem]" onClick={organizationTab[0].onElement} />
                    <img src="/business-text.svg" alt="business-text" className="ml-0 mr-auto md:w-[18rem]" onClick={organizationTab[1].onElement} />
                    <img src="/designer-text.svg" alt="designer-text" className="ml-auto mr-0 md:w-[20rem]" onClick={organizationTab[2].onElement} />
                </div>
            </div>
            <div className="bg-[#1D1D1D] opacity-85">
                <div className="text-center p-1">
                    <h2 className="font-impact text-ourWhite text-2xl mt-[10rem] md:text-3xl ">Who We Are?</h2>
                    <h4 className="mt-3 text-ourWhite md:text-lg">2022 KU SUMMER HACKATHON 운영진 소개</h4>
                </div>
                <div className="pb-[20rem]">
                    <div ref={organizationTab[1].element} className="mt-[9rem]">
                        <BusinessSchool />
                    </div>
                    <div ref={organizationTab[0].element} className="flex justify-end mr-3 mt-[20rem]">
                        <DevKor />
                    </div>
                    <div ref={organizationTab[2].element} className="mt-[20rem]">
                        <Dijo />
                    </div>
                </div>
                <div className="w-[25rem] mx-auto mt-[2rem]">
                    <h4 className="text-ourWhite text-[1.1rem] text-center">
                        <span className="text-ourWhite font-impact">2022 KU SUMMER HACKATHON MANAGEMENT </span>
                        운영진이
                    </h4>
                    <h4 className="text-ourWhite text-center pb-[25rem] text-[1.1rem]"> 청춘들의 성공적인 항해를 진심으로 응원합니다.</h4>
                </div>
            </div>
        </div>
    );
};

AboutUs.Layout = Layout;
export default AboutUs;
