import Layout from '../../layouts/Layout';
import { useSpring, animated } from 'react-spring';
import { useState, useEffect } from 'react';

const PCLanding = () => {
    const [scrollDirection, setScrollDirection] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [textOpacity, setTextOpacity] = useState(30);
    const btnAnimation = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: 12 }, { y: 0 }],
        config: {
            duration: 300,
            bounce: 1,
        },
    });

    const fadeIn = useSpring({
        loop: false,
        from: { opacity: 0.3 },
        to: { opacity: 1 },
        config: {
            duration: 3000,
        },
    });

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDirection(scrollY > lastScrollY ? true : false);
            setIsFirst(scrollDirection ? true : false);
            setTextOpacity(100);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDirection);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollDirection]);

    return (
        <div>
            <div className="w-[95%] h-[45rem] mx-auto mt-[6rem]">
                <div className="absolute top-[11rem] left-[7rem] ">
                    <h2 className={`leading-tight text-[8rem] font-impact z-0 text-ourBlack opacity-${textOpacity}`}>2022</h2>
                    <h2 className={`leading-tight text-[8rem] font-impact z-0 text-ourBlack opacity-${textOpacity}`}>KU</h2>
                    <h2 className={`leading-tight text-[8rem] font-impact z-0 text-ourBlack opacity-${textOpacity}`}>HACKATHON</h2>
                </div>
                <div className="flex justify-evenly h-[100%]">
                    <div className="self-end z-10">
                        <img src="/business.svg" alt="business" />
                    </div>
                    <div className="self-center z-10">
                        <img src="/designer.svg" alt="designer" />
                    </div>
                    <div className="self-start z-10s">
                        <img src="/devkor.svg" alt="devkor" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mb-5">
                <animated.img src="/expand-more.svg" alt="expand-icon" className="cursor-s-resize" style={{ ...btnAnimation }} />
            </div>
        </div>
    );
};

PCLanding.Layout = Layout;
export default PCLanding;
