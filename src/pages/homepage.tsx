import { CustomNextPage } from '../types/types';
import Layout from '../layouts/Layout';
import Head from 'next/head';
import Header from '../components/Header';

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

const Homepage: CustomNextPage = () => {
    return (
        <div className="relative h-full">
            <main className="px-4 lg:px-[9.375rem]">
                <HomeTitle />
            </main>
        </div>
    );
};

Homepage.Layout = Layout;
export default Homepage;
