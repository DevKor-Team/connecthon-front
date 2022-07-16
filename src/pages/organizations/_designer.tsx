import { useState } from 'react';

const Dijo = () => {
    const [members, showMembers] = useState<boolean>(false);
    return (
        <div className="mx-3 mt-[5rem] mb-[8rem] w-[70%] text-left justify-end">
            <div className="absolute left-[45%]">
                <img src="designer-reverse.svg" alt="business-reverse" className="opacity-30 " />
            </div>
            <h1 className="text-[2.5rem] font-bold text-[#29AAE4]">3</h1>
            <h2 className="text-[1.25rem] font-semibold text-[#29AAE4] mt-4 tracking-wide">DESIGNER</h2>
            <h3 className="text-[1rem] font-light text-[#29AAE4] mt-3 tracking-normal">고려대학교 디자인조형학부</h3>
            <p className="text-[0.625rem] text-ourWhite mt-1 leading-[1rem]">
                고려대학교 디자인조형학부는 총 2개의 세부 전공(조형미술전공, 산업정보디자인전공)으로 이루어진 학부이며 1학년 과정에서 디자인과 조형 전반을 아우르는 전공 수업 수료 이후 2학년에서 세부
                전공으로 진급하게 됩니다. 특히 이번 해커톤에 중점적으로 참여하는 산업정보디자인전공 학생들은 제품디자인을 중심으로 UX/UI, 그래픽, 인테리어, 엔터테인먼트 등의 현대 산업 전반에 걸친
                역량을 개발하는 커리큘럼을 따라 디자인을 공부하고 있습니다.
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

export default Dijo;
