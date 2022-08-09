import Layout from '../../../layouts/Layout';
import dynamic from 'next/dynamic';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import Tag from '../../../components/Tag';
import { useRouter } from 'next/router';

const Writer = dynamic(() => import('../../../components/Editor'), { ssr: false });

interface TechStack {
    name: string;
    image: string;
}
const techStacks: { name: string; image: string }[] = [
    {
        name: '포토샵',
        image: '/stacks/photoshop.svg',
    },
    {
        name: '일러스트레이터',
        image: '/stacks/illustrator.svg',
    },
    {
        name: '인디자인',
        image: '/stacks/indesign.svg',
    },
    {
        name: 'XD',
        image: '/stacks/adobexd.svg',
    },
    {
        name: '피그마',
        image: '/stacks/figma.svg',
    },
    {
        name: '제플린',
        image: '/stacks/zeplin.svg',
    },
    {
        name: '프로토파이',
        image: '/stacks/protopie.svg',
    },
];

const ProjectEdit = () => {
    const [input, setInput] = useState<string>();
    const [enterPressed, setEnterPressed] = useState<boolean>();
    const [searchStack, setSearchStack] = useState<TechStack[]>();
    const [labels, setLabels] = useState<Array<string>>(['']);
    const router = useRouter();
    const projectId = router.query.id;
    console.log(`projectid : ${projectId}`);
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
            setSearchStack(techStacks.filter(stacks => stacks.name.includes(keyword)));
            // setSearchResult(labelstech.filter(prj => prj.team.includes(keyword) || prj.prjname.includes(keyword)));
            setInput('');
            searchinput.blur();
        } else return;
    }

    return (
        <div className="mt-[8rem] mb-10 flex justify-center">
            <div className="w-[70%] h-[100%] mr-2 border-4 border-blue-100 ">
                <Writer />
                <div className="flex justify-end mx-5 my-2">
                    <button
                        className="border-2 border-[#2087FF] py-1 px-2 rounded-md text-[#2087FF] font-semibold mx-2"
                        onClick={() => {
                            router.push(`/project/${projectId}/edit`);
                        }}
                    >
                        임시 저장
                    </button>
                    <button
                        className="border-2 border-[#2087FF] py-1 px-5 rounded-md text-[#2087FF] font-semibold"
                        onClick={() => {
                            router.push(`/project/${projectId}`);
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-[30%] rounded-xl bg-[#FFFFFF] drop-shadow-xl shadow-[#2086FF]">
                <div className="bg-[#F6FAFF] px-5 py-2">
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
                {/* <div className="flex flex-wrap justify-start mx-2 mb-10">
                    {techStacks.map(stack => {
                        return (
                            <div className="w-[25%]">
                                <img
                                    src={stack.image}
                                    alt={stack.name}
                                    className="w-[70%] mx-3"
                                    onClick={() => {
                                        if (!labels.includes(stack.name)) setLabels([stack.name, ...labels]);
                                    }}
                                />
                                <div className="text-center mt-2 text-[0.77rem]">{stack.name}</div>
                            </div>
                        );
                    })}
                </div> */}
                <div className="flex flex-wrap justify-start mx-2 mb-10">
                    {(enterPressed ? searchStack : techStacks).map(stack => {
                        return (
                            <div className="w-[25%]">
                                <img
                                    src={stack.image}
                                    alt={stack.name}
                                    className="w-[70%] mx-3"
                                    onClick={() => {
                                        if (!labels.includes(stack.name)) setLabels([stack.name, ...labels]);
                                    }}
                                />
                                <div className="text-center mt-2 text-[0.77rem]">{stack.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

ProjectEdit.Layout = Layout;
export default ProjectEdit;
