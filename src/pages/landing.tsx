import Head from 'next/head';
import Header from '../components/Header';
import Button from '../components/Button';
import MovingComponent from 'react-moving-text';

const MyAnime = () => {
    const str = '청춘들의 여름 항해가 시작됩니다';
    const Letters = Array.from(str);

    return (
        <div className="flex justify-center">
            {Letters.map((letter, index) => {
                if (letter === ' ') return '\u00A0';
                else
                    return (
                        <MovingComponent type="blur" duration="800ms" delay={`${index * 100}ms`} direction="reverse" timing="ease" iteration="1" fillMode="backwards">
                            {letter}
                        </MovingComponent>
                    );
            })}
        </div>
    );
};

function Landing() {
    return (
        <div className="relative h-screen">
            <Head>
                <title>KU HACKATHON</title>
            </Head>
            <Header />
            <main>
                <div className="mt-[14rem]">
                    <div className="flex justify-center">
                        <img className="" src="/title.svg" alt="title" />
                    </div>
                </div>

                <div className="mt-4 center">
                    <img className="w-12 z-0 mx-auto" src="/symbol-2d.svg" alt="symbol-2d" />
                    <h4 className="text-center font-semibold z-10 opacity-70 text-animation">KU HACKATHON</h4>
                    <div className="text-center z-10 opacity-70">
                        <MyAnime />
                    </div>
                </div>
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

export default Landing;
