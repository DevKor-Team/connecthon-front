import { useSpring, animated } from 'react-spring';
import Button from '../../components/Button';

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
                <h3 className="text-center mb-7">후원</h3>
                <img className="w-[90%] mx-auto" src="/mobile-company.svg" alt="company" />
            </div>
            <Button size="sm" className="block px-3 mt-[5rem] mx-auto border-2 border-black hover:text-white">
                Get Started
            </Button>
        </animated.div>
    );
};

export default SecondLanding;
