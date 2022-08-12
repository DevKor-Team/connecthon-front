import { useState } from 'react';

const BusinessSchool = () => {
    const [members, showMembers] = useState<boolean>(false);
    return (
        <div className="mb-[8rem] w-[80%] text-left flex flex-col items-start relative">
            <div className="absolute left-[-3rem] w-[12rem] md:left-[-5rem] md:w-[16rem]">
                <img src="business-logo.svg" alt="business-reverse" className="w-[16rem]" />
            </div>

            <div className="w-[100%]">
                <h1 className="text-[2.5rem] font-bold text-[#FF0202] pt-10 sm:text-[3.5rem] md:pt-[5rem] md:text-[3.5rem]">1</h1>
                <h2 className="text-[1.25rem] font-semibold text-[#FF0202] sm:text-[1.75rem] mt-4 tracking-wider md:text-[2rem]">PLANNER</h2>
                <h3 className="text-[1rem] font-medium text-[#FF0202] mt-3 sm:text-[1.25rem] md:text-[1.3rem] tracking-wide">고려대학교 경영대학</h3>
                <p className="text-[0.625rem] text-white mt-1 leading-[1rem] sm:text-[0.875rem] sm:leading-5 md:text-[1.1rem] md:leading-[1.75rem] md:w-[70%]">
                    고려대학교 경영학부는 회계, 재무, 국제경영, LSOM, 마케팅 등 경영의 7가지 분야 전반에 걸쳐 학습합니다. 이를 통해 경영지식과 능력을 쌓고, 비즈니스 리더로서의 역량을 기릅니다. 더불어
                    창업 및 IT 서비스 기획 특수 과목을 통해 본인들의 서비스를 기획하고 구축하는 등 실무 역량에 대해 학습하기도 하며, 이를 Startup Express, Choo Choo Day 등의 창업 대회를 통해 활용해볼
                    수 있습니다.
                </p>
            </div>

            <div className="flex mt-4">
                <p className="text-ourWhite text-md">멤버 소개</p>
                <img
                    src="/expand-more.svg"
                    alt="expand-more"
                    className="w-5 cursor-pointer"
                    onClick={() => {
                        members ? showMembers(false) : showMembers(true);
                    }}
                />
            </div>
            {members ? (
                <div className="flex mt-3 justify-between w-[80%]">
                    <div className="flex flex-col items-center w-[12%] md:my-5">
                        <div>
                            <img src="/bs/sojeong.png" alt="sojeong" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">이소정</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5">
                        <div>
                            <img src="/bs/hyunjeong.png" alt="hyunjeong" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">이현정</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5 ">
                        <div>
                            <img src="/bs/hayoon.png" alt="hayoon" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">정하윤</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5">
                        <div>
                            <img src="/bs/dongin.png" alt="dongin" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">최동인</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5 ">
                        <div>
                            <img src="/bs/joonha.png" alt="joonha" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">박준하</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5">
                        <div>
                            <img src="/bs/yoonseo.png" alt="yoonseo" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">최윤서</p>
                    </div>
                    <div className="flex flex-col items-center w-[12%] md:my-5">
                        <div>
                            <img src="/bs/raewon.png" alt="raewon" className="w-[5.5rem]" />
                        </div>
                        <p className="text-center text-[0.6rem] my-2 sm:text-sm text-ourWhite sm:my-3 tracking-wide">김래원</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default BusinessSchool;
