import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { useRouter } from 'next/router';
import { projectRecoilState, ProjectState } from '../../recoil/project';
import { User } from '../../interfaces/user';
import dynamic from 'next/dynamic';
import { TechStackMapping } from '../../constants/stackMapping';

const Viewer = dynamic(() => import('../../components/Viewer'), { ssr: false });

const TeamProject = () => {
    const router = useRouter();
    const { id } = router.query;

    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [teamId, setTeamId] = useState<string | string[] | undefined>();
    const [projectState, setProjectState] = useState<ProjectState>({ content: '', stack: [''] });
    const tools: { name: string; nameKo: string; image: string }[] = [];
    const [teamName, setTeamName] = useState();
    const [userIdArr, setUserIdArr] = useState<string[]>([]);
    const [teamUsers, setTeamUsers] = useState<User[]>([]);
    const [onLiked, setOnLiked] = useState<boolean>(false);
    const [projectNumLiked, setProjectNumLiked] = useState<number>(0);
    const [usedStack, setUsedStack] = useState<{ name: string; nameKo: string; image: string }[]>();
    // console.log(projectState.stack);
    // stack 살리기 !
    // UI 작업

    //로그인 풀리지 않게 다시 getSessionUser
    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserState({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserState({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getSessionUser();
        setTeamId(id);
    }, []);

    //팀 아이디를 가지고 해당 팀의 프로젝트를 가져온다
    //또한, 팀 아이디를 가지고 "팀의 이름"과 "팀원들의 id"배열을 가져온다
    useEffect(() => {
        if (teamId) {
            axiosInstance.get(`/project/${teamId}`).then(res => {
                setProjectState(res.data.data);
                setProjectNumLiked(res.data.data.likes.length || 0);
                console.log(`team id 로 부터 프로젝트 가져온다. ${res.data.data.content}`);
            });

            axiosInstance.get(`/teams/${teamId}`).then(res => {
                setTeamName(res.data.data.name);
                setUserIdArr(res.data.data.users);
            });
            axiosInstance.get(`/project/like/${teamId}/${loginUserState.user?.id}`).then(res => {
                setOnLiked(res.data.like);
            });
            projectState.stack?.slice(0, -1).map(x => {
                tools.push(TechStackMapping.filter(stack => stack.nameKo.includes(x))[0]);
            });
            setUsedStack(tools);
        }
    }, [teamId]);

    useEffect(() => {
        projectState.stack?.slice(0, -1).map(x => {
            tools.push(TechStackMapping.filter(stack => stack.nameKo.includes(x))[0]);
        });
        setUsedStack(tools);
    }, [projectState.stack]);

    //위에서 받아온 "팀원들의 id"배열을 가지고 팀원 개개인의 정보를 가져온다
    //해당 개개인의 정보들은 teamUsers 배열에 다시 차곡차곡 넣어준다
    useEffect(() => {
        const getUserInfos = async () => {
            if (userIdArr) {
                const newTeamUsers: User[] = await Promise.all(
                    userIdArr.map(async userId => {
                        const res = await axiosInstance(`users/${userId}`);
                        console.log(res.data);
                        return {
                            ...res.data.data,
                            name: res.data.data.name.first + (res.data.data.name.last || ''),
                        };
                    }),
                );

                setTeamUsers(teamUsers.concat(newTeamUsers));
                // userIdArr.forEach(id => {
                //     axiosInstance.get(`users/${id}`).then(res => {
                //         console.log(res.data.data);
                //         setTeamUsers(prev => prev.concat(res.data.data));
                //     });
                // });
            }
        };
        getUserInfos();
    }, [userIdArr]);

    useEffect(() => {
        axiosInstance
            .put(`/project/like`, {
                user: loginUserState.user?.id,
                team: teamId,
            })
            .then(res => console.log(res.data));
    }, [onLiked]);

    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem] flex flex-col border-2">
            <div className="flex border-b bg-[#F6FAFF]">
                <div className="grow flex mt-1">
                    <span className="ml-3 flex items-center ">TEAM </span>
                    <span className="mx-1 text-2xl font-semibold mt-3">{` ${teamName}`}</span>
                </div>
            </div>
            <div className="mx-3 border-b">{projectState?.content && <Viewer resultContent={projectState.content} />}</div>
            <div className="flex justify-center items-end w-full h-[5rem] my-3">
                {usedStack &&
                    usedStack.map(x => {
                        return (
                            <div className="flex flex-col items-center  mx-2">
                                <img src={x.image} alt={x.name} className="w-[3rem] grayscale" />
                                <p className="text-[0.75rem]">{x.nameKo}</p>
                            </div>
                        );
                    })}
            </div>
            <div className="flex flex-col justify-center items-center border-t bg-[#1D1D1D] w-[100%]">
                <div className="flex flex-col items-center justify-center">
                    {onLiked ? (
                        <AiFillHeart
                            className="fill-[#FF2528] mt-5 text-3xl md:text-3xl"
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
                            className="fill-white mt-5 text-3xl md:text-3xl"
                            onClick={() => {
                                setOnLiked(true);
                                setProjectNumLiked(projectNumLiked + 1);
                            }}
                        />
                    )}

                    <p className="text-white text-sm text-center mb-5">{projectNumLiked}</p>
                </div>
                <div className="flex justify-between">
                    {teamUsers.map(user => (
                        <div
                            className="flex flex-col mx-3 cursor-pointer"
                            onClick={() => {
                                router.push(`/user/${user.id}`);
                            }}
                        >
                            {user.profile?.img ? (
                                <img src={user.profile?.img} alt={user.name} className="w-[2rem] rounded-full mx-auto " />
                            ) : (
                                <img src="/profile-default.jpg" className="w-[2rem] rounded-full mx-auto" />
                            )}
                            <p className="text-white text-center mt-2 mb-5">{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamProject;
