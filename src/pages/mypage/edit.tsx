import Layout from '../../layouts/Layout';
import React, { useEffect, useState } from 'react';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';
import Link from 'next/link';

interface PhotoParams {
    image: Blob[];
}

const Edit = () => {
    const [userImage, setUserImage] = useState<string>();
    const [projectImage, setProjectImage] = useState<string>();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        if (event.target.files) {
            const fileLoaded = URL.createObjectURL(event.target.files[0]);
            setUserImage(fileLoaded);
        } else {
            return;
        }
    };

    // const handleProjectChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
    //     if (event.target.files) {
    //         const fileLoaded = URL.createObjectURL(event.target.files[0]);
    //         console.log(`file loaded : ${fileLoaded}`);
    //         setProjectImage(fileLoaded);
    //     } else {
    //         return;
    //     }
    // };

    return (
        <div className="bg-ourWhite">
            <div className="mt-[10rem]">
                <form className="flex" action="" method="post">
                    <div className="flex justify-center items-center flex-col bg-[#FFFFFF] drop-shadow-2xl z-10 rounded-md w-[35%]">
                        {userImage ? <img src={userImage} alt="userImage" /> : <img src="/dragdrop.svg" alt="dragdrop" />}

                        <input type="file" id="imageUpload" className="mt-3 hidden" accept="image/*" onChange={handleChange} />

                        <label htmlFor="imageUpload" className="cursor-pointer mt-10">
                            Browse
                        </label>
                    </div>
                    <div className="flex flex-col drop-shadow-md bg-[#FFFFFF] w-[80%] px-[4rem] h-[20rem] py-7 rounded-md">
                        <label htmlFor="name">이름</label>
                        <input type="text" placeholder="안수진" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                        <label htmlFor="position">직책</label>
                        <input type="text" placeholder="designer" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                        <label htmlFor="teamName">소속 팀</label>
                        <input type="text" placeholder="ex.Team DEVKOR" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                    </div>
                </form>
                <form action="" method="post" className="flex flex-col mt-[4rem] mb-[2rem] py-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-md">
                    <label htmlFor="teamIntro" className="opacity-50 px-[1rem]">
                        한 줄 소개
                    </label>
                    <input type="text" placeholder="우리는 고대!" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1 mx-[1rem]" />
                    <label htmlFor="univ" className="opacity-50 mx-[1rem]">
                        학력
                    </label>
                    <div>
                        <input type="text" placeholder="고려대학교" className="border-2 rounded-md w-[30%] mt-2 mb-6 p-1 mr-7 mx-[1rem]" />
                        <input type="text" placeholder="디자인조형학부" className="border-2 rounded-md w-[30%] mt-2 mb-6 p-1" />
                    </div>
                    <label htmlFor="career" className="opacity-50 mx-[1rem]">
                        경력
                    </label>
                    <div>
                        <input type="text" placeholder="2021" className="border-2 rounded-md w-[25%] mt-2 mb-6 p-1 mr-3 mx-[1rem]" />
                        <input type="text" placeholder="Corca Inc." className="border-2 rounded-md w-[25%] mt-2 mb-6 p-1 mr-3" />
                        <input type="text" placeholder="ML Engineer" className="border-2 rounded-md w-[25%] mt-2 mb-6 p-1" />
                    </div>
                    <label htmlFor="sns" className="opacity-50 mx-[1rem]">
                        SNS
                    </label>
                    <div className="flex">
                        <div className="flex flex-col justify-center items-center mx-[1rem]">
                            <FiMail size={`1.75rem`} />
                            <p className="text-sm">Mail</p>
                        </div>
                        <input type="text" placeholder="asj0816" className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-6 p-1 ml-3 mr-5" />
                        <input type="text" placeholder="korea.ac.kr" className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-6 p-1" />
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-center items-center mx-[0.2rem]">
                            <FiInstagram size={`1.75rem`} />
                            <p className="text-xs">Instagram</p>
                        </div>
                        <input type="text" placeholder="@10issoojin_" className="border-2 rounded-md w-[30%] h-[2.5rem] p-1 ml-3 mr-5" />
                    </div>

                    <div className="flex">
                        <div className="flex flex-col justify-center items-center mx-[0.5rem]">
                            <FiGithub size={`1.75rem`} />
                            <p className="text-sm">Github</p>
                        </div>
                        <input type="text" placeholder="@aiccuracy" className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-6 p-1 ml-3 mr-5" />
                    </div>
                </form>
                <form action="" method="post" className="my-[4rem] pt-[2rem] pb-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-md">
                    <h4 className="opacity-50 mb-5 font-medium ">프로젝트 썸네일 업로드</h4>
                    <div className="w-[100%] border-dashed border-2 border-sky-500 h-[18rem] flex flex-col items-center ">
                        {projectImage ? <img src={projectImage} alt="projectImage" /> : <img src="/drag-drop.svg" alt="drag-drop" className="mx-auto pt-[3rem]" />}
                        <input type="file" id="imageUpload" className="mt-3 hidden" accept="image/*" />

                        <label htmlFor="imageUpload" className="cursor-pointer text-[#2087FF] mt-5">
                            Browse
                        </label>
                    </div>
                </form>
                <Link href="/mypage">
                    <a>
                        <button className="bg-[#2087FF] w-[100%] h-[4rem] rounded-full text-ourWhite font-normal text-xl tracking-wide mb-[5rem]">SAVE</button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

Edit.Layout = Layout;
export default Edit;
