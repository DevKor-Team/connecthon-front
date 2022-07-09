import Button from '../../components/Button';
import Layout from '../../layouts/Layout';
import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function Landing() {
    const [clicked, setClicked] = useState<boolean>(false); // 2d logo animation 시작
    const [scrolled, setScrolled] = useState<boolean>(false); // scroll detection 해서 아래 페이지로 넘어감

    const SymbolAnimation = useSpring({
        loop: false,
        from: { rotateZ: 0 },
        to: { rotateZ: 180 },
    });
    const btnAnimation = useSpring({
        loop: true,
        from: { y: 0 },
        to: [{ y: 12 }, { y: 0 }],
        config: {
            duration: 200,
            bounce: 1,
        },
    });

    // const clickChange = () => {
    //     if (clicked) {
    //         // click이 true이면 글자 지우고 2d symbol animation 하겠다.
    //     }
    // };

    return (
        <div className="relative h-screen">
            <main>
                <div className="mt-[14rem]">
                    <div className="flex justify-center">
                        <img className="" src="/title.svg" alt="title" />
                    </div>
                </div>
                <div className="mt-4 center">
                    {/* <img className="w-12 z-0 mx-auto" src="/symbol-2d.svg" alt="symbol-2d" /> */}
                    <h4 className="text-center text-ourBlack font-bold z-10 text-animation mt-[9.6rem]">KU HACKATHON</h4>
                    <p className="text-center text-outBlack font-bold ">청춘들의 여름 항해가 시작됩니다</p>
                </div>

                <animated.div style={{ ...btnAnimation }} className="flex justify-center mt-[9.7rem]">
                    <BsChevronDown
                        className="cursor-pointer"
                        onClick={() => {
                            setClicked(true), console.log(clicked);
                        }}
                    />
                </animated.div>

                {/* <div>
                    <img className="w-[90%] mx-auto my-10" src="/company.svg" alt="company" />
                </div>
                <Button size="sm" className="block px-3 mt-[4rem] mx-auto">
                    Get Started
                </Button> */}
            </main>
        </div>
    );
}
Landing.Layout = Layout;
export default Landing;
