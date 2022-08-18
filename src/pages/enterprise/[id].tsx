import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { Company } from '../../interfaces/company';

function Enterprise() {
    const router = useRouter();
    const { id } = router.query;
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        async function fetchCompany() {
            try {
                await axiosInstance.get(`/companies/${id}`).then(res => setCompany(res.data.data));
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
                    <h1 className="text-[1.35rem] leading-[1.55rem] md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">안녕하세요, {`${company?.alias}입니다!`}</h1>
                    <h1 className="text-[1.35rem] leading-[1.55rem] md:leading-[2.813rem] md:text-[2.125rem] font-extrabold">우수한 인재도 발굴해보세요!</h1>
                </section>
                <section className="flex flex-col justify-center items-start mb-12 md:mb-8">
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">입력하신 정보는 본 사이트 랜딩페이지에서 기업 로고 클릭 시</p>
                    <p className="text-sm md:leading-[1.438rem] md:text-[0.938rem] text-ourGrey font-medium">해당 정보가 가공된 페이지로 이동되어 보여집니다. </p>
                </section>
            </div>
        </main>
    );
}

export default Enterprise;
