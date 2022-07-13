import Layout from '../../layouts/Layout';
import { Parallax } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Link from 'next/link';

const PCLanding = () => {
    return (
        <div>
            <div className="w-[95%] h-[45rem] mx-auto mt-[6rem]">
                <div className="absolute top-[11rem] left-[7rem] ">
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[8rem] font-impact text-ourBlack'}>
                        2022
                    </Parallax>
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[8rem] font-impact text-ourBlack'}>
                        KU
                    </Parallax>
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[8rem] font-impact text-ourBlack'}>
                        HACKATHON
                    </Parallax>
                </div>

                <div className="flex justify-evenly h-[100%]">
                    <Parallax speed={-10} translateY={[25, 40]} translateX={[0, 70]} startScroll={0} endScroll={60}>
                        <div className="self-end">
                            <img src="/business.svg" alt="business" />
                        </div>
                    </Parallax>
                    <Parallax speed={-10} translateY={[10, 30]} startScroll={0} endScroll={60}>
                        <div className="self-center">
                            <img src="/designer.svg" alt="designer" />
                        </div>
                    </Parallax>

                    <Parallax speed={-10} translateY={[0, 28]} translateX={[15, -63]} startScroll={0} endScroll={60}>
                        <div className="self-start">
                            <img src="/devkor.svg" alt="devkor" />
                        </div>
                    </Parallax>
                </div>
            </div>
            <Parallax speed={-10} opacity={[0, 1]} translateY={[-75, -75]} translateX={[8, 8]} startScroll={60} endScroll={80}>
                <img src="/spreads.svg" alt="spreads" width={`95%`} />
            </Parallax>

            <Parallax opacity={[0.1, 1]} translateY={[-770, -770]} startScroll={550} endScroll={800}>
                <div className="flex justify-center flex-col z-10">
                    <h3 className="tracking-wider text-center font-bold text-3xl">KU HACKATHON</h3>
                    <p className="tracking-wider text-center text-ourBlack font-bold text-2xl">청춘들의 여름 항해가 시작됩니다</p>
                </div>
            </Parallax>

            <div className="flex justify-center text-center">
                <Parallax opacity={[1, 0.1]} translateY={[-550, -550]} startScroll={550} endScroll={800}>
                    <img src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '7rem' }} />
                </Parallax>
            </div>

            <div className="flex justify-center text-center">
                <Parallax opacity={[0.1, 1]} translateY={[-50, -50]} startScroll={1100} endScroll={1400}>
                    <div>
                        <div>
                            <h3 className="mb-[3rem] text-3xl">후원</h3>
                            <img className="mb-[20rem]" src="/company.svg" alt="company" width={`100%`} />
                        </div>
                        <Link href="/home">
                            <a>
                                <Button size="lg" className="block mx-auto border-2 border-black hover:text-white mb-0">
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

PCLanding.Layout = Layout;
export default PCLanding;
