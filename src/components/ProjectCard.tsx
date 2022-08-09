import { FiHeart } from 'react-icons/fi';

function ProjectCard() {
    return (
        <div className="relative w-full sm:w-[48%] h-48 md:h-64 rounded-xl bg-yellow-300 mb-6 md:mb-10">
            <div className="transition-opacity duration-300 opacity-100 lg:opacity-0 lg:hover:opacity-100 absolute inset-0 flex flex-col justify-end p-5 lg:p-8 rounded-xl bg-gradient-to-t from-black via-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0)]">
                <h1 className="text-white text-lg lg:text-2xl font-semibold">KU Project - Hackathon</h1>
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-sm lg:text-base">Team : KU HACKCATHON</h2>
                    <div className="flex space-x-2 items-center">
                        <FiHeart stroke="white" size={20} />
                        <p className="text-white text-base lg:text-[1.25rem]">117</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
