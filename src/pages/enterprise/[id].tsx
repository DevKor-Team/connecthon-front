import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { Company } from '../../interfaces/company';

function Enterprise() {
    const router = useRouter();
    const { id } = router.query;
    const [company, setCompany] = useState<Company>();
    const [careers, setCareers] = useState<string[]>([]);

    function handleLinkClick() {
        if (company?.profile?.link?.instagram) {
            window.open(company?.profile?.link?.instagram, '_blank');
        } else {
            alert('해당 기업의 입력된 대표 사이트가 없습니다.');
        }
    }

    useEffect(() => {
        async function fetchCompany() {
            try {
                await axiosInstance.get(`/companies/${id}`).then(res => {
                    setCompany(res.data.data);
                    setCareers(res.data.data.profile.career);
                });
            } catch (e) {
                console.log(e);
            }
        }

        fetchCompany();
    }, []);

    return (
        <main className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem] bg-white md:bg-ourWhite mb-8 md:mb-0">
            <div className="w-full pt-[6rem] md:py-[8rem] min-h-[100vh] h-auto">
                <section className="flex flex-col justify-center items-start mb-3 md:mb-5">
                    <h1 className="text-[1.35rem] leading-[1.55rem] sm:leading-[2.813rem] sm:text-[2.125rem] font-extrabold">안녕하세요, {`${company?.name}입니다!`}</h1>
                    <h1 className="text-[1.35rem] leading-[1.55rem] sm:leading-[2.813rem] sm:text-[2.125rem] font-extrabold">만나서 반가워요!</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-12 md:mb-8">
                    <p className="text-sm sm:leading-[1.438rem] sm:text-[0.938rem] text-ourGrey font-medium">저희 기업의 문화, 함께 하고픈 사람, 현재 채용 고려중인</p>
                    <p className="text-sm sm:leading-[1.438rem] sm:text-[0.938rem] text-ourGrey font-medium">포지션들까지 간단하게 보고 가세요. </p>
                </section>
                <div className="w-full flex flex-col space-y-[3rem] lg:flex-row lg:space-y-0 items-center">
                    <section className="w-full lg:min-w-[23rem] lg:w-[23rem] h-[22rem] md:h-[33rem] flex flex-col justify-center items-center space-y-[0.5rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] lg:drop-shadow-[0px_0px_15px_rgba(32,135,255,0.15)] z-20">
                        <div className="w-[11rem] h-[11rem] lg:w-[15rem] lg:h-[15rem]">
                            <img className="w-[11rem] h-[11rem] lg:w-[15rem] lg:h-[15rem] rounded-xl" src={`${company?.logo}`} />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <span className="rounded-md w-[15rem] mt-2 p-1.5 text-center text-2xl font-bold">{company?.name}</span>
                            <a
                                className="rounded-md w-[15rem] mt-2 mb-6 p-2 text-center bg-ourBlue hover:bg-blue-700 cursor-pointer text-white flex items-center justify-center space-x-2"
                                onClick={handleLinkClick}
                                target="_blank"
                            >
                                <span className="text-white flex justify-center items-center">Visit Website</span>
                            </a>
                        </div>
                    </section>
                    <section className="w-full relative min-h-[33rem] h-auto pl-10 pr-10 py-10 md:pr-0 md:pl-0 lg:px-10 xl:px-16 md:py-10 flex flex-col justify-center md:items-center xl:items-start space-y-[2rem] bg-white rounded-2xl drop-shadow-[0px_0px_12px_rgba(32,135,255,0.1)] ">
                        <div className="flex flex-col xl:w-full">
                            <h4 className="font-bold text-lg sm:text-xl">✏️한 줄 소개</h4>
                            <span className="border-2 rounded-md md:w-[31.25rem] xl:w-full min-h-[2.5rem] h-auto mt-2 p-1.5">{company?.profile?.introduction || '-'}</span>
                        </div>
                        <div className="flex flex-col xl:w-full">
                            <h4 className="font-bold text-lg sm:text-xl break-words">💡저희는 다음과 같은 포지션을 찾고 있어요!</h4>
                            <div className="flex flex-col space-y-3 md:flex-row md:space-x-1 md:items-center md:space-y-0 mt-2">
                                <span className="border-2 rounded-md w-full md:w-[15rem] xl:w-[50%] h-[2.5rem] p-1.5 mr-[1rem]">{company?.profile?.university || '-'}</span>
                                <span className="border-2 rounded-md w-full md:w-[15rem] xl:w-[50%] h-[2.5rem] p-1.5 mr-[1rem]">{company?.profile?.major || '-'}</span>
                            </div>
                        </div>
                        <div className="flex flex-col xl:w-full">
                            <h4 className="font-bold text-lg sm:text-xl mb-2 break-words">🎈저희는 이러한 분들과 함께 하고 싶어요!</h4>
                            <div className="flex flex-col space-y-3 items-start h-auto xl:w-full">
                                {careers.map(crr => (
                                    <span className="border-2 rounded-md w-full md:w-[31.25rem] h-[2.5rem] p-1.5 xl:w-full">{crr}</span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Enterprise;
