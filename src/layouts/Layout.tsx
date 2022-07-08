import Head from 'next/head';
import Header from '../components/Header';

const Layout: React.FC = () => {
    return (
        <div>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol-2d.svg" />
            </Head>
            <Header />
        </div>
    );
};

export default Layout;
