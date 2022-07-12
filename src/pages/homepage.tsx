import { CustomNextPage } from '../types/types';
import Layout from '../layouts/Layout';
import Head from 'next/head';
import Header from '../components/Header';

const schedule = [
    {
        title: '8.13(토)',
        content: '사전교육',
    },
    {
        title: '8.19(금) ~ 8.21(일)',
        content: '본행사',
    },
    {
        title: '8.27(토)',
        content: '네트워킹',
    },
    {
        title: '참가대상',
        content: '전국 대학생',
    },
    {
        title: '참가인원',
        content: '100명(총 20팀)',
    },
];

function HomeTitle() {
    return (
        <div className="w-full h-[calc(100vh-4rem)] mt-16 bg-center bg-contain lg:bg-[length:90%_90%] bg-no-repeat bg-[length:w-full_h-ful] bg-[url('/home-background.svg')] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-4">
                <div className="flex flex-col justify-between items-center tracking-widest mb-10">
                    <h1 className="font-impact text-4xl sm:text-5xl lg:text-[5.25rem] mb-2 sm:mb-4">2022</h1>
                    <h1 className="font-impact text-4xl sm:text-5xl lg:text-[5.25rem]">KU HACKATHON</h1>
                </div>
                <h2 className="text-xl sm:text-3xl lg:text-[2.625rem] font-extrabold mb-6">청춘들의 여름 항해</h2>
                <div className="flex flex-col justify-between items-center font-medium">
                    <p className="text-xl tracking-tight leading-7">개발자, 기획자, 디자이너 간의 협업을 통해</p>
                    <p className="text-xl tracking-tight leading-7">보다 상품성 있고, 완성도 높은 서비스를 직접 개발해 보는 경험</p>
                </div>
            </div>
        </div>
    );
}

function HomeSchedule() {
    return (
        <div className="w-full h-[calc(100vh-4rem)] mt-16 px-16 flex items-center justify-start w-full">
            <main className="flex flex-col justify-center items-start w-full">
                <section className="flex flex-col justify-center items-start mb-8">
                    <h1 className="text-[2.125rem] font-extrabold mb-6">내가 원하는, 상상한 프로젝트를</h1>
                    <h1 className="text-[2.125rem] font-extrabold">직접 만들어 보고 싶나요?</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-16">
                    <p className="text-[0.938rem] text-ourGrey font-medium">여러 대학생들이 모여 새로운 관점으로 현실 문제를 해결하고 다양한 기술을</p>
                    <p className="text-[0.938rem] text-ourGrey font-medium">접목시켜 서비스를 개발하는 경험을 제공합니다.</p>
                </section>
                <section className="grid grid-rows-5 w-full">
                    {schedule.map(item => (
                        <div className="grid grid-cols-10 mb-6 pb-6 border-b border-gray-200">
                            <div className="col-span-2 text-ourBlue font-bold" key={item.title}>
                                {item.title}
                            </div>
                            <div className="col-span-8 text-ourBlack font-bold" key={item.title}>
                                {item.content}
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

const Homepage: CustomNextPage = () => {
    return (
        <div className="relative h-full">
            <main className="px-4 lg:px-[9.375rem]">
                <HomeTitle />
                <HomeSchedule />
            </main>
        </div>
    );
};

Homepage.Layout = Layout;
export default Homepage;
