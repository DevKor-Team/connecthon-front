import { axiosInstance } from '../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

function myCompany() {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    //경력(career) 관련
    const [numCareerInput, setNumCareerInput] = useState<number>(1);

    //useForm에 최종적으로 들어갈 오브젝트타입
    type FormValues = {
        name: string;
        github: string;
        blog: string;
        instagram: string;
        introduction: string;
        university: string;
        major: string;
        career: string[];
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
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">입력하신 정보는 본 사이트 랜딩페이지에서 기업 로고를</p>
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">클릭했을 시 모달창으로 보여집니다.</p>
                </section>
                <form>
                    <div className="w-full flex flex-col space-y-[3rem] md:flex-row md:space-y-0 items-center">
                        <section className="w-full lg:min-w-[23rem] md:w-[23rem] h-[22rem] md:h-[33rem] flex flex-col justify-center items-center space-y-[3rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] md:drop-shadow-[0px_0px_15px_rgba(32,135,255,0.15)]">
                            <div className="w-[11rem] h-[11rem] lg:w-[15rem] lg:h-[15rem]">
                                <img className="w-[11rem] h-[11rem] lg:w-[15rem] lg:h-[15rem]" src="/profile-default.jpg" />
                            </div>
                            <input
                                {...register('name')}
                                type="text"
                                defaultValue={`${loginUserState.user?.name}`}
                                placeholder="노출될 기업명을 입력해주세요"
                                className="border-2 rounded-md w-[15rem] mt-2 mb-6 p-1.5"
                            />
                        </section>
                        <section className="w-full h-[33rem] p-10 md:px-16 md:py-10 flex flex-col space-y-[2rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] md:filter-none">
                            <div className="flex flex-col">
                                <label htmlFor="introduction" className="font-bold text-lg">
                                    한 줄 소개
                                </label>
                                <input
                                    {...register('introduction')}
                                    type="text"
                                    placeholder="기업을 한 줄로 소개해주세요!"
                                    defaultValue={loginUserState.user?.profile?.introduction}
                                    className="border-2 rounded-md md:w-[31.25rem] mt-2 p-1.5"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="recruiting" className="font-bold text-lg">
                                    채용중인 포지션 (최대 2개)
                                </label>
                                <div className="flex flex-col space-y-3 md:flex-row md:space-x-1 md:items-center md:space-y-0 mt-2">
                                    <input
                                        {...register('university')}
                                        type="text"
                                        placeholder="포지션을 입력해주세요!"
                                        defaultValue={loginUserState.user?.profile?.university}
                                        className="border-2 rounded-md md:w-[15rem] h-[2.5rem] p-1.5 mr-[1rem]"
                                    />
                                    <input
                                        {...register('major')}
                                        type="text"
                                        placeholder="포지션을 입력해주세요!"
                                        defaultValue={loginUserState.user?.profile?.major}
                                        className="border-2 rounded-md md:w-[15rem] h-[2.5rem] p-1.5 mr-[1rem]"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="rightppl" className="font-bold text-lg">
                                    추구하는 인재상 (최대 3개)
                                </label>
                                <input
                                    {...register('career')}
                                    type="text"
                                    placeholder="추구하는 인재상을 입력해주세요!"
                                    defaultValue={loginUserState.user?.profile?.introduction}
                                    className="border-2 rounded-md md:w-[31.25rem] mt-2 p-1.5"
                                />
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default myCompany;
