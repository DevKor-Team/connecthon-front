import { useState } from 'react';

const Dijo = () => {
    const [members, showMembers] = useState<boolean>(false);
    return (
        <div className="mx-1 w-[70%] md:mx-[8rem] text-left justify-end relative">
            <div className="absolute left-[45%] md:left-[-6rem]">
                <img src="design-logo.svg" alt="business-reverse" className="w-[16rem]" />
            </div>

            <div className="w-[100%]">
                <h1 className="text-[2.5rem] font-bold text-[#29AAE4] pt-10 md:pt-[5rem] md:text-[3.5rem]">3</h1>
                <h2 className="text-[1.25rem] font-semibold text-[#29AAE4] mt-4 tracking-wider md:text-[2rem]">DESIGNER</h2>
                <h3 className="text-[1rem] font-medium text-[#29AAE4] mt-3 md:text-[1.3rem] tracking-wide">고려대학교 디자인조형학부</h3>
                <p className="text-[0.625rem] text-white mt-1 leading-[1rem] md:text-[1rem] md:leading-[1.5rem] md:w-[78%]">
                    고려대학교 디자인조형학부는 총 2개의 세부 전공(조형미술전공, 산업정보디자인전공)으로 이루어진 학부이며 1학년 과정에서 디자인과 조형 전반을 아우르는 전공 수업 수료 이후 2학년에서
                    세부 전공으로 진급하게 됩니다. 특히 이번 해커톤에 중점적으로 참여하는 산업정보디자인전공 학생들은 제품디자인을 중심으로 UX/UI, 그래픽, 인테리어, 엔터테인먼트 등의 현대 산업 전반에
                    걸친 역량을 개발하는 커리큘럼을 따라 디자인을 공부하고 있습니다.
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
                <div className="flex">
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/hyuna.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">김현아</p>
                    </div>
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/jiyoon.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">김지윤</p>
                    </div>
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/jio.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">유지오</p>
                    </div>
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/taewoong.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">장태웅</p>
                    </div>
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/seungyeon.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">정승연</p>
                    </div>
                    <div className="flex flex-col my-5 mr-5">
                        <div>
                            <img src="/designers/eun.jpeg" alt="hyuna" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">고은</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Dijo;
