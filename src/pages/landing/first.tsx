import { BsChevronDown } from 'react-icons/bs';
import { useSpring, animated } from 'react-spring';

const FirstLanding = () => {
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
        <div className="relative h-full">
            <main className="my-0">
                <div className="mt-[14rem]">
                    <div className="flex justify-center">
                        <img className="w-[20rem]" src="/title.svg" alt="title" />
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
                    <div className="flex justify-center text-center">
                        <animated.img className="absolute top-[18rem]" src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '3rem', ...symbolRotation }} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-center items-center mt-[22rem] mb-0">
                        <animated.img src="/expand-more.svg" alt="expand-icon" className="cursor-s-resize" style={{ ...btnAnimation }} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FirstLanding;
