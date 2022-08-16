import { ChatUser } from '../interfaces/chat';
import { BsFillChatRightFill } from 'react-icons/bs';

function ModalUser({ userInfo }: { userInfo: ChatUser }) {
    return (
        <div className="w-[95%] sm:w-full h-14 flex items-center space-x-3 sm:space-x-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                <img src={userInfo.profile?.img || `/profile-default.jpg`} className="w-7 h-7 sm:w-11 sm:h-11 rounded-full" />
            </div>
            <div className="w-44 sm:w-52 h-12 flex flex-col justify-center space-y-[0.02rem]">
                <h3 className="text-sm sm:text-base font-bold">
                    {userInfo.name.first}
                    {userInfo.name.last}
                </h3>
                <p className="text-ourGrey text-xs sm:text-sm">{userInfo.team ? userInfo.team.name : '소속된 팀이 없습니다'}</p>
            </div>
            <div className="hidden sm:flex sm:w-20 h-8 rounded-2xl bg-ourBlue hover:bg-blue-600 p-2 text-white text-sm justify-self-end items-center justify-center cursor-pointer">Contact</div>
            <div className="sm:hidden cursor-pointer">
                <BsFillChatRightFill fill="#2087FF" size={20} />
            </div>
        </div>
    );
}

export default ModalUser;
