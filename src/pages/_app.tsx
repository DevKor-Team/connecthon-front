import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/Layout';

function HACKATHON({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default HACKATHON;
