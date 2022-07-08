import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/Layout';
import { CustomNextPage } from '../types/types';
import { Fragment } from 'react';

function HACKATHON({ Component, pageProps }: AppProps) {
    const page = Component as CustomNextPage;
    const Layout = page.Layout ?? Fragment;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default HACKATHON;
