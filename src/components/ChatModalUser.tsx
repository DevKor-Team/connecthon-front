import { User } from '../interfaces/user';

function ChatModalUser({ userInfo }: { userInfo: User }) {
    return (
        <li className="w-full h-4 py-2 flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full">
                <img src={userInfo.profile?.img} className="w-3 h-3 rounded-full" />
            </div>
            <div className="w-4 h-4 flex flex-col space-y-2">
                <h3 className="font-bold">{userInfo.name}</h3>
                <p className="text-ourGrey">{userInfo.team}</p>
            </div>
            <div className="w-3 h-3 rounded-2xl bg-ourBlue p-2 text-white">Contact</div>
        </li>
    );
}

export default ChatModalUser;
