import { CustomNextPage } from '../types/types';
import Layout from '../layouts/Layout';
import { useEffect, useState } from 'react';

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

function HomeTitle({ firstScroll }: { firstScroll: boolean }) {
    return (
        <div
            className={`w-full h-64 md:h-[calc(100vh-4rem)] transition-all ease-linear ${
                firstScroll ? 'mt-24' : 'mt-32'
            } md:mt-16 bg-center bg-contain lg:bg-[length:90%_90%] bg-no-repeat bg-[url('/home-background.svg')] flex items-center justify-center`}
        >
            <div className="w-full flex flex-col items-start md:items-center justify-center md:p-4">
                <div className="flex flex-col justify-between items-start md:items-center tracking-widest mb-4 mt-4 md:mt-0 md:mb-10">
                    <h1 className={`font-impact transition-all ease-linear ${firstScroll ? 'text-5xl' : 'text-6xl'} tracking-tighter lg:tracking-normal lg:text-[5rem] mb-2 sm:mb-4`}>2022</h1>
                    <h1 className={`font-impact transition-all ease-linear ${firstScroll ? 'text-5xl' : 'text-6xl'} tracking-tighter lg:tracking-normal lg:text-[5rem]`}>KU HACKATHON</h1>
                </div>
                <h2 className={`transition-all ease-linear ${firstScroll ? 'text-2xl' : 'text-[1.75rem]'} lg:text-[2.125rem] font-extrabold mb-5 md:mb-6`}>청춘들의 여름 항해</h2>
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
        <div className="w-full md:h-[calc(100vh-4rem)] mt-24 md:mt-16 md:px-16 flex items-center justify-start w-full">
            <main className="flex flex-col justify-center items-start w-full">
                <section className="flex flex-col justify-center items-start mb-3 md:mb-8">
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">내가 원하는, 상상한 프로젝트를</h1>
                    <h1 className="text-2xl md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">직접 만들어 보고 싶나요?</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-24 md:mb-16">
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">여러 대학생들이 모여 새로운 관점으로 현실 문제를 해결하고</p>
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">다양한 기술을 접목시켜 서비스를 개발하는 경험을 제공합니다.</p>
                </section>
                <section className="grid grid-rows-5 w-full">
                    {schedule.map(item => (
                        <div className="grid grid-cols-10 mb-4 pb-4 md:mb-6 md:pb-6 border-b border-gray-200" key={item.order}>
                            <div className="text-sm md:text-[1.125rem] col-span-6 lg:col-span-2 text-ourBlue font-bold" key={item.title + item.order}>
                                {item.title}
                            </div>
                            <div className="text-sm md:text-[1.125rem] col-span-4 lg:col-span-8 text-right md:text-left text-ourBlack font-bold" key={item.content + item.order}>
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
    return (
        <div className="w-full h-[calc(100vh-4rem)] mt-16 px-16 flex items-center justify-start w-full">
            <main className="flex flex-col justify-center items-start w-full">
                <section className="flex flex-col justify-center items-start mb-8">
                    <h1 className="text-[2.125rem] font-extrabold mb-6">새로운 사람과 새로운 도전을 통해</h1>
                    <h1 className="text-[2.125rem] font-extrabold">자신이 성장하는 경험을 해보세요</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-8">
                    <p className="text-[0.938rem] text-ourGrey font-medium">자신의 아이디어를 구현하는 기회뿐만이 아니라, 나아가 함께 성장할 수 있는 기회를</p>
                    <p className="text-[0.938rem] text-ourGrey font-medium">본 해커톤을 통해 제공하고자 합니다.</p>
                </section>
            </main>
        </div>
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
            <main className="px-4 lg:px-[9.375rem]">
                <HomeTitle firstScroll={firstScroll} />
                <Information />
                <Merit />
            </main>
        </div>
    );
};

Homepage.Layout = Layout;
export default Homepage;
