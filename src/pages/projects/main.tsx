import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { axiosInstance } from '../../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';

const Viewer = dynamic(() => import('../../components/Viewer'), { ssr: false });

// interface Members {
//     name: string;
//     imagePath: string;
//     position: string;
// }

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
        console.log(`근본적으로 project stack : ${projectStack}`);
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
                <div className="flex justify-center w-full h-[5rem]">
                    {usedStack &&
                        usedStack.map(x => {
                            console.log(`x 보여줘바 : ${x}`);
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
                                    <p className={`text-${memb.position}`}>{memb.position}</p>
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
        </div>
    );
};

export default ProjectDetail;
