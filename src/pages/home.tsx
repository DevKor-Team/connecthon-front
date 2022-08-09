import { CustomNextPage } from '../types/types';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';
import MainProjectCard from '../components/MainProjectCard';
import HomeButton from '../components/HomeButton';

const schedule = [
    {
        order: '1',
        title: '8.13(토)',
        content: '사전교육',
    },
    {
        order: '2',
        title: '8.19(금) ~ 8.21(일)',
        content: '본행사',
    },
    {
        order: '3',
        title: '8.27(토)',
        content: '네트워킹',
    },
    {
        order: '4',
        title: '참가대상',
        content: '전국 대학생',
    },
    {
        order: '5',
        title: '참가인원',
        content: '100명(총 20팀)',
    },
];

const projects = [
    {
        id: 1,
        title: 'KU Project - Hackathon',
        team: 'Team : KU HACKATHON',
    },
    {
        id: 2,
        title: 'KU Project - Hackathon',
        team: 'Team : KU HACKATHON',
    },
    {
        id: 3,
        title: 'KU Project - Hackathon',
        team: 'Team : KU HACKATHON',
    },
];

function HomeTitle({ firstScroll }: { firstScroll: boolean }) {
    return (
        <div
            className={`w-full h-64 md:h-[calc(100vh-4rem)] transition-all ease-linear ${
                firstScroll ? 'mt-24' : 'mt-32'
            } md:mt-16 bg-center bg-contain lg:bg-[length:90%_90%] bg-no-repeat bg-[url('/home-background.svg')] flex items-center justify-center`}
            id="hometitle"
        >
            <div className="w-full flex flex-col items-start md:items-center justify-center">
                <div className="flex flex-col justify-between items-start md:items-center tracking-widest mb-4 mt-4 md:mt-0 md:mb-10">
                    <h1 className={`font-impact transition-all ease-linear ${firstScroll ? 'text-5xl' : 'text-6xl'} tracking-tighter lg:tracking-normal md:text-[5rem] mb-2 sm:mb-4`}>2022</h1>
                    <h1 className={`font-impact transition-all ease-linear ${firstScroll ? 'text-5xl' : 'text-6xl'} tracking-tighter lg:tracking-normal md:text-[5rem]`}>KU HACKATHON</h1>
                </div>
                <h2 className={`transition-all ease-linear ${firstScroll ? 'text-2xl' : 'text-[1.75rem]'} md:text-[2.125rem] font-extrabold mb-5 md:mb-6`}>청춘들의 여름 항해</h2>
                <div className="flex flex-col justify-between items-start md:items-center font-medium">
                    <p className={`transition-all ease-linear ${firstScroll ? 'text-xs' : 'text-sm'} md:text-[1.313rem] tracking-tight md:leading-7`}>개발자, 기획자, 디자이너 간의 협업을 통해</p>
                    <p className={`transition-all ease-linear ${firstScroll ? 'text-xs' : 'text-sm'} md:text-[1.313rem] tracking-tight md:leading-7`}>
                        보다 상품성 있고, 완성도 높은 서비스를 직접 개발해 보는 경험
                    </p>
                </div>
            </div>
        </div>
    );
}

