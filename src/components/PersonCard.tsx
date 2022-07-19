function Developer() {
    return (
        <div className="flex space-x-1 lg:space-x-2 items-center mb-3 lg:mb-6">
            <img src="/devkor-2d.svg" className="w-[1.125rem] h-[1.125rem] lg:w-[1.625rem] h-[1.625rem] m-0" />
            <span className="text-[#FDCC00] text-sm lg:text-lg font-bold">DEVELOPER</span>
        </div>
    );
}

function Designer() {
    return (
        <div className="flex space-x-1 lg:space-x-2 items-center mb-3 lg:mb-6">
            <img src="/designer-2d.svg" className="w-[1.125rem] h-[1.125rem] lg:w-[1.625rem] h-[1.625rem] m-0" />
            <span className="text-[#29AAE4] text-sm lg:text-lg font-bold">DESIGNER</span>
        </div>
    );
}

function Planner() {
    return (
        <div className="flex space-x-1 lg:space-x-2 items-center mb-3 lg:mb-6">
            <img src="/business-2d.svg" className="w-[1.125rem] h-[1.125rem] lg:w-[1.625rem] h-[1.625rem] m-0" />
            <span className="text-[#FF2528] text-sm lg:text-lg font-bold">PLANNER</span>
        </div>
    );
}

type PositionType = { position: 'developer' | 'designer' | 'planner' };

function PersonCard({ position }: PositionType) {
    return (
        <div className="w-[48%] md:w-[31%] h-56 lg:h-[22.5rem] rounded-xl border-2 px-2 lg:px-4 border-slate-200 flex flex-col justify-center mb-3.5 sm:mb-6 lg:mb-8">
            {position == 'developer' ? <Developer /> : position == 'designer' ? <Designer /> : <Planner />}
            <div className="w-full flex flex-col items-center space-y-3 mb-3 lg:mb-8">
                <div className="rounded-full w-[4.5rem] h-[4.5rem] lg:w-[8.125rem] lg:h-[8.125rem] bg-red-900"></div>
                <div className="w-full flex flex-col items-center">
                    <h3 className="font-bold text-lg lg:text-xl mb-0.5 leading-5">이현서</h3>
                    <h4 className="font-medium text-sm text-ourGrey leading-5">TEAM ABC</h4>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="rounded-3xl bg-ourBlack text-white py-2 lg:py-2.5 px-5 md:px-8 text-xs lg:text-sm font-medium text-center mb-1.5">CONTACT</div>
            </div>
        </div>
    );
}

export default PersonCard;
