import { Parallax } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { Company } from '../../interfaces/company';

const DeskTopLanding = () => {
    const [companyList, setCompanyList] = useState<Company[]>([]);
    useEffect(() => {
        async function fetchCompanies() {
            try {
                await axiosInstance.get('/companies').then(res => setCompanyList(res.data.data));
            } catch (e) {
                console.log(e);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <div>
            <div className="w-[100%] h-[45rem]">
                <div className="flex flex-col pt-[7rem] items-evenly relative">
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight font-impact text-ourBlack text-[9rem] duration-200'}>
                        2022
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight  font-impact text-ourBlack text-[9rem] duration-200'}>
                        KU
                    </Parallax>
                    <Parallax opacity={[0.2, 1]} startScroll={2} endScroll={60} className={'leading-tight  font-impact text-ourBlack text-[9rem] duration-200'}>
                        HACKATHON
                    </Parallax>
                    <div className="flex justify-evenly h-full">
                        <Parallax speed={-10} translateY={[-75, -94]} translateX={[-10, 75]} startScroll={0} endScroll={60}>
                            <div className="self-end w-[31rem]">
                                <img src="/business.svg" alt="business" className="w-[31rem]" />
                            </div>
                        </Parallax>
                        <Parallax speed={-10} translateY={[-100, -101]} translateX={[-10, 19]} startScroll={0} endScroll={60}>
                            <div className="self-center w-[32rem]">
                                <img src="/designer.svg" alt="designer" className="w-[32rem]" />
                            </div>
                        </Parallax>

                        <Parallax speed={-10} translateY={[-115, -101]} translateX={[-5, -25]} startScroll={0} endScroll={60}>
                            <div className="self-start w-[22rem]">
                                <img src="/devkor.svg" alt="devkor" className="w-[22rem]" />
                            </div>
                        </Parallax>
                    </div>
                </div>

                <div className="flex justify-evenly h-full relative "></div>
            </div>

            <div className="relative mt-[15rem]">
                <div className="flex flex-col justify-center items-center">
                    <Parallax opacity={[0, 1]} startScroll={600} endScroll={850}>
                        <div className="flex flex-col items-center">
                            <h3 className="tracking-normal text-center font-bold text-xl md:text-2xl xl:test-3xl">KU HACKATHON</h3>
                            <h4 className="tracking-wide text-center font-bold text-xl md:text-2xl">청춘들의 여름 항해가 시작됩니다</h4>
                        </div>
                    </Parallax>
                    <div className="absolute">
                        <Parallax opacity={[1, 0]} startScroll={600} endScroll={850}>
                            <div className="flex justify-center">
                                <img src="/symbol-2d.svg" alt="symbol-2d" className="w-[50%]" />
                            </div>
                        </Parallax>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-center mt-[43rem]">
                <Parallax opacity={[0.1, 1]} translateY={[-50, -50]} startScroll={1000} endScroll={1300}>
                    <div>
                        <h3 className="mb-[2rem] font-semibold text-3xl">후원사</h3>
                        <div className="w-[58.75rem] grid grid-cols-5 grid-flow-row gap-8">
                            {companyList
                                .filter(comp => !comp.alias?.includes('devkor'))
                                .map(comp => (
                                    <Link href={`/enterprise/${comp.id}`}>
                                        <div className="h-[5rem] flex items-center justify-center">
                                            <img src={`${comp.logo}`} className="cursor-pointer" />
                                        </div>
                                    </Link>
                                ))}
                        </div>

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

export default DeskTopLanding;
