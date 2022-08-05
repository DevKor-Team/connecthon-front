import type { NextPage } from 'next';
import Header from '../components/Header';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import Landing from './landing';
import { axiosInstance } from '../hooks/queries';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userRecoilState } from '../recoil/user';

const Home: CustomNextPage = () => {
    const [userData, setUserData] = useRecoilState(userRecoilState);

    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.data) {
                    setUserData({
                        isLogin: true,
                        user: response.data,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        getSessionUser();
    });

    // useEffect(() => {
    //     setUserData({
    //         isLogin: true,
    //         user: {
    //             id: 1,
    //             name: '안수진',
    //             email: 'asj0816@korea.ac.kr',
    //             image: '/soojin.png',
    //             position: 'developer',
    //             teamName: 'Tiger',
    //             profile: {
    //                 link: {
    //                     github: 'aiccuracy',
    //                     blog: 'www.hojins.life',
    //                     instagram: '@10issoojin_',
    //                 },
    //                 img: '/soojin.png',
    //                 introduction: '뎁코 화이팅',
    //                 university: '고려대학교',
    //                 major: '국제학부',
    //                 career: ['코르카 ML 엔지니어', 'DevKor 노예'],
    //             },
    //         },
    //     });
    // }, []);

    return (
        <div>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol.ico" />
            </Head>
            <Landing />
        </div>
    );
};

Home.Layout = Layout;
export default Home;
