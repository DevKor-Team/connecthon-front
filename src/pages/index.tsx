import type { NextPage } from 'next';
import Header from '../components/Header';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import Landing from './landing';

const Home: CustomNextPage = () => {
    return (
        <div>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol.ico" />
            </Head>
            <Header />
            <Landing />
        </div>
    );
};

Home.Layout = Layout;
export default Home;
