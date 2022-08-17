import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { axiosInstance } from '../../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';

const Viewer = dynamic(() => import('../../components/Viewer'), { ssr: false });

interface Members {
    name: string;
    imagePath: string;
    position: string;
}

const TechStackMapping = [
    {
        name: 'photoshop',
        nameKo: '포토샵',
        image: '/stacks/photoshop.svg',
    },
    {
        name: 'illustrator',
        nameKo: '일러스트레이터',
        image: '/stacks/illustrator.svg',
    },
    {
        name: 'indesign',
        nameKo: '인디자인',
        image: '/stacks/indesign.svg',
    },
    {
        name: 'XD',
        nameKo: 'XD',
        image: '/stacks/adobexd.svg',
    },
    {
        name: 'figma',
        nameKo: '피그마',
        image: '/stacks/figma.svg',
    },
    {
        name: 'zeplin',
        nameKo: '제플린',
        image: '/stacks/zeplin.svg',
    },
    {
        name: 'protopie',
        nameKo: '프로토파이',
        image: '/stacks/protopie.svg',
    },
];

// const MemberDisplay: React.FC = () => {
//     return (
//         <div>
//             {memberList.map(member => {
//                 return (
//                     <div className="flex justify-center items-center pl-5">
//                         <img src={member.imagePath} alt={member.name} className="rounded-full h-[3rem] w-auto mx-2" />
//                         <div className="my-3 mx-0">
//                             {member.position == 'DEVELOPER' ? (
//                                 <h4 className="text-[#F6CC00] text-[0.9rem] text-start">DEVELOPER</h4>
//                             ) : member.position == 'DESIGNER' ? (
//                                 <h4 className="text-[#29AAE4] text-md text-start">DESIGNER</h4>
//                             ) : (
//                                 <h4 className="text-[#FF2528] text-[1.12rem] text-start">PLANNER</h4>
//                             )}
//                             <h4 className="text-[#F8F8F8] opacity-40">{member.name}</h4>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

const ProjectDetail = () => {
    // const [tools, setTools] = useState<{ name: string; nameKo: string; image: string }[]>();
    const tools: { name: string; nameKo: string; image: string }[] = [];
    const [projectContent, setProjectContent] = useState<string>('');
    const [projectStack, setProjectStack] = useState<Array<string>>();
    const [projectNumLiked, setProjectNumLiked] = useState<number>(0);
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [onLiked, setOnLiked] = useState<boolean>(false);
    const [usedStack, setUsedStack] = useState<{ name: string; nameKo: string; image: string }[]>();
    const userId = '62f61fe97ca40fbab4511c95';
    const teamId = '62fa4a28c4dd47bee8327262';
    const teamMember: { name: string; userImage: string; position: string }[] = [];
    const [teamMembers, setTeamMembers] = useState<{ name: string; userImage: string; position: string }[]>();

    const getProject = async () => {
        const res = await axiosInstance.get(`/project/${teamId}`);
        setProjectContent(res.data.data.content);
        setProjectStack(res.data.data.stack);
        setProjectNumLiked(res.data.data.likes.length);
    };

    const getUserLiked = async () => {
        const res = await axiosInstance.get(`/project/like/${teamId}/${userId}`);
        setOnLiked(res.data.like);
    };

    const getTeamMember = async () => {
        const res = await axiosInstance.get(`/teams/${teamId}`);

        if (res.data.users) {
            res.data.users.map(async (user: string) => {
                const userRes = await axiosInstance.get(`/users/${user}`);
                teamMember.push({ name: userRes.data.name, userImage: userRes.data.profile.img, position: userRes.data.profile.position });
            });
            setTeamMembers(teamMember);
        } else return;
    };

    useEffect(() => {
        getProject();
        getUserLiked();
        getTeamMember();
        projectStack?.slice(0, -1).map(x => {
            tools.push(TechStackMapping.filter(stack => stack.nameKo.includes(x))[0]);
        });
        setUsedStack(tools);
    }, []);

    useEffect(() => {
        axiosInstance
            .put(`/project/like`, {
                user: userId,
                team: teamId,
            })
            .then(res => console.log(res.data));
    }, [onLiked]);

    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem] flex flex-col md:flex-row border-2 ">
            <div className="md:w-[85%]">
                <div className="w-[100%] border-b rounded-md">
                    <div className="h-[4rem] bg-ourWhite flex">
                        <div className="grow flex px-3">
                            <h4 className="py-4 text-2xl font-semibold">TEAM 승우네</h4>
                        </div>
                        <div className="py-6 px-3 text-md tracking-wide font-light">2022 KU Hackathon</div>
                    </div>
                    <div className="h-full break-words px-3 pb-10">
                        <Viewer resultContent={projectContent} />
                    </div>
                </div>

                <div className="flex justify-center w-full ">
                    {usedStack &&
                        usedStack.map(x => {
                            return (
                                <div className="flex flex-col items-center  mx-2">
                                    <img src={x.image} alt={x.name} className="w-[3rem]" />
                                    <p className="text-[0.75rem]">{x.nameKo}</p>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center border-t bg-[#1D1D1D] w-[15%]">
                <div className="flex flex-col">
                    {onLiked ? (
                        <AiFillHeart
                            className="fill-[#FF2528] mt-10 text-2xl md:text-3xl"
                            onClick={() => {
                                setOnLiked(false);
                                if (projectNumLiked >= 1) {
                                    setProjectNumLiked(projectNumLiked - 1);
                                } else {
                                    setProjectNumLiked(0);
                                }
                            }}
                        />
                    ) : (
                        <AiOutlineHeart
                            className="fill-white mt-10 text-2xl md:text-3xl"
                            onClick={() => {
                                setOnLiked(true);
                                setProjectNumLiked(projectNumLiked + 1);
                            }}
                        />
                    )}

                    <p className="text-white text-sm text-center">{projectNumLiked}</p>
                </div>
                <div className="my-10 mx-3 flex md:flex-col md:ml-2 md:mr-4">
                    {teamMembers?.map(memb => {
                        return (
                            <div className="md:flex md:my-3">
                                <img src={memb.userImage} alt={memb.name} className="rounded-full px-2 md:w-[3rem]" />
                                <div className="flex justify-center items-center md:flex-col md:items-start">
                                    <p className="text-developer">{memb.position}</p>
                                    <div className="md:flex md:items-center md:justify-start">
                                        <p className="text-white text-center text-[0.8rem] px-1 md:pl-0 md:pr-1 md:text-sm">{memb.name}</p>
                                        <BsChatLeft className="fill-white text-[0.8rem] cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem] flex justify-center w-[100%] h-[100vh]">
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
            </div> */}
        </div>
    );
};

export default ProjectDetail;
