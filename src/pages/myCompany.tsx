import { axiosInstance } from '../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function myCompany() {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        alert('기업 계정만 접근 가능한 페이지입니다.');
                        router.back();
                    } else if (response.data.type == 'company') {
                        setLoginUserState({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                alert('로그인이 필요한 서비스입니다.');
                router.push('/login');
            }
        };

        getSessionUser();
    }, []);

    if (loginUserState.isLogin == false) {
        return null;
    }

    return <main className="md:px-16 lg:px-20 xl:px-[13.375rem]">영역</main>;
}

export default myCompany;
