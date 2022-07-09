import Button from '../../components/Button';
import Layout from '../../layouts/Layout';
import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';
import { useSpring, animated, useSpringRef, useTransition, useChain, Transition } from 'react-spring';

function Landing() {
    const [clicked, setClicked] = useState<boolean>(false); // 2d logo animation 시작
    const [scrolled, setScrolled] = useState<boolean>(false); // scroll detection 해서 아래 페이지로 넘어감

    // const btnRef = useSpringRef();
    const btnAnimation = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: 12 }, { y: 0 }],
        config: {
            duration: 200,
            bounce: 1,
        },
    });

    // const symbolRef = useSpringRef();
    const symbolRotation = useSpring({
        from: {
            rotateZ: 0,
            opacity: 1,
        },
        to: { rotateZ: 360, opacity: 0 },
        config: {
            duration: 2000,
        },
        loop: true,
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

    const StartPage = () => {
        return (
            <div>
                <div>
                    <img className="w-[90%] mx-auto my-10" src="/company.svg" alt="company" />
                </div>
                <Button size="sm" className="block px-3 mt-[4rem] mx-auto border-2 border-ourBlack hover:text-white">
                    Get Started
                </Button>
            </div>
        );
    };

    // useChain(clicked ? [btnRef, symbolRef] : [symbolRef, btnRef], [0, clicked ? 0.1 : 0.6]);

    const Message = () => {
        return (
            <div>
                <h4 className="text-center text-ourBlack font-bold z-10 text-animation mt-[9.6rem]">KU HACKATHON</h4>
                <p className="text-center text-ourBlack font-bold ">청춘들의 여름 항해가 시작됩니다</p>
            </div>
        );
    };

    const Symbol = () => {
        return (
            <div className="flex justify-center mt-[9.6rem]">
                <animated.img src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '3rem', ...symbolRotation }} />
            </div>
        );
    };
    const Text = () => {
        return (
            <div>
                <animated.h4 style={{ ...textAnimation }} className="text-center text-ourBlack font-bold z-10 mt-[9.6rem]">
                    KU HACKATHON
                </animated.h4>
                <animated.p style={{ ...textAnimation }} className="text-center text-ourBlack font-bold">
                    청춘들의 여름 항해가 시작됩니다
                </animated.p>
            </div>
        );
    };

    // const clickChange = () => {
    //     if (clicked) {
    //         // click이 true이면 글자 지우고 2d symbol animation 하겠다.
    //     }

    // useChain(clicked ? [symbolRef, fadeOutRef] : [btnRef]);

    return (
        <div className="relative h-screen">
            <main>
                <div className="mt-[14rem]">
                    <div className="flex justify-center">
                        <img className="" src="/title.svg" alt="title" />
                    </div>
                </div>
                {/* <div className="mt-4 center">
                    <img className="w-12 z-0 mx-auto" src="/symbol-2d.svg" alt="symbol-2d" />
                    <h4 className="text-center text-ourBlack font-bold z-10 text-animation mt-[9.6rem]">KU HACKATHON</h4>
                    <p className="text-center text-outBlack font-bold ">청춘들의 여름 항해가 시작됩니다</p>
                </div> */}
                <div>{clicked ? <Symbol /> : <Message />}</div>
                <div>
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
                </div>
                {/* 
                <div>
                    <img className="w-[90%] mx-auto my-10" src="/company.svg" alt="company" />
                </div>
                <Button size="sm" className="block px-3 mt-[4rem] mx-auto">
                    Get Started
                </Button> */}
                {clicked ? <StartPage /> : null}
            </main>
        </div>
    );
}
Landing.Layout = Layout;
export default Landing;
