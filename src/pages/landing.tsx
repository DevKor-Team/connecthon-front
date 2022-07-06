import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';

function Landing() {
    return (
        <div className="relative h-screen">
            <Head>
                <title>KU HACKATHON</title>
            </Head>
            <Header />
            <main className="relative pl-4 pb-24 my-[10rem] lg:pl-16">
                <div className="flex">
                    <div>
                        <h1 className="homeTitle">2022</h1>
                        <h1 className="homeTitle">KU</h1>
                        <h1 className="homeTitle">HACKATHON</h1>
                    </div>
                    <div className="flex mx-0">
                        <img src="/symbol-conn3.png" className="w-[12rem] z-[100] md:w-[15rem] md:h-[30rem]" />
                        <img src="/symbol-conn2.png" className="w-[13rem] z-[100]" />

                        <img src="/symbol-conn1.png" className="w-[10rem] z-[100]" />
                    </div>
                </div>

                {/* <div>제목 & 로고</div> */}
                {/* <div>작은 로고 & 청춘</div> */}
                {/* <button>Get Started</button> */}
            </main>
        </div>
    );
}

export default Landing;
