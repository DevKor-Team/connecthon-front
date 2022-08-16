import { ChatUser } from '../interfaces/chat';

function ModalUser({ userInfo }: { userInfo: ChatUser }) {
    return (
        <div className="w-full h-14 flex items-center space-x-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src={userInfo.profile?.img || `/profile-default.jpg`} className="w-11 h-11 rounded-full" />
            </div>
            <div className="w-52 h-12 flex flex-col justify-center space-y-[0.02rem]">
                <h3 className="font-bold">
                    {userInfo.name.first}
                    {userInfo.name.last}
                </h3>
                <p className="text-ourGrey text-sm">{userInfo.team ? userInfo.team.name : '소속된 팀이 없습니다'}</p>
            </div>
            <div className="w-20 h-8 rounded-2xl bg-ourBlue p-2 text-white text-sm flex justify-self-end items-center justify-center cursor-pointer">Contact</div>
        </div>
    );
}

export default ModalUser;
