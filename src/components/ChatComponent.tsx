import { ImPlus } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import { HiArrowNarrowUp } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, SetStateAction } from 'react';

//채팅유저목록 Nav 컴포넌트
function ChatList({ userList, setIsModalOpen, children }: { userList: { name: string; team: string }[]; setIsModalOpen: React.Dispatch<SetStateAction<boolean>>; children: JSX.Element[] }) {
    const [input, setInput] = useState<string>('');
    const [enterPressed, setEnterPressed] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<Array<{ name: string; team: string }>>([]);

    //검색창 onChange Event Handler
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInput(value);
    }

    //검색창 입력에 대해서 해당 유저와의 채팅방 검색해주는 함수
    function searchUser(e: React.KeyboardEvent<HTMLInputElement>) {
        const keyword = input;
        const searchinput = document.querySelector('#chat-search-input') as HTMLInputElement;

        if (e.key == 'Enter') {
            setEnterPressed(true);
            setSearchResult(userList.filter(user => user.name.includes(keyword)));
            setInput('');
            searchinput.blur();
        } else return;
    }

    return (
        <section className="relative h-[90%] w-72 flex flex-col items-center justify-center mr-10 after:content-[' '] after:absolute after:-right-10 after:h-full after:w-[1px] after:bg-gray-200">
            <button className="w-full rounded-md flex justify-center space-x-8 items-center bg-gray-200/50 h-16 mb-8 hover:bg-gray-400/50">
                <ImPlus size={14} />
                <span className="font-medium" onClick={() => setIsModalOpen(true)}>
                    New Conversation
                </span>
            </button>
            <h1 className="text-3xl font-bold self-start mb-4">Chats</h1>
            <div className="relative w-full mb-4">
                <input
                    placeholder="Search Here"
                    className="h-12 w-full bg-gray-200 rounded-md px-4 focus:outline-none"
                    value={input}
                    onChange={onInputChange}
                    onKeyDown={e => searchUser(e)}
                    id="chat-search-input"
                />
                <span className="absolute top-3.5 right-4">
                    <FiSearch size={24} />
                </span>
            </div>
            <ul className="w-full h-full flex flex-col items-start space-y-3 overflow-y-auto scrollbar">{children}</ul>
        </section>
    );
}

//채팅 리스트에 표시할 유저 채팅방아이템 컴포넌트 관련
//onChatPartnerSelect 함수 설명
//선택한 유저(채팅방)에 대해서 배경색을 지정하고 화살표를 띄웁니다.
//이전에 선택되었던 유저(채팅방)의 배경색과 화살표는 지웁니다.
function onChatPartnerSelect(e: React.MouseEvent<HTMLLIElement>) {
    const willUnselected = document.querySelector('.shadow');
    const selectTarget = e.target as HTMLLIElement;
    const selectedArrow = selectTarget.querySelector('.arrow');

    willUnselected?.classList.remove('bg-stone-100', 'shadow', 'shadow-md');
    willUnselected?.classList.add('hover:bg-gray-200/50');
    willUnselected?.querySelector('.arrow')?.classList.add('opacity-0');
    selectTarget.classList.add('bg-stone-100', 'shadow', 'shadow-md');
    selectTarget.classList.remove('hover:bg-gray-200/50');
    selectedArrow?.classList.remove('opacity-0');
}

function ChatListItem({ username, team, setSelectedUser }: { username: string; team: string; setSelectedUser: React.Dispatch<SetStateAction<string>> }) {
    return (
        <li
            className={`w-full min-h-[4rem] rounded-md px-3 flex items-center space-x-3 hover:bg-gray-200/50 hover:cursor-pointer`}
            onClick={() => {
                onChatPartnerSelect;
                setSelectedUser(username);
            }}
        >
            <div className="w-10 h-10 flex items-center rounded-full pointer-events-none">
                <img src="/symbol-2d.svg" className="w-12 h-12" />
            </div>
            <div className="flex flex-col justify-between pointer-events-none w-8/12">
                <span className="text-base font-semibold">{username}</span>
                <span className="text-xs text-ourGrey">{team}</span>
            </div>
            <span className="arrow opacity-0">
                <IoIosArrowForward size={20} />
            </span>
        </li>
    );
}

//채팅컨테이너 상단 유저 배지 컴포넌트
function ChattingPartner({ selectedUser }: { selectedUser: string }) {
    return (
        <section className="w-full h-12 flex items-center pb-4 mb-4 space-x-5 border-b">
            <div className="w-12 h-12 rounded-full">
                <img src="/symbol-2d.svg" className="w-12 h-12" />
            </div>
            <div className="flex text-lg items-center font-semibold">{selectedUser}</div>
        </section>
    );
}

// 채팅내용 컨테이너 컴포넌트
function ChatBubbleContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <section className="relative w-full h-5/6 pb-14 min-w-[24rem] flex flex-col bg-white overflow-hidden box-border">
            <div className="h-full flex flex-col overflow-y-scroll scrollbar">{children}</div>
            <div className="absolute bottom-0 w-full flex items-center bg-white">
                <input className="w-full h-14 rounded-full bg-gray-200/50 focus:outline-none px-6" placeholder="Type Message Here!" />
                <span className="absolute bottom-[50%] translate-y-[50%] right-3.5 rounded-full w-8 h-8 bg-[#0b93f6] flex items-center justify-center">
                    <HiArrowNarrowUp fill="white" />
                </span>
            </div>
        </section>
    );
}

//말풍선(ChatBubble) 컴포넌트
interface BubbleType {
    type: 'send' | 'receive';
    children: string;
}

const SenderStyle =
    'bg-[#0b93f6] text-white mr-[1.625rem] self-end before:-right-[0.438rem] before:w-5 before:bg-[#0b93f6] before:rounded-bl-[1rem] after:-right-[1.625rem] after:w-[1.625rem] after:bg-white after:rounded-bl-[0.625rem]';
const ReceiverStyle =
    'bg-[#e5e5ea] text-black ml-[1.625rem] self-start before:-left-[0.438rem] before:w-5 before:bg-[#e5e5ea] before:rounded-br-[1rem] after:-left-[1.625rem] after:w-[1.625rem] after:bg-white after:rounded-br-[0.625rem]';

function ChatBubble({ type, children }: BubbleType) {
    return (
        <p
            className={`max-w-[16.25rem] relative break-words py-2.5 px-5 mb-3 leading-6 rounded-[1.25rem] before:content-[' '] before:absolute before:bottom-0 before:h-6 after:content-[' '] after:absolute after:bottom-0 after:h-6 ${
                type == 'send' ? SenderStyle : ReceiverStyle
            }`}
        >
            {children}
        </p>
    );
}

export { ChatList, ChattingPartner, ChatBubbleContainer, ChatBubble, ChatListItem };
