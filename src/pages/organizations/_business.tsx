import { useState } from 'react';

const BusinessSchool = () => {
    const [members, showMembers] = useState<boolean>(false);

    return (
        <div className="mx-3 mb-[8rem] w-[70%] text-left justify-end">
            <div className="absolute left-[45%]">
                <img src="business-reverse.svg" alt="business-reverse" className="opacity-30 " />
            </div>
            <h1 className="text-[2.5rem] font-bold text-[#FF0202] pt-9">1</h1>
            <h2 className="text-[1.25rem] font-semibold text-[#FF0202] mt-4 tracking-wide">PLANNER</h2>
            <h3 className="text-[1rem] font-light text-[#FF0202] mt-3 tracking-normal">고려대학교 경영대학</h3>
            <p className="text-[0.625rem] text-ourWhite mt-1 leading-[1rem]">
                고려대학교 경영학부는 회계, 재무, 국제경영, LSOM, 마케팅 등 경영의 7가지 분야 전반에 걸쳐 학습합니다. 이를 통해 경영지식과 능력을 쌓고, 비즈니스 리더로서의 역량을 기릅니다. 더불어 창업
                및 IT 서비스 기획 특수 과목을 통해 본인들의 서비스를 기획하고 구축하는 등 실무 역량에 대해 학습하기도 하며, 이를 Startup Express, Choo Choo Day 등의 창업 대회를 통해 활용해볼 수
                있습니다.
            </p>
            <div className="flex mt-2">
                <p className="text-ourWhite text-sm">멤버 소개</p>
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
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col mt-5 mx-5 w-[5rem]">
                        <div>
                            <img src="/devkor.jpg" alt="devkor" />
                        </div>
                        <p className="text-center text-ourWhite">name</p>
                    </div>
                    <div className="flex flex-col mt-5 mx-5 w-[5rem]">
                        <div>
                            <img src="/devkor.jpg" alt="devkor" />
                        </div>
                        <p className="text-center text-ourWhite">name</p>
                    </div>
                    <div className="flex flex-col mt-5 mx-5 w-[5rem]">
                        <div>
                            <img src="/devkor.jpg" alt="devkor" />
                        </div>
                        <p className="text-center text-ourWhite">name</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default BusinessSchool;
