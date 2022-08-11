import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { ReactElement } from 'react';
import { NextPage } from 'next';

interface Props {
    children: ReactElement;
}

const Layout: NextPage<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol-2d.svg" />
            </Head>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
