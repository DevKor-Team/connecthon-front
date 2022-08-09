import Layout from '../../layouts/Layout';
import { Parallax } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Link from 'next/link';

interface Location {
    xLocation: number;
    yLocation: number;
    symbolLocation: number;
}

const PCLanding = ({ xLocation, yLocation, symbolLocation }: Location) => {
    const companies = [
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
        {
            name: '코르카',
            logo: '/companies/visual_camp.png',
        },
    ];
    return (
        <div>
            <div className="w-[95%] h-[45rem] mx-auto mt-[6rem]">
                <div className="absolute top-[11rem] left-[3rem] md:top-[11rem] md:left-[7rem] ">
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem] duration-200'}>
                        2022
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem] duration-200'}>
                        KU
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem] duration-200'}>
                        HACKATHON
                    </Parallax>
                </div>

                <div className="flex justify-evenly h-full">
                    <Parallax speed={-10} translateY={[25, 35]} translateX={[0, 70]} startScroll={0} endScroll={60}>
                        <div className="self-end w-[14rem]  md:w-[20rem] xl:w-[28rem]">
                            <img src="/business.svg" alt="business" />
                        </div>
                    </Parallax>
                    <Parallax speed={-10} translateY={[10, 30]} startScroll={0} endScroll={60}>
                        <div className="self-center w-[14rem] md:w-[20rem] xl:w-[28rem]">
                            <img src="/designer.svg" alt="designer" />
                        </div>
                    </Parallax>

                    <Parallax speed={-10} translateY={[0, 28]} translateX={[20, -63]} startScroll={0} endScroll={60}>
                        <div className="self-start w-[10rem] md:w-[14rem] xl:w-[23rem]">
                            <img src="/devkor.svg" alt="devkor" />
                        </div>
                    </Parallax>
                </div>
            </div>
            <Parallax speed={-10} opacity={[0, 1]} translateY={[`${yLocation}`, `${yLocation}`]} translateX={[`${xLocation}`, `${xLocation}`]} startScroll={60} endScroll={80}>
                <img src="/spreads.svg" alt="spreads" className="w-[100vw]" />
            </Parallax>
            <div className="relative">
                <div className="flex flex-col justify-center items-center">
                    <Parallax opacity={[0, 1]} startScroll={300} endScroll={600}>
                        <div className="flex flex-col items-center">
                            <h3 className="tracking-wide text-center font-bold text-xl md:text-2xl xl:test-3xl">KU HACKATHON</h3>
                            <h4 className="tracking-wide text-center text-xl md:text-2xl xl:text-3xl">청춘들의 여름 항해가 시작됩니다</h4>
                        </div>
                    </Parallax>
                    <div className="absolute">
                        <Parallax opacity={[1, 0]} startScroll={300} endScroll={600}>
                            <div className="flex justify-center">
                                <img src="/symbol-2d.svg" alt="symbol-2d" className="w-[50%]" />
                            </div>
                        </Parallax>
                    </div>
                </div>
            </div>

            {/* <div className="relative">
                <Parallax opacity={[0, 1]} startScroll={300} endScroll={600}>
                    <div className="flex flex-col items-center justify-center z-10 absolute top-[-20rem] left-[32%] md:left-[33%] lg:left-[34%]">
                        <h3 className="tracking-wider text-center font-bold text-xl xl:text-3xl">KU HACKATHON</h3>
                        <p className="tracking-wider text-center text-ourBlack font-bold text-xl xl:text-2xl">청춘들의 여름 항해가 시작됩니다</p>
                    </div>
                </Parallax>

                <div className="flex justify-center text-center absolute top-[-21rem] left-[45%] ">
                    <Parallax opacity={[1, 0]} startScroll={300} endScroll={600}>
                        <img src="/symbol-2d.svg" alt="symbol-2d" className="w-[5rem] xl:w-[7rem]" />
                    </Parallax>
                </div>
            </div> */}

            <div className="flex justify-center text-center mt-[20rem]">
                <Parallax opacity={[0.1, 1]} translateY={[-50, -50]} startScroll={800} endScroll={1200}>
                    <div>
                        <h3 className="mb-[3rem] text-3xl">후원</h3>
                        <div className="flex justify-evenly flex-wrap">
                            {companies.map(company => {
                                return <img src={company.logo} alt={company.name} className="w-[20%] " />;
                            })}
                        </div>
                        <Link href="/home">
                            <a>
                                <Button size="lg" className="block mt-[5rem] mx-auto border-2 border-black hover:text-white mb-0">
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
