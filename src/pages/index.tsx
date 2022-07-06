import type { NextPage } from 'next';
import Header from '../components/Header';
import Head from 'next/head';

const Home: NextPage = () => {
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

export default Home;
