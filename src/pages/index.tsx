import type { NextPage } from 'next';
import Header from '../components/Header';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';

const Home: CustomNextPage = () => {
    return (
        <div>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol.ico" />
            </Head>
            <Header />
        </div>
    );
};

Home.Layout = Layout;
export default Home;
