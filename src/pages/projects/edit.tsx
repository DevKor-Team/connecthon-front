import dynamic from 'next/dynamic';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Tag from '../../components/Tag';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { axiosInstance } from '../../hooks/queries';
import { TechStack } from '../../interfaces/techStack';
import { NextPage } from 'next';
import { projectRecoilState } from '../../recoil/project';
import { TechStackMapping } from '../../constants/stackMapping';
import { tempProjectRecoilState } from '../../recoil/tempproject';

const TextEditor = dynamic(() => import('../../components/Editor'), { ssr: false });

const ProjectEdit: NextPage = () => {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [project, setProject] = useRecoilState(projectRecoilState);
    const [tempProject, setTempProject] = useRecoilState(tempProjectRecoilState);
    const [teamId, setTeamId] = useState<string>();

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
                        alert('참가자 계정만 접근 가능한 페이지입니다.');
                        router.back();
                    }
                }
            } catch (err) {
                alert('로그인이 필요한 서비스입니다.');
                router.push('/login');
            }
        };

        getSessionUser();
    }, []);

    //로그인한 사용자가 속한 팀의 아이디를 받아온다
    useEffect(() => {
        if (loginUserState.isLogin) {
            setTeamId(loginUserState.user?.team?._id);
        }
    }, [loginUserState]);

    //위에서 받아온 팀아이디를 가지고 "임시저장"된 프로젝트의 "content: string"과 "stack: string[]"을 가져온다.
    useEffect(() => {
        if (teamId) {
            axiosInstance.get(`/temp/${teamId}`).then(res => {
                setTempProject({
                    content: res.data.data.content,
                    stack: res.data.data.stack,
                });
                console.log(`temp 저장된거 가져다줭 : ${res.data.data.content}`);
                console.log(`temp 저장된거 가져다줭 : ${res.data.data.stack}`);
            });
        }
    }, [teamId]);

    // [TEMP SAVE]
    const tempSave = () => {
        if (teamId) {
            axiosInstance
                .put(`/temp/update/${teamId}`, {
                    change: {
                        content: tempProject.content,
                        stack: tempProject.stack,
                    },
                })
                .then(res => {
                    setTempProject({ content: res.data?.data.content, stack: res.data.data.stack });
                });

            // console.log(`temp save 내용 확인 : ${res.data.data.content}`);
            // setContent(res.data.data.content);
            // setStack(res.data.data.stack);
        }
    };
    // [PROJECT REAL SAVE]
    const finalSave = () => {
        axiosInstance
            .put(`/project/update/${loginUserState.user?.team?._id}`, {
                change: {
                    content: tempProject.content,
                    stack: tempProject.stack,
                },
            })
            .then(res => {
                setProject(tempProject);
            });

        alert('프로젝트가 성공적으로 저장되었습니다!');
    };

    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem]">
            <div>
                <TextEditor />
            </div>
            <button
                className="border-2 border-[#2087FF] py-1 px-2 rounded-md text-[#2087FF] font-semibold mx-2"
                onClick={() => {
                    tempSave();
                    alert('임시 저장되었습니다!');
                    router.push('/projects/main');
                }}
            >
                임시 저장
            </button>
            <button
                className="border-2 border-[#2087FF] py-1 px-5 rounded-md text-[#2087FF] font-semibold"
                onClick={() => {
                    finalSave();
                    router.push(`/projects/main`);
                }}
            >
                저장
            </button>
        </div>
    );
};

export default ProjectEdit;
