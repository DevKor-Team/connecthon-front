import { useState } from 'react';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';
import Link from 'next/link';

export const Personal = () => {
    const [onMail, setOnMail] = useState<boolean>(false);
    const [onInstagram, setOnInstagram] = useState<boolean>(false);
    const [onGithub, setOnGithub] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('asj0816@korea.ac.kr');
    return (
        <article className="absolute top-[-9%] rounded-[1.25rem] w-[80%] h-[85vh] bg-ourWhite drop-shadow-lg p-[1rem] max-w-[20rem] z-10">
            <div className="border-b-2 flex flex-col items-center">
                <img src="/soojin.png" alt="soojin" className="rounded-full w-[10rem] h-[10rem]" />
                <h5 className="text-[#F6CC00] mt-5">DEVELOPER</h5>
                <h4 className="font-bold text-[1.75rem] mt-2">안수진</h4>
                <p className="mt-4 mb-2">TEAM DEVKOR</p>
            </div>
            <div className="mt-5 px-[1rem]">
                <h4 className="font-semibold mb-1">한 줄 소개</h4>
                <p>내가 생각한 프로젝트를 현실로!</p>
            </div>
            <div className="mt-5 px-[1rem]">
                <h4 className="font-semibold mb-1">학력</h4>
                <p>고려대학교 국제학부</p>
            </div>
            <div className="mt-5 px-[1rem]">
                <h4 className="font-semibold mb-1">경력</h4>
                <p>2022 KU HACKATHON Semifinalist</p>
                <p>Corca ML Engineer</p>
                <p>2022 Head of DevKor</p>
            </div>
            <div className="mt-5 pb-8">
                <h4 className="font-semibold mb-2 px-[1rem]">SNS</h4>
                <div className="flex">
                    <div className="relative">
                        <FiMail
                            className="text-2xl mr-3 ml-[1rem] cursor-pointer"
                            onMouseOver={() => {
                                setOnMail(true);
                            }}
                            onMouseOut={() => {
                                setOnMail(false);
                            }}
                        />

                        {onMail ? <img src="mail-text.svg" alt="mail-text" className="absolute left-1 w-[3rem] drop-shadow-lg" /> : null}
                    </div>

                    <div>
                        <Link href="https://www.instagram.com/10issoojin_/">
                            <a>
                                <FiInstagram
                                    className="text-2xl mr-3 cursor-pointer"
                                    onMouseOver={() => {
                                        setOnInstagram(true);
                                    }}
                                    onMouseOut={() => {
                                        setOnInstagram(false);
                                    }}
                                />
                            </a>
                        </Link>

                        {onInstagram ? <img src="instagram-text.svg" alt="mail-text" className="absolute left-[2.5rem] drop-shadow-lg" /> : null}
                    </div>
                    <div>
                        <Link href="https://github.com/aiccuracy">
                            <a>
                                <FiGithub
                                    className="text-2xl mr-3 cursor-pointer"
                                    onMouseOver={() => {
                                        setOnGithub(true);
                                    }}
                                    onMouseOut={() => {
                                        setOnGithub(false);
                                    }}
                                />
                            </a>
                        </Link>

                        {onGithub ? <img src="github-text.svg" alt="github-text" className="absolute left-[5.5rem] drop-shadow-lg" /> : null}
                    </div>
                </div>
            </div>
            <div className="mx-[1rem] border-t-2">
                <h4 className="font-extralight text-sm mb-3 mt-5">Participant in the 2022 KU Hackathon.</h4>
            </div>
        </article>
    );
};
