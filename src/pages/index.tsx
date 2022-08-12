import type { NextPage } from 'next';
import Head from 'next/head';
import { CustomNextPage } from '../types/types';
import Landing from './landing';
import { axiosInstance } from '../hooks/queries';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';

const Home: CustomNextPage = () => {
    //loginUserData = 로그인 된 유저의 데이터
    const [loginUserData, setLoginUserData] = useRecoilState(loginRecoilState);

    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserData({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + response.data.name.last },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserData({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getSessionUser();
    }, []);

    return (
        <div>
            <Landing />
        </div>
    );
};

export default Home;
