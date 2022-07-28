import { AiOutlineHeart } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { useState } from 'react';

export const ProjectMain = () => {
    const [onLikedHover, setOnLikedHover] = useState<boolean>(false);
    const [onSharedHover, setOnSharedHover] = useState<boolean>(false);
    // const [onLikedClick, setOnLikedClick] = useState<boolean>(false);
    // const [onSharedClick, setOnSharedClick] = useState<boolean>(false);
    return (
        <article>
            <div className="absolute left-[20%] top-0 bg-ourWhite drop-shadow-lg rounded-lg h-[80vh] w-[70vw] z-0 p-[2rem] bg-[url('/project-ex.svg')] overflow-hidden">
                <div className="flex flex-col items-end z-10">
                    <p className="text-lg">Team DEVKOR</p>
                    <h2 className="text-4xl font-semibold">HACKATHON</h2>
                    <h3 className="text-3xl font-semibold">Project</h3>
                    <p className="text-end">프로젝트 설명~~~~~~~~~</p>
                    <div className="absolute bottom-3 right-5 w-[9rem] h-[5rem]">
                        <div className="relative">
                            <div>{onLikedHover ? <img src="/liked-hover.svg" alt="liked-hover" className="absolute top-[-2rem] right-8" /> : null}</div>
                            <div>{onSharedHover ? <img src="/share-hover.svg" alt="share-hover" className="absolute top-[-2rem] right-[-0.75rem]" /> : null}</div>

                            <div className="bg-[#FFFFFF] absolute top-9 left-3 rounded-full drop-shadow-lg px-2 py-1">
                                <div
                                    className="flex justify-center items-center cursor-pointer"
                                    onMouseOver={() => {
                                        setOnLikedHover(true);
                                    }}
                                    onMouseOut={() => {
                                        setOnLikedHover(false);
                                    }}
                                >
                                    <AiOutlineHeart />
                                    <p className="px-2">123</p>
                                </div>
                            </div>
                            <div className="bg-[#FFFFFF] absolute top-9 left-[6rem] rounded-full drop-shadow-lg px-2 py-1">
                                <div
                                    className="flex justify-center items-center p-1 cursor-pointer"
                                    onMouseOver={() => {
                                        setOnSharedHover(true);
                                    }}
                                    onMouseOut={() => {
                                        setOnSharedHover(false);
                                    }}
                                >
                                    <BiShareAlt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-[30rem]"></div>
        </article>
    );
};
