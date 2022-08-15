import { Parallax } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Link from 'next/link';

const LabTopLanding = () => {
    return (
        <div>
            <div className="w-[100%] h-[45rem]">
                <div className="flex flex-col pt-[12rem] items-evenly relative">
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight font-impact text-ourBlack text-[8rem] duration-200'}>
                        2022
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight  font-impact text-ourBlack text-[8rem] duration-200'}>
                        KU
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight  font-impact text-ourBlack text-[8rem] duration-200'}>
                        HACKATHON
                    </Parallax>
                    <div className="flex justify-evenly h-full">
                        <Parallax speed={-10} translateY={[-75, -94]} translateX={[15, 70]} startScroll={0} endScroll={60}>
                            <div className="self-end w-[29rem] xl:w-[28rem] ">
                                <img src="/business.svg" alt="business" />
                            </div>
                        </Parallax>
                        <Parallax speed={-10} translateY={[-105, -101]} translateX={[-15, 13]} startScroll={0} endScroll={60}>
                            <div className="self-center w-[29rem] xl:w-[28rem]">
                                <img src="/designer.svg" alt="designer" />
                            </div>
                        </Parallax>

                        <Parallax speed={-10} translateY={[-125, -101]} translateX={[-40, -37]} startScroll={0} endScroll={60}>
                            <div className="self-start w-[20rem] xl:w-[23rem]">
                                <img src="/devkor.svg" alt="devkor" />
                            </div>
                        </Parallax>
                    </div>
                </div>

                <div className="flex justify-evenly h-full relative "></div>
            </div>

            <div className="relative mt-[10rem]">
                <div className="flex flex-col justify-center items-center">
                    <Parallax opacity={[0, 1]} startScroll={400} endScroll={750}>
                        <div className="flex flex-col items-center">
                            <h3 className="tracking-normal text-center font-bold text-xl md:text-2xl xl:test-3xl">KU HACKATHON</h3>
                            <h4 className="tracking-wide text-center font-bold text-xl md:text-2xl">청춘들의 여름 항해가 시작됩니다</h4>
                        </div>
                    </Parallax>
                    <div className="absolute">
                        <Parallax opacity={[1, 0]} startScroll={400} endScroll={750}>
                            <div className="flex justify-center">
                                <img src="/symbol-2d.svg" alt="symbol-2d" className="w-[50%]" />
                            </div>
                        </Parallax>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-center mt-[50rem]">
                <Parallax opacity={[0.1, 1]} translateY={[-50, -50]} startScroll={1000} endScroll={1350}>
                    <div>
                        <h3 className="mb-[5rem] font-semibold text-3xl">후원사</h3>
                        <img src="/sponsors.svg" alt="companies" />

                        <Link href="/home">
                            <a>
                                <Button size="lg" className="block mt-[15rem] mx-auto border-2 border-black hover:text-white mb-0">
                                    Get Started
                                </Button>
                            </a>
                        </Link>
                    </div>
                </Parallax>
                <div className="m-0"></div>
            </div>
        </div>
    );
};

export default LabTopLanding;
