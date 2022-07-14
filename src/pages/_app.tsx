import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import { Fragment } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

function HACKATHON({ Component, pageProps }: AppProps) {
    const page = Component as CustomNextPage;
    const Layout = page.Layout ?? Fragment;
    return (
        <Layout>
            <ParallaxProvider scrollAxis="vertical">
                <Component {...pageProps} />
            </ParallaxProvider>
        </Layout>
    );
}

export default HACKATHON;
