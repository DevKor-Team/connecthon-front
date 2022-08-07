import Layout from '../../../layouts/Layout';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsChatLeft, BsFillChatLeftFill } from 'react-icons/bs';
import { useState } from 'react';
import { CustomNextPage } from '../../../types/types';

interface Members {
    name: string;
    imagePath: string;
    position: string;
}

const MemberDisplay: React.FC = () => {
    const memberList: Array<Members> = [
        {
            name: '김현아',
            imagePath: '/designers/hyuna.png',
            position: 'PLANNER',
        },
        {
            name: '유지오',
            imagePath: '/designers/jio.png',
            position: 'DESIGNER',
        },
        {
            name: '장태웅',
            imagePath: '/designers/taewung.png',
            position: 'DESIGNER',
        },
        {
            name: '김지윤',
            imagePath: '/designers/jiyoon.png',
            position: 'DEVELOPER',
        },
        {
            name: '정승연',
            imagePath: '/designers/seungyeon.png',
            position: 'DEVELOPER',
        },
    ];
    return (
        <div>
            {memberList.map(member => {
                return (
                    <div className="flex justify-center items-center pl-5">
                        <img src={member.imagePath} alt={member.name} className="rounded-full h-[3rem] w-auto mx-2" />
                        <div className="my-3 mx-0">
                            {member.position == 'DEVELOPER' ? (
                                <h4 className="text-[#F6CC00] text-[0.9rem] text-start">DEVELOPER</h4>
                            ) : member.position == 'DESIGNER' ? (
                                <h4 className="text-[#29AAE4] text-md text-start">DESIGNER</h4>
                            ) : (
                                <h4 className="text-[#FF2528] text-[1.12rem] text-start">PLANNER</h4>
                            )}
                            <h4 className="text-[#F8F8F8] opacity-40">{member.name}</h4>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ProjectDetail: CustomNextPage = () => {
    const memberList: Array<Members> = [
        {
            name: '김현아',
            imagePath: '/designers/hyuna.png',
            position: 'PLANNER',
        },
        {
            name: '유지오',
            imagePath: '/designers/jio.png',
            position: 'DESIGNER',
        },
        {
            name: '장태웅',
            imagePath: '/designers/taewung.png',
            position: 'DESIGNER',
        },
        {
            name: '김지윤',
            imagePath: '/designers/jiyoon.png',
            position: 'DEVELOPER',
        },
        {
            name: '정승연',
            imagePath: '/designers/seungyeon.png',
            position: 'DEVELOPER',
        },
    ];
    const [showMember, setShowMember] = useState<boolean>(false);
    const [expFullScreen, setExpFullScreen] = useState<boolean>(false);
    const [onLiked, setOnLiked] = useState<boolean>(false);
    const [onChat, setOnChat] = useState<boolean>(false);

    return (
        <div className="bg-black w-[90vw]">
            <div className="mt-[5rem] flex justify-center w-[100%] h-[100vh]">
                <div className="bg-[#FFFFFF] border border-gray-300 w-[80%]">
                    <div className="flex px-7 pt-8 pb-4 bg-transparent border-b-2">
                        <h4 className="grow text-xl leading-10 ">TEAM DevKor</h4>
                        <div className="flex">
                            <h2 className="text-2xl mx-3 font-bold">가장 쓸데없는 웹 제작</h2>
                            <p className="leading-10">2022</p>
                        </div>
                    </div>
                </div>

                <div className="relative w-[10%] mx-5 my-[2.75rem]">
                    {expFullScreen ? <img src="/fullScreen-text.svg" alt="fullScreen" className="absolute right-[6.5rem] top-[-0.75rem] opacity-90" /> : null}

                    <img
                        src="/expand-window.png"
                        alt="expand"
                        width="25"
                        className="cursor-pointer"
                        onMouseOver={() => {
                            setExpFullScreen(true);
                        }}
                        onMouseOut={() => {
                            setExpFullScreen(false);
                        }}
                    />
                    <h4 className="mt-10 text-white">Team</h4>
                    <h3 className="text-white font-bold text-md">Young Tigers</h3>
                    <div className="flex mt-3">
                        <p className="text-sm text-white opacity-50">멤버 소개</p>
                        <img
                            src="/expand-more.svg"
                            alt="expand"
                            width="23"
                            className="cursor-pointer"
                            onClick={() => {
                                showMember ? setShowMember(false) : setShowMember(true);
                            }}
                        />
                    </div>
                    {showMember ? <MemberDisplay /> : null}
                    <div>
                        <div className="rounded-full bg-white w-10 h-10 relative mt-5 cursor-pointer">
                            <AiOutlineHeart
                                className="absolute top-[15%] left-[13%] text-3xl"
                                onMouseOver={() => {
                                    onLiked ? setOnLiked(false) : setOnLiked(true);
                                }}
                            />
                        </div>
                        <p className="text-sm text-start pl-[0.15rem] pt-1 text-white opacity-60">좋아요</p>
                    </div>
                    <div>
                        <div
                            className="rounded-full bg-white w-10 h-10 relative mt-5 cursor-pointer"
                            onMouseOver={() => {
                                setOnChat(true);
                            }}
                            onMouseLeave={() => {
                                setOnChat(false);
                            }}
                        >
                            {onChat ? (
                                <BsFillChatLeftFill className="absolute top-[22%] left-[20%] text-2xl" style={{ fill: '#2087FF', backgroundColor: 'white' }} />
                            ) : (
                                <BsChatLeft className="absolute top-[22%] left-[20%] text-2xl" style={{ fill: '#2087FF' }} />
                            )}
                        </div>
                        <p className="text-sm  pl-[0.55rem] pt-1 text-white opacity-60">채팅</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#1D1D1D] w-[100%] h-[30rem]">
                <div className="border-b border-[#F8F8F8] w-[80%] h-[35%] mx-auto my-6 flex flex-col justify-center items-center">
                    <AiOutlineHeart size="40" style={{ fill: '#2087FF' }} className="cursor-pointer" />
                    <p className="text-[#F8F8F8] mt-2">123</p>
                </div>
                <div className="mt-[3rem]">
                    <h2 className="text-2xl font-normal text-[#F8F8F8] text-center">TEAM Young Lion</h2>
                    <div className="flex justify-center">
                        {memberList.map(member => {
                            return (
                                <div className="flex flex-col justify-center items-center pl-5 mt-9 mx-3">
                                    <img src={member.imagePath} alt={member.name} className="rounded-full h-[4rem] w-auto mx-3" />
                                    <div className="my-1">
                                        <h4 className="text-[#F8F8F8] opacity-50">{member.position}</h4>
                                        <h4 className="text-[#F8F8F8] text-center">{member.name}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="relative bg-white w-[100%] h-[20rem]">
                <div className="flex">
                    <p className="absolute left-[7rem] top-[40%] text-md font-semibold">TEAM Young Lion 의 작품이 마음에 드셨다면, 채팅으로 대화를 시작해보세요.</p>
                    <BsChatLeft style={{ fill: '#2087FF' }} className="absolute right-[10rem] top-[40%] text-3xl" />
                </div>
            </div>
        </div>
    );
};

ProjectDetail.Layout = Layout;
export default ProjectDetail;
