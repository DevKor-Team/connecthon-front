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
    return (
        <div>
            <div className="w-[95%] h-[45rem] mx-auto mt-[6rem]">
                <div className="absolute top-[11rem] left-[7rem] ">
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem]'}>
                        2022
                    </Parallax>
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem]'}>
                        KU
                    </Parallax>
                    <Parallax opacity={[0.3, 1]} startScroll={2} endScroll={60} className={'leading-tight text-[6rem] font-impact text-ourBlack xl:text-[8rem]'}>
                        HACKATHON
                    </Parallax>
                </div>

                <div className="flex justify-evenly h-[100%]">
                    <Parallax speed={-10} translateY={[25, 35]} translateX={[0, 70]} startScroll={0} endScroll={60}>
                        <div className="self-end w-[20rem] xl:w-[28rem]">
                            <img src="/business.svg" alt="business" />
                        </div>
                    </Parallax>
                    <Parallax speed={-10} translateY={[10, 30]} startScroll={0} endScroll={60}>
                        <div className="self-center w-[20rem] xl:w-[28rem]">
                            <img src="/designer.svg" alt="designer" />
                        </div>
                    </Parallax>

                    <Parallax speed={-10} translateY={[0, 28]} translateX={[20, -63]} startScroll={0} endScroll={60}>
                        <div className="self-start w-[14rem] xl:w-[23rem]">
                            <img src="/devkor.svg" alt="devkor" />
                        </div>
                    </Parallax>
                </div>
            </div>
            <Parallax speed={-10} opacity={[0, 1]} translateY={[`${yLocation}`, `${yLocation}`]} translateX={[`${xLocation}`, `${xLocation}`]} startScroll={60} endScroll={80}>
                <img src="/spreads.svg" alt="spreads" width={`100%`} />
            </Parallax>

            <Parallax opacity={[0, 1]} translateY={[-770, -770]} startScroll={550} endScroll={800}>
                <div className="flex justify-center flex-col z-10">
                    <h3 className="tracking-wider text-center font-bold text-xl xl:text-3xl ">KU HACKATHON</h3>
                    <p className="tracking-wider text-center text-ourBlack font-bold text-xl xl:text-2xl">???????????? ?????? ????????? ???????????????</p>
                </div>
            </Parallax>

            <div className="flex justify-center text-center">
                <Parallax opacity={[1, 0]} translateY={[`${symbolLocation}`, `${symbolLocation}`]} startScroll={550} endScroll={800}>
                    <img src="/symbol-2d.svg" alt="symbol-2d" className="w-[5rem] xl:w-[7rem]" />
                </Parallax>
            </div>

            <div className="flex justify-center text-center">
                <Parallax opacity={[0.1, 1]} translateY={[-50, -50]} startScroll={1100} endScroll={1400}>
                    <div>
                        <div>
                            <h3 className="mb-[3rem] text-3xl">??????</h3>
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
