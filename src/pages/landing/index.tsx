import Button from '../../components/Button';
import Layout from '../../layouts/Layout';
import { BsChevronDown } from 'react-icons/bs';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import Fade from 'react-reveal/Fade';
// import { useScrollBlock } from '../../hooks/useScrollBlock';

const SecondLanding = () => {
    return (
        <div>
            <div>
                <img className="w-[90%] mx-auto my-10" src="/company.svg" alt="company" />
            </div>
            <Button size="sm" className="block px-3 mt-[4rem] mx-auto">
                Get Started
            </Button>
        </div>
    );
};

const FirstLanding = () => {
    const [scrolled, setScrolled] = useState(false);
    const btnAnimation = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: 12 }, { y: 0 }],
        config: {
            duration: 200,
            bounce: 1,
        },
    });

    const symbolRotation = useSpring({
        from: {
            rotateZ: 0,
            opacity: 1,
        },
        to: { rotateZ: 360, opacity: 0 },
        config: {
            duration: 2000,
        },
        loop: false,
    });

    const textAnimation = useSpring({
        from: {
            opacity: 0,
        },
        to: { opacity: 1 },
        config: {
            duration: 2000,
        },
        loop: false,
    });

    return (
        <div className="relative h-screen">
            <main>
                <div className="mt-[14rem]">
                    <div className="flex justify-center">
                        <img className="" src="/title.svg" alt="title" />
                    </div>
                </div>

                <div>
                    <div className="flex justify-center">
                        <animated.h4 style={{ ...textAnimation }} className="absolute top-[18.2rem] text-center text-ourBlack font-bold">
                            KU HACKATHON
                        </animated.h4>
                        <animated.p style={{ ...textAnimation }} className="absolute top-[19.5rem] text-center text-ourBlack font-bold">
                            청춘들의 여름 항해가 시작됩니다
                        </animated.p>
                    </div>
                    <div className="flex justify-center">
                        <animated.img className="absolute top-[18rem]" src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '3rem', ...symbolRotation }} />
                    </div>
                </div>
                {scrolled ? null : (
                    <div>
                        <div className="flex justify-center items-center mt-[22rem] ">
                            <animated.img src="/expand-more.svg" alt="expand-icon" className="cursor-pointer" style={{ ...btnAnimation }} onClick={() => setScrolled(true)} />
                        </div>
                    </div>
                )}
                {/*
                 */}

                {/* <div>
                    {clicked ? (
                        <div className="flex justify-center mt-[9.7rem]">
                            <BsChevronDown
                                className="cursor-pointer"
                                onClick={() => {
                                    setClicked(true);
                                }}
                            />
                        </div>
                    ) : (
                        <animated.div style={{ ...btnAnimation }} className="flex justify-center mt-[9.7rem]">
                            <BsChevronDown
                                className="cursor-pointer"
                                onClick={() => {
                                    setClicked(true);
                                }}
                            />
                        </animated.div>
                    )}
                </div> */}

                {/* 
                <div>
                    <img className="w-[90%] mx-auto my-10" src="/company.svg" alt="company" />
                </div>
                <Button size="sm" className="block px-3 mt-[4rem] mx-auto">
                    Get Started
                </Button> */}
                {/* {clicked ? <StartPage /> : null} */}

                <div className="mt-[25rem]">
                    <Fade bottom>
                        <div className="my-[10rem]">
                            <h3 className="text-center mb-7">후원</h3>
                            <img className="w-[90%] mx-auto" src="/mobile-company.svg" alt="company" />
                        </div>
                    </Fade>
                    <Fade bottom>
                        <Button size="sm" className="block px-3 mt-[10rem] mb-[8rem] mx-auto border-2 border-black hover:text-white">
                            Get Started
                        </Button>
                    </Fade>
                </div>
                <div className="mt-10 h-[10rem]"></div>
            </main>
        </div>
    );
};

const Landing = () => {
    return (
        <div>
            <FirstLanding />
        </div>
    );
};

Landing.Layout = Layout;
export default Landing;
