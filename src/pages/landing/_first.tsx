import { BsChevronDown } from 'react-icons/bs';
import { useSpring, animated } from 'react-spring';

interface Props {
    isFirst: boolean;
}

const FirstLanding = ({ isFirst }: Props) => {
    const btnAnimation = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: 12 }, { y: 0 }],
        config: {
            duration: 300,
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

    const componentAnimation = useSpring({
        loop: false,
        from: { opacity: 0 },
        to: [{ opacity: 1 }],
        config: {
            duration: 550,
        },
    });

    const FirstRenderPage = () => {
        return (
            <div className="relative h-full">
                <main className="my-0">
                    <div className="mt-[11rem]">
                        <div className="flex justify-center">
                            <img className="w-[20rem]" src="/title.svg" alt="title" />
                        </div>
                    </div>

                    <div>
                        {isFirst ? (
                            <div>
                                <div className="flex justify-center">
                                    <animated.h4 style={{ ...textAnimation }} className="absolute top-[25.5rem] text-center text-ourBlack font-bold">
                                        KU HACKATHON
                                    </animated.h4>
                                    <animated.p style={{ ...textAnimation }} className="absolute top-[26.8rem] text-center text-ourBlack font-bold">
                                        청춘들의 여름 항해가 시작됩니다
                                    </animated.p>
                                </div>
                                <div className="flex justify-center text-center">
                                    <animated.img className="absolute top-[25.5rem]" src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '3rem', ...symbolRotation }} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <h4 className="absolute top-[25.6rem] text-center text-ourBlack font-bold">KU HACKATHON</h4>
                                <p className="absolute top-[26.8rem] text-center text-ourBlack font-bold">청춘들의 여름 항해가 시작됩니다</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex justify-center items-center mt-[25rem] mb-0">
                            <animated.img src="/expand-more.svg" alt="expand-icon" className="cursor-s-resize" style={{ ...btnAnimation }} />
                        </div>
                    </div>
                </main>
            </div>
        );
    };

    const ReRenderPage = () => {
        return (
            <animated.div className="relative h-screen" style={{ ...componentAnimation }}>
                <main className="my-0">
                    <div className="mt-[11rem]">
                        <animated.div className="flex justify-center" style={{ ...componentAnimation }}>
                            <img className="w-[20rem]" src="/title.svg" alt="title" />
                        </animated.div>
                    </div>

                    <div>
                        {isFirst ? (
                            <div>
                                <div className="flex justify-center">
                                    <animated.h4 style={{ ...textAnimation }} className="absolute top-[25.5rem] text-center text-ourBlack font-bold">
                                        KU HACKATHON
                                    </animated.h4>
                                    <animated.p style={{ ...textAnimation }} className="absolute top-[26.8rem] text-center text-ourBlack font-bold">
                                        청춘들의 여름 항해가 시작됩니다
                                    </animated.p>
                                </div>
                                <div className="flex justify-center text-center">
                                    <animated.img className="absolute top-[25.5rem]" src="/symbol-2d.svg" alt="symbol-2d" style={{ width: '3rem', ...symbolRotation }} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <h4 className="absolute top-[25.5rem] text-center text-ourBlack font-bold">KU HACKATHON</h4>
                                <p className="absolute top-[26.8rem] text-center text-ourBlack font-bold">청춘들의 여름 항해가 시작됩니다</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex justify-center items-center mt-[22rem] mb-0">
                            <animated.img src="/expand-more.svg" alt="expand-icon" className="cursor-s-resize" style={{ ...btnAnimation }} />
                        </div>
                    </div>
                </main>
            </animated.div>
        );
    };
    // return <FirstRenderPage />;
    return <div>{isFirst ? <FirstRenderPage /> : <ReRenderPage />}</div>;
};

export default FirstLanding;
