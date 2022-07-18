import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Head>
                <title>KU HACKATHON</title>
                <link rel="icon" href="/symbol-2d.svg" />
            </Head>
            <Header />
            <div className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
