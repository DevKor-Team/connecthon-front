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

    // stack
    const [input, setInput] = useState<string>();
    const [enterPressed, setEnterPressed] = useState<boolean>(false);
    const [searchStack, setSearchStack] = useState<{ name: string; nameKo: string; image: string }[]>();
    const [labels, setLabels] = useState<Array<string>>(['']);

    const onRemove = (selectedLabel: string) => {
        setLabels(labels?.filter(label => label !== selectedLabel));
    };
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        setInput(currentValue);
    }
    function searchStacks(e: React.KeyboardEvent<HTMLInputElement>) {
        const keyword = input;
        const searchinput = document.querySelector('#searchinput') as HTMLInputElement;

        if (e.key == 'Enter' && keyword) {
            setEnterPressed(true);
            setSearchStack(TechStackMapping?.filter(stacks => stacks.nameKo.includes(keyword)));
            setInput('');
            searchinput.blur();
        } else {
            setEnterPressed(true);
            setSearchStack(TechStackMapping);
        }
    }

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
                setLabels(tempProject.stack);

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
                        stack: labels,
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

    useEffect(() => {
        setLabels(tempProject.stack);
    }, [tempProject.stack]);
    // [PROJECT REAL SAVE]
    const finalSave = () => {
        console.log(`labels : ${labels}`);
        axiosInstance
            .put(`/project/update/${loginUserState.user?.team?._id}`, {
                change: {
                    content: tempProject.content,
                    stack: labels,
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
            <div className="flex flex-col w-full md:w-[30%] rounded-xl bg-[#FFFFFF] drop-shadow-xl shadow-[#2086FF]">
                <div className="bg-[#F6FAFF] px-5 py-3">
                    <h2 className="text-[#2086FF] tracking-wide">사용한 스택</h2>
                </div>
                <div className="flex justify-center items-center mt-10 mx-7">
                    <input
                        className="w-[100%] border-2 border-[#2087FF] rounded-md pl-2 py-[0.4rem]"
                        placeholder="사용한 툴을 검색해보세요!"
                        value={input}
                        onChange={e => onInputChange(e)}
                        onKeyDown={e => searchStacks(e)}
                        id="searchinput"
                    />
                    <BiSearch size={30} className="fill-[#2086FF] cursor-pointer ml-3" />
                </div>
                <div className="flex ml-5 w-[100%] mb-[2rem] mt-5 px-2">
                    {labels ? (
                        <div className="flex flex-wrap">
                            {labels?.slice(0, -1).map(x => (
                                <div className="flex justify-center items-center mx-1 bg-[#2087FF] rounded-xl px-3 py-1 my-1 ">
                                    <Tag label={x} onRemove={onRemove} />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="flex flex-wrap justify-start mx-2 mb-10">
                    {(enterPressed ? searchStack : TechStackMapping)?.map(stack => {
                        return (
                            <div className="w-[25%] flex flex-col items-center my-1">
                                <img
                                    src={stack.image}
                                    alt={stack.name}
                                    className="w-[70%] mx-3 max-w-[5rem]"
                                    onClick={() => {
                                        if (!labels?.includes(stack.nameKo)) setLabels([stack.nameKo, ...labels]);
                                    }}
                                />
                                <div className="text-center mt-2 text-[0.77rem]">{stack.nameKo}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectEdit;
