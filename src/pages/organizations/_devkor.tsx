import { useState } from 'react';

const DevKor = () => {
    const [members, showMembers] = useState<boolean>(false);

    return (
        <div className="mx-3 mt-[5rem] mb-[8rem] w-[70%] text-right justify-end">
            <div className="absolute right-[45%] z-0 ">
                <img src="devkor-reverse2.svg" alt="business-reverse" className="opacity-30 " />
            </div>
            <h1 className="text-[2.5rem] font-bold text-[#F6CC00]">2</h1>
            <h2 className="text-[1.25rem] font-semibold text-[#F6CC00] mt-4 tracking-wide">DEVELOPER</h2>
            <h3 className="text-[1rem] font-light text-[#F6CC00] mt-3 tracking-normal">고려대학교 소프트웨어 개발 / 연구 학회 DevKor</h3>
            <p className="text-[0.625rem] text-ourWhite mt-1 leading-[1rem]">
                DevKor는 현실의 문제를 다양한 관점에서 바라보고 이를 소프트웨어로 해결하고자 하는 사람들이 모인 고려대학교 소프트웨어 개발 / 연구 학회입니다. 1년 간의 체계적인 커리큘럼을 바탕으로,
                단순히 개발 실력을 갖추는 것에서 더 나아가, 현실의 문제를 명확히 인지하고, 문제를 관통하는 서비스를 직접 제작해보는 경험을 하게 됩니다. 이 과정에서 구성원 모두가 문제를 더 깊고, 넓게
                바라볼 수 있는 인사이트를 기르게 되며, 다양한 소프트웨어 기술을 도구로써 적절히 활용하는 능력을 갖추게 됩니다.
            </p>
            <div className="flex mt-2">
                <p className="text-ourWhite text-sm">멤버 소개</p>
                <img
                    src="/expand-more.svg"
                    alt="expand-more"
                    className="w-5 cursor-pointer z-10"
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

export default DevKor;
