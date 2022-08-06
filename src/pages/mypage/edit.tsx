import { useState } from 'react';
import Layout from '../../layouts/Layout';
import Dropzone from 'react-dropzone';
import { FiMail, FiInstagram, FiGithub } from 'react-icons/fi';
import { useRouter } from 'next/router';

const ProfileEdit = () => {
    const [file, setFile] = useState<string>();
    const router = useRouter();

    return (
        <div className="bg-ourWhite mt-[8rem] mb-[3rem] w-[100%]">
            <form action="" method="post">
                <div className="flex">
                    <div className="flex justify-center items-center bg-[#FFFFFF] drop-shadow-2xl z-10 rounded-md w-[35%] pb-5">
                        <Dropzone
                            onDrop={acceptedFiles => {
                                setFile(URL.createObjectURL(acceptedFiles[0]));
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {file ? <img src={file} alt="uploaded user image" /> : <img src="/dragdrop.svg" alt="dragdrop" />}
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="flex flex-col drop-shadow-md bg-[#FFFFFF] w-[80%] px-[4rem] h-[20rem] py-7 rounded-md">
                        <label htmlFor="name">이름</label>
                        <input type="text" placeholder="안수진" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                        <label htmlFor="position">직책</label>
                        <input type="text" placeholder="designer" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                        <label htmlFor="teamName">소속 팀</label>
                        <input type="text" placeholder="ex.Team DEVKOR" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                    </div>
                </div>
                <div className="flex flex-col mt-[4rem] mb-[2rem] py-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-md">
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
                    <div className="flex mb-1">
                        <div className="flex flex-col justify-center items-center mx-[1rem]">
                            <FiMail size={`1.75rem`} />
                            <p className="text-sm">Mail</p>
                        </div>
                        <div className="border border-gray-300 bg-[#FFFFFF] rounded-lg w-[30%] h-[2.5rem] p-1 flex justify-start items-center ml-3 mr-5 mb-4 mt-3">{`hi`}</div>

                        {/* <input type="text" placeholder="asj0816" className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-6 p-1 ml-3 mr-3" /> */}
                        {/* <div className="flex items-center mr-3 text-xl opacity-50 mb-2">@</div> */}
                        {/* <input type="text" placeholder="korea.ac.kr" className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-6 p-1" /> */}
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
                </div>
                <button
                    className="w-[100%] bg-[#2087FF] rounded-full h-[3.6rem] text-white text-xl tracking-wider cursor-pointer"
                    onClick={() => {
                        router.push('/mypage');
                    }}
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};
ProfileEdit.Layout = Layout;
export default ProfileEdit;
