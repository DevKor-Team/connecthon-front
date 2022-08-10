import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

function HACKATHON({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}

export default HACKATHON;