function Information() {
    return (
        <div className="md:h-[calc(100vh-4rem)] mt-40 md:mt-16 flex items-center justify-start w-full" id="information">
            <main className="flex flex-col justify-center items-start w-full">
                <section className="flex flex-col justify-center items-start mb-3 md:mb-8">
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">내가 원하는, 상상한 프로젝트를</h1>
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">직접 만들어 보고 싶나요?</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-24 md:mb-16">
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">여러 대학생들이 모여 새로운 관점으로 현실 문제를 해결하고</p>
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">다양한 기술을 접목시켜 하나의 서비스를 개발하는 경험을 제공합니다.</p>
                </section>
                <section className="grid grid-rows-5 w-full">
                    {schedule.map(item => (
                        <div className="grid grid-cols-10 mb-4 pb-4 md:mb-6 md:pb-6 border-b border-gray-200" key={item.order}>
                            <div className="text-sm md:text-[1.125rem] col-span-6 xl:col-span-3 text-ourBlue font-bold" key={item.title + item.order}>
                                {item.title}
                            </div>
                            <div className="text-sm md:text-[1.125rem] col-span-4 xl:col-span-7 text-right md:text-left text-ourBlack font-bold" key={item.content + item.order}>
                                {item.content}
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

function Merit() {
    const shadowStyle = 'shadow-[0px_0px_10px_2px_rgba(32,135,255,0.4)] md:shadow-[0px_0px_16px_6px_rgba(32,135,255,0.4)]';

    let hometitle_height: number, information_height: number, startpoint: number, secondpoint: number;
    let firstLinePoint: number, secondLinePoint: number;
    (startpoint = 0), (secondpoint = 0), (firstLinePoint = 0), (secondLinePoint = 0);

    function getHeights() {
        if (typeof window !== 'undefined') {
            const hometitle = document.getElementById('hometitle') as HTMLDivElement;
            if (hometitle === null) return;

            hometitle_height = hometitle?.offsetHeight;
            hometitle_height += parseInt(window.getComputedStyle(hometitle).marginTop);

            const information = document.getElementById('information') as HTMLDivElement;
            information_height = information?.offsetHeight;
            information_height += parseInt(window.getComputedStyle(information).marginTop);

            startpoint = hometitle_height + information_height * 0.8;
            secondpoint = hometitle_height + information_height * 1.1;

            firstLinePoint = hometitle_height + information_height * 0.6;
            secondLinePoint = hometitle_height + information_height * 0.9;
        }

        return startpoint;
    }

    getHeights();

    const [firstShadow, setFirstShadow] = useState(true);
    const [secondShadow, setSecondShadow] = useState(false);
    const [thirdShadow, setThirdShadow] = useState(false);

    const [firstLine, setFirstLine] = useState(false);
    const [secondLine, setSecondLine] = useState(false);
    useEffect(() => {
        function updateOffset() {
            if (typeof window !== 'undefined') {
                if (window.pageYOffset < startpoint) {
                    setFirstShadow(true);
                    setSecondShadow(false);
                    setThirdShadow(false);
                } else if (window.pageYOffset >= startpoint && window.pageYOffset < secondpoint) {
                    setFirstShadow(false);
                    setSecondShadow(true);
                    setThirdShadow(false);
                } else {
                    setFirstShadow(false);
                    setSecondShadow(false);
                    setThirdShadow(true);
                }

                if (window.pageYOffset < firstLinePoint) {
                    setFirstLine(false);
                    setSecondLine(false);
                }
                if (window.pageYOffset >= firstLinePoint) {
                    setFirstLine(true);
                    setSecondLine(false);
                }
                if (window.pageYOffset >= secondLinePoint) {
                    setSecondLine(true);
                }
            }
        }

        window.addEventListener('scroll', updateOffset);
    }, [firstShadow, secondShadow, thirdShadow]);

    return (
        <div className="w-full mt-40 md:mt-16 flex items-center justify-start w-full">
            <main className="flex flex-col justify-center items-start w-full">
                <section className="flex flex-col justify-center items-start mb-3 md:mb-8">
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">새로운 사람과 새로운 도전을 통해</h1>
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">자신이 성장하는 경험을 해보세요</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-32 hidden md:block" id="pc-ver">
                    <p className="text-[0.938rem] text-ourGrey font-medium">자신의 아이디어를 구현하는 기회뿐만이 아니라, 나아가 함께 성장할 수 있는 기회를</p>
                    <p className="text-[0.938rem] text-ourGrey font-medium">본 해커톤을 통해 제공하고자 합니다.</p>
                </section>
                <section className="flex flex-col justify-center items-start mb-24 md:hidden" id="mobile-ver">
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">자신의 아이디어를 구현하는 기회뿐만이 아니라,</p>
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">나아가 함께 성장할 수 있는 기회를 본 해커톤을 통해 제공하고자 합니다.</p>
                </section>

                {/* 타임라인 섹션 */}
                <section className="w-full pr-6 pl-2">
                    {/* 첫번째 블록 */}
                    <div className="relative flex justify-start items-start space-x-4 md:space-x-8 h-16 mb-20 md:mb-44 before:content-[' '] before:rounded-full before:h-16 before:w-0.5 md:before:w-1 before:absolute before:bottom-16 before:left-[0.563rem] md:before:left-3 before:bg-ourBlue before:bg-opacity-20">
                        <div
                            className={`transition-all w-5 h-5 md:w-7 md:h-7 flex justify-center items-center rounded-full border-2 border-ourBlue border-opacity-30 bg-white ${
                                firstShadow ? shadowStyle : ''
                            }`}
                        >
                            <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-ourBlue"></div>
                        </div>
                        <div
                            className={`${
                                firstLine ? 'h-36 md:h-60' : 'h-0'
                            } transition-all ease-in duration-400 w-0.5 md:w-1 absolute -bottom-30 -left-[0.438rem] md:-left-5 bg-ourBlue bg-opacity-20`}
                        >
                            {' '}
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h2 className="text-xl leading-5 font-extrabold mb-3">협업 경험의 기회 제공</h2>
                            <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium w-[17.75rem] sm:w-[24rem] md:w-[27.5rem] whitespace-normal">
                                열정있는 개발자, 기획자, 디자이너 간의 협업을 통해 완성도 높은 서비스를 직접 개발하는 특별한 경험을 제공합니다.
                            </p>
                        </div>
                    </div>

                    {/* 두번째 블록 */}
                    <div
                        className={`${
                            secondShadow || thirdShadow ? 'opacity-100' : 'opacity-0'
                        } transition-all ease-in duration-600 relative flex justify-start items-start space-x-4 md:space-x-8 h-16 mb-20 md:mb-44`}
                    >
                        <div className={`w-5 h-5 md:w-7 md:h-7 flex justify-center items-center rounded-full border-2 border-ourBlue border-opacity-30 bg-white ${secondShadow ? shadowStyle : ''}`}>
                            <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-ourBlue"></div>
                        </div>
                        <div
                            className={`${
                                secondLine ? 'h-36 md:h-60' : 'h-0'
                            } transition-all ease-in duration-400 w-0.5 md:w-1 absolute -bottom-30 -left-[0.438rem] md:-left-5 bg-ourBlue bg-opacity-20`}
                        >
                            {' '}
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h2 className="text-xl leading-5 font-extrabold mb-3">약 20개의 데모 서비스</h2>
                            <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium w-[17.75rem] sm:w-[24rem] md:w-[27.5rem] whitespace-normal">
                                본 해커톤이 종료된 이후에도 개발한 서비스를 발전시켜 실제 서비스로 탄생시킬 수 있도록 데모 서비스를 제공합니다.
                            </p>
                        </div>
                    </div>

                    {/* 세번째 블록 */}
                    <div
                        className={`${
                            thirdShadow ? 'opacity-100' : 'opacity-0'
                        } transition-all ease-in duration-600 relative flex justify-start items-start space-x-4 md:space-x-8 h-16 mb-20 md:mb-44`}
                    >
                        <div className={`w-5 h-5 md:w-7 md:h-7 flex justify-center items-center rounded-full border-2 border-ourBlue border-opacity-30 bg-white ${thirdShadow ? shadowStyle : ''}`}>
                            <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-ourBlue"></div>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h2 className="text-xl leading-5 font-extrabold mb-3">다양한 직군과의 지속적 네트워킹</h2>
                            <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium w-[17.75rem] sm:w-[24rem] md:w-[27.5rem] whitespace-normal">
                                서비스 개발 이후에도 세 직군이 지속적으로 네트워크하며 동반성장하세요. 성장을 경험하고 나누고자 하는 사람들이 모여 성장해나갑니다.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function MainProject() {
    return (
        <div className="w-full md:h-[calc(100vh-4rem)] mt-36 md:mt-16 flex items-center justify-start w-full">
            <main className="flex flex-col justify-center items-start w-full">
                {/* 섹션 제목, 부제목 영역 */}
                <section className="flex flex-col justify-center items-start mb-3 md:mb-8">
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">상상했던 프로젝트를 현실으로,</h1>
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">당신도 도전해 보세요</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-16">
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">우수한 프로젝트들입니다. 당신도 기획자, 개발자, 디자이너의 역할로</p>
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">해커톤에 참여하여 멋진 프로젝트를 만들어보세요.</p>
                </section>

                {/* 프로젝트 리스트 영역 */}
                <section className="w-full flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-6 xl:space-x-14 mb-10">
                    {projects.map(prj => (
                        <MainProjectCard key={prj.id} title={prj.title} team={prj.team} />
                    ))}
                </section>
            </main>
        </div>
    );
}

function BottomBanner() {
    return (
        <>
            {/* 모바일 배너 */}
            <div className="w-full mt-24 mb-16 rounded-xl p-5 h-44 flex justify-center items-center bg-[url('/home-banner-mobile.svg')] bg-cover sm:hidden">
                <div className="flex flex-col items-center">
                    <section className="mb-5 flex flex-col items-center space-y-3">
                        <h1 className="text-ourWhite font-impact text-[1.688rem]">2022</h1>
                        <h1 className="text-ourWhite font-impact text-[1.688rem]">KU HACKATHON</h1>
                    </section>
                    <HomeButton className="w-40 h-9 text-sm">주관 소개 바로가기</HomeButton>
                </div>
            </div>

            {/* PC 배너 */}
            <div className="w-full hidden sm:block">
                <div className="w-full mt-40 mb-36 rounded-xl p-5 h-72 flex justify-center items-center bg-[url('/home-banner-pc.svg')] bg-cover">
                    <div className="flex flex-col items-center">
                        <section className="mb-10 flex flex-col items-center space-y-2">
                            <h1 className="text-ourWhite font-impact text-6xl">2022</h1>
                            <h1 className="text-ourWhite font-impact text-6xl">KU HACKATHON</h1>
                        </section>
                        <HomeButton className="w-60 h-12 text-base rounded-xl">주관 소개 바로가기</HomeButton>
                    </div>
                </div>
            </div>
        </>
    );
}

const Homepage: CustomNextPage = () => {
    const [firstScroll, setFirstScroll] = useState(false);

    useEffect(() => {
        function titleScroll() {
            let scrollY = window.pageYOffset;
            if (scrollY > 0) {
                setFirstScroll(true);
            } else setFirstScroll(false);
        }

        window.addEventListener('scroll', titleScroll);
    }, [firstScroll]);

    return (
        <div className="relative h-full">
            <main>
                <HomeTitle firstScroll={firstScroll} />
                <Information />
                <Merit />
                <MainProject />
                <BottomBanner />
            </main>
        </div>
    );
};

Homepage.Layout = Layout;
export default Homepage;
