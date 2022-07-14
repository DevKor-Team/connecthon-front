export default function ProjectCard({ imgurl, title, team }: { imgurl?: string; title: string; team: string }) {
    return (
        <div className="w-full md:w-1/3 rounded-xl shadow-[1px_1px_3px_2px_rgba(232,237,237,1)]">
            <div className="bg-sky-100 w-full h-56 md:h-60 lg:h-64 xl:h-80 2xl:h-96 rounded-t-xl">프로젝트대표사진</div>
            <div className="bg-ourWhite w-full h-[5.5rem] px-10 lg:px-6 py-4 rounded-b-xl flex flex-col items-start justify-around">
                <h1 className="font-bold text-lg sm:text-base lg:text-lg">{title}</h1>
                <h2 className="font-semibold text-base sm:text-sm lg:text-base">{team}</h2>
            </div>
        </div>
    );
}
