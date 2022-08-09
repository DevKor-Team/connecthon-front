import { useState } from 'react';

const DevKor = () => {
    const [members, showMembers] = useState<boolean>(false);

    return (
        <div className="mx-3 mb-[8rem] w-[70%] md:mr-[8rem] text-right justify-end relative">
            <div className="absolute right-[10rem] z-0 md:right-[-8rem] md:top-[-5rem]">
                <img src="devkor-logo.svg" alt="business-reverse" className="opacity-20 " />
            </div>
            <div className="w-[100%] flex flex-col items-end">
                <h1 className="text-[2.5rem] font-bold text-[#F6CC00] pt-10 md:pt-[5rem] md:text-[3.5rem]">2</h1>
                <h2 className="text-[1.25rem] font-semibold text-[#F6CC00] mt-4 tracking-wider md:text-[2rem]">DEVELOPER</h2>
                <h3 className="text-[1rem] font-medium text-[#F6CC00] mt-3 md:text-[1.3rem]">고려대학교 소프트웨어 개발/연구 학회 DevKor</h3>
                <p className="text-[0.625rem] text-white mt-1 leading-[1rem] md:text-[1rem] md:leading-[1.5rem] md:w-[77%]">
                    DevKor는 현실의 문제를 다양한 관점에서 바라보고 이를 소프트웨어로 해결하고자 하는 사람들이 모인 고려대학교 소프트웨어 개발 / 연구 학회입니다. 1년 간의 체계적인 커리큘럼을 바탕으로,
                    단순히 개발 실력을 갖추는 것에서 더 나아가, 현실의 문제를 명확히 인지하고, 문제를 관통하는 서비스를 직접 제작해보는 경험을 하게 됩니다. 이 과정에서 구성원 모두가 문제를 더 깊고,
                    넓게 바라볼 수 있는 인사이트를 기르게 되며, 다양한 소프트웨어 기술을 도구로써 적절히 활용하는 능력을 갖추게 됩니다.
                </p>
            </div>
            <div className="flex mt-2 md:mt-4">
                <p className="text-ourWhite text-md md:ml-auto md:mr-0">멤버 소개</p>
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
                <div className="flex justify-end">
                    <div className="flex flex-col my-5 mx-5">
                        <div>
                            <img src="/devkors/an.png" alt="an" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">안수진</p>
                    </div>
                    <div className="flex flex-col my-5 mx-5">
                        <div>
                            <img src="/devkors/jeong.png" alt="an" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">정호진</p>
                    </div>
                    <div className="flex flex-col my-5 mx-5">
                        <div>
                            <img src="/devkors/no.png" alt="an" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">노정훈</p>
                    </div>
                    <div className="flex flex-col my-5 mx-5">
                        <div>
                            <img src="/devkors/baek.png" alt="an" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">백승윤</p>
                    </div>
                    <div className="flex flex-col my-5 mx-5">
                        <div>
                            <img src="/devkors/lee.png" alt="an" className="w-[6rem]" />
                        </div>
                        <p className="text-center text-ourWhite my-3 tracking-wide">이승우</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default DevKor;
