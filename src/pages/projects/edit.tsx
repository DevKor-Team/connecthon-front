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

const TextEditor = dynamic(() => import('../../components/Editor'), { ssr: false });

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

const ProjectEdit: NextPage = () => {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [input, setInput] = useState<string>();
    const [enterPressed, setEnterPressed] = useState<boolean>(false);
    const [searchStack, setSearchStack] = useState<{ name: string; nameKo: string; image: string }[]>();
    const [labels, setLabels] = useState<Array<string>>(['']);
    const [contents, setContents] = useState<string>('프로젝트 내용을 입력해주세요');
    const [stacks, setStacks] = useState<string[]>();
    const [techStacks, setTechStacks] = useState<TechStack[]>();
    const [project, setProject] = useRecoilState(projectRecoilState);

    // const teamId = loginUserState.user?.team?._id;
    const onRemove = (selectedLabel: string) => {
        setLabels(labels.filter(label => label !== selectedLabel));
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
    const tempSave = async (projectContent: string) => {
        const res = await axiosInstance.put(`/temp/update/${loginUserState.user?.team?._id}`, {
            change: {
                content: projectContent,
                stack: labels,
            },
        });
        console.log(`temp save 내용 확인 : ${res.data.data.content}`);
        setContents(res.data.data.content);
        setLabels(res.data.data.stack);
    };

    const finalSave = async (projectContent: string) => {
        const res = await axiosInstance.put(`/project/update/${loginUserState.user?.team?._id}`, {
            change: {
                content: projectContent,
                stack: labels,
            },
        });
        console.log(`final save 확인 : ${res.data.data.content}`);
        setContents(res.data.data.content);
        setLabels(res.data.data.labels);
    };

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

        const getInitialProject = async () => {
            const res = await axiosInstance.get(`/project/${loginUserState.user?.team?._id}`);
            console.log(`project 받아온거 체크 : ${res.data.data.content}`);
            setContents(res.data.data.content);
            setLabels(res.data.data.stack);
            setProject({
                content: res.data.data.content,
                stack: res.data.data.stack,
            });
            console.log(`recoil project state 확인 : ${res.data.data.content}`);
        };

        getSessionUser();
        console.log(`로그인 유저 스테이트 확인 : ${loginUserState.isLogin}`);
        getInitialProject();
        setTechStacks([TechStack.photoshop, TechStack.illustrator, TechStack.indesign, TechStack.adobexd, TechStack.figma, TechStack.zeplin, TechStack.protopie]);
    }, []);

    useEffect(() => {
        setProject({
            content: contents,
            stack: project.stack,
        });
    }, [contents]);
    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem] mb-10 flex flex-col md:flex-row md:justify-center">
            <div className="w-full md:w-[70%] md:h-[100%] mr-2 border-4 border-blue-100 ">
                <TextEditor contents={project.content} setContents={setContents} />

                <div className="flex justify-end mx-5 my-2">
                    <button
                        className="border-2 border-[#2087FF] py-1 px-2 rounded-md text-[#2087FF] font-semibold mx-2"
                        onClick={() => {
                            tempSave(contents);
                            alert('임시 저장되었습니다!');
                        }}
                    >
                        임시 저장
                    </button>
                    <button
                        className="border-2 border-[#2087FF] py-1 px-5 rounded-md text-[#2087FF] font-semibold"
                        onClick={() => {
                            finalSave(contents);
                            router.push(`/projects/main`);
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>

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
                                        if (!labels.includes(stack.nameKo)) setLabels([stack.nameKo, ...labels]);
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
