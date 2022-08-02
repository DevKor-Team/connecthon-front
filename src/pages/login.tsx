import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import { GithubLoginBtn, GoogleLoginBtn, KakaoLoginBtn } from '../components/LoginButton';

const LoginPage: CustomNextPage = () => {
    return (
        <main className={`w-full h-[100vh] md:h-[calc(100vh-4rem)] md:mt-16 flex flex-col items-center justify-center`}>
            {/* 로그인페이지 상단 해커톤 대문 섹션 */}
            <section className="w-full h-3/5 flex flex-col items-center justify-center bg-center bg-contain lg:bg-[length:90%_90%] bg-no-repeat bg-[url('/home-background.svg')]">
                <div className="flex flex-col justify-between items-center tracking-widest mb-4 mt-4 md:mt-0 md:mb-10">
                    <h1 className={`font-impact tracking-tight lg:tracking-normal text-4xl sm:text-6xl lg:text-7xl sm:mb-2`}>2022</h1>
                    <h1 className={`font-impact tracking-tight lg:tracking-normal text-4xl sm:text-6xl lg:text-7xl`}>KU HACKATHON</h1>
                </div>
                <h2 className={`text-xl sm:text2xl lg:text-3xl font-extrabold mb-5 md:mb-6`}>청춘들의 여름 항해</h2>
            </section>

            {/* 소셜로그인 버튼 그룹 */}
            <section className="w-full h-2/5 flex flex-col items-center justify-center space-y-5 lg:pb-10">
                <div className="w-full flex flex-col items-center justify-center font-bold after:content-[' '] after:bg-gray-200 after:h-[2px] after:w-[20rem] after:rounded-full after:mt-3">
                    항해를 시작해 볼까요?
                </div>
                <div className="flex w-full flex-col items-center justify-center space-y-5">
                    <GithubLoginBtn />
                    <KakaoLoginBtn />
                    <GoogleLoginBtn />
                </div>
            </section>
        </main>
    );
};

LoginPage.Layout = Layout;
export default LoginPage;
