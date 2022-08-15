import React from 'react';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/Layout';
import { RecoilRoot } from 'recoil';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function HACKATHON({ Component, pageProps }: AppProps) {
    return (
        <>
            <RecoilRoot>
                <Layout>
                    <ParallaxProvider>
                        <Component {...pageProps} />
                    </ParallaxProvider>
                </Layout>
            </RecoilRoot>
        </>
    );
}
