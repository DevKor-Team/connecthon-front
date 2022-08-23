import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { axiosInstance } from '../hooks/queries';
import { useRouter } from 'next/router';

function ProjectCard({ teamId, likes }: { teamId: string; likes: number }) {
    const [name, setName] = useState<string>('');
    const [img, setImg] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        axiosInstance.get(`teams/${teamId}`).then(res => {
            setName(res.data.data.name);
            setImg(res.data.data.image);
        });
    }, []);

    return (
        <div className="relative w-full sm:w-[48%] h-48 md:h-64 rounded-xl mb-6 md:mb-10 cursor-pointer hover:drop-shadow-2xl" onClick={() => router.push(`/projects/${teamId}`)}>
            <div className="absolute inset-0 rounded-xl w-full h-full">
                {img ? (
                    <img src={img} className="h-full w-full object-cover rounded-xl" />
                ) : (
                    <div className="w-full h-full font-bold bg-developer bg-opacity-50 rounded-xl flex text-lg items-center justify-center">대표 이미지가 없습니다</div>
                )}
            </div>
            <div className="transition-opacity duration-300 opacity-100 absolute inset-0 flex flex-col justify-end p-5 lg:p-8 rounded-xl bg-gradient-to-t from-black via-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0)]">
                <h1 className="text-white text-sm">TEAM</h1>
                <div className="flex justify-between items-center">
                    <h2 className="text-white font-semibold text-xl lg:text-2xl lg:text-base">{`${name}`}</h2>
                    <div className="flex space-x-2 items-center">
                        <FiHeart stroke="white" size={20} />
                        <p className="text-white text-base lg:text-[1.25rem]">{likes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
