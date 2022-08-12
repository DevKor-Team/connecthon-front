import { useSpring, animated } from 'react-spring';
import Button from '../../components/Button';
import Link from 'next/link';

const SecondLanding = () => {
    const componentAnimation = useSpring({
        loop: false,
        from: { opacity: 0 },
        to: [{ opacity: 1 }],
        config: {
            duration: 700,
        },
    });
    return (
        <animated.div className="mt-[30rem] mb-0" style={{ ...componentAnimation }}>
            <div className="my-[10rem]">
                <h3 className="text-center font-semibold text-xl mb-[5rem]">후원사</h3>
                <img className="w-[90%] mx-auto" src="/companies-mobile.svg" alt="company" />
            </div>
            <Link href="/home">
                <a>
                    <Button size="sm" className="block px-3 mt-[5rem] mb-[7rem] mx-auto border-2 border-black hover:text-white">
                        Get Started
                    </Button>
                </a>
            </Link>
        </animated.div>
    );
};

export default SecondLanding;
