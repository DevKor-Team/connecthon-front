import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import { Fragment } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { RecoilRoot } from 'recoil';

function HACKATHON({ Component, pageProps }: AppProps) {
    const page = Component as CustomNextPage;
    const Layout = page.Layout ?? Fragment;
    return (
        <RecoilRoot>
            <Layout>
                <ParallaxProvider scrollAxis="vertical">
                    <Component {...pageProps} />
                </ParallaxProvider>
            </Layout>
        </RecoilRoot>
    );
}

export default HACKATHON;
