import { axiosInstance } from '../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

function myCompany() {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    //useForm에 최종적으로 들어갈 오브젝트타입
    type FormValues = {
        name: string;
        email: string;
        team: string;
        github: string;
        blog: string;
        instagram: string;
        introduction: string;
        img: string;
        position: string;
        university: string;
        major: string;
        career: string[];
        teamName: string;
    };

    //react-hook-form
    const { control, register, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
    });

    // useEffect(() => {
    //     const getSessionUser = async () => {
    //         try {
    //             const response = await axiosInstance.get('/auth/user');
    //             if (response.status != 401) {
    //                 if (response.data.type == 'user') {
    //                     alert('기업 계정만 접근 가능한 페이지입니다.');
    //                     router.back();
    //                 } else if (response.data.type == 'company') {
    //                     setLoginUserState({
    //                         isLogin: true,
    //                         user: response.data,
    //                     });
    //                 }
    //             }
    //         } catch (err) {
    //             alert('로그인이 필요한 서비스입니다.');
    //             router.push('/login');
    //         }
    //     };

    //     getSessionUser();
    // }, []);

    // if (loginUserState.isLogin == false) {
    //     return null;
    // }

    return (
        <main className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem] bg-white md:bg-ourWhite mb-8 md:mb-0">
            <div className="w-full pt-[6rem] md:py-[8rem] min-h-[100vh] h-auto">
                <section className="flex flex-col justify-center items-start mb-3 md:mb-5">
                    <h1 className="text-[1.35rem] leading-[1.55rem] md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">참가자들에게 우리 기업을 홍보하고,</h1>
                    <h1 className="text-[1.35rem] leading-[1.55rem] md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">우수한 인재도 발굴해보세요!</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-12 md:mb-8">
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">입력하신 정보는 본 사이트 랜딩페이지에서 기업 로고를</p>
                    <p className="text-xs md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">클릭했을 시 모달창으로 보여집니다.</p>
                </section>
                <form>
                    <div className="w-full flex flex-col space-y-[3rem] md:flex-row md:space-y-0 items-center">
                        <section className="w-full md:min-w-[20rem] md:w-[20rem] h-[22rem] md:h-[33rem] flex flex-col justify-center items-center space-y-[3rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] md:drop-shadow-[0px_0px_18px_rgba(32,135,255,0.1)]">
                            <div className="w-[11rem] h-[11rem] md:w-[15rem] md:h-[15rem]">
                                <img className="w-[11rem] h-[11rem] md:w-[15rem] md:h-[15rem]" src="/profile-default.jpg" />
                            </div>
                            <input
                                {...register('name')}
                                type="text"
                                defaultValue={`${loginUserState.user?.name}`}
                                placeholder="노출될 기업명을 입력해주세요"
                                className="border-2 rounded-md w-[15rem] mt-2 mb-6 p-1.5"
                            />
                        </section>
                        <section className="w-full h-[33rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] md:filter-none"></section>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default myCompany;
