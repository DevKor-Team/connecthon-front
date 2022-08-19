import { HiArrowNarrowUp } from 'react-icons/hi';
import { GrPrevious } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, SetStateAction, useEffect } from 'react';
import { ChatRoomType } from '../interfaces/chat';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import { axiosInstance } from '../hooks/queries';
import { MessageType } from '../interfaces/chat';

//채팅유저목록 Nav 컴포넌트
function ChatNavSection({
    mobileChat,
    chatRoomList,
    setIsModalOpen,
    children,
}: {
    mobileChat: boolean;
    chatRoomList: ChatRoomType[];
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
    children: JSX.Element[];
}) {
    return (
        <section
            className={`relative h-[95%] md:h-[90%] ${
                mobileChat ? 'hidden' : 'w-full'
            } md:w-60 md:min-w-[15rem] md:flex flex-col items-center justify-center md:mr-10 md:after:content-[' '] md:after:absolute md:after:-right-10 md:after:h-full md:after:w-[1px] md:after:bg-gray-200`}
        >
            {children}
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

function ChatListItem({
    roomInfo,
    messages,
    setMobileChat,
    setMessages,
    selectedChatRoom,
    setSelectedChatRoom,
}: {
    roomInfo: ChatRoomType;
    messages: MessageType[];
    setMobileChat: React.Dispatch<SetStateAction<boolean>>;
    setMessages: React.Dispatch<SetStateAction<MessageType[]>>;
    selectedChatRoom: { roomid: string; name: string; img: string };
    setSelectedChatRoom: React.Dispatch<SetStateAction<{ roomid: string; name: string; img: string }>>;
}) {
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [intervariable, setIntervariable] = useState<NodeJS.Timer>();

    //partnerName: 채팅 상대의 이름은 현재 사용자가 회사계정이면 참가자이름이고, 참가자계정이면 회사이름이다.
    //partnerImg: 마찬가지의 매커니즘
    const partnerName = loginUserState.user?.type == 'company' ? roomInfo.userName.first + roomInfo.userName.last : roomInfo.companyName;
    const partnerImg = loginUserState.user?.type == 'company' ? roomInfo.userImg || '/profile-default.jpg' : roomInfo.companyImg || '/profile-default.jpg';

    //1초마다 새로운 메시지들을 fetch해주며, 스크롤을 맨 밑으로 내려준다.
    function fetchMessages(roomid: string) {
        const interv = setInterval(async () => {
            await axiosInstance.get(`/chat/${roomid}`).then(res => {
                if (JSON.stringify(messages[0]) == JSON.stringify(res.data.data.msgs[0])) {
                    // console.log(JSON.stringify(messages[0]));
                    // console.log(JSON.stringify(res.data.data.msgs[0]));
                    return;
                } else {
                    setMessages(res.data.data.msgs);
                    // const chatDiv = document.getElementById('chatdiv') as HTMLDivElement;
                    // chatDiv.scrollTop = chatDiv.scrollHeight;
                }
            });
        }, 1000);

        setIntervariable(interv);
    }

    return (
        <li
            className={`w-full min-h-[4rem] rounded-md px-3 flex items-center space-x-3 hover:bg-gray-200/50 hover:cursor-pointer`}
            onClick={e => {
                //clearInterval(intervariable);
                onChatPartnerSelect(e);
                setSelectedChatRoom({ roomid: roomInfo.id, name: partnerName, img: partnerImg });
                //fetchMessages(roomInfo.id);
                setMobileChat(true);
            }}
            onBlur={() => clearInterval(intervariable)}
        >
            <div className="w-10 h-10 lg:min-w-[2.5rem] lg:h-10 flex items-center rounded-full pointer-events-none">
                <img src={partnerImg} className="min-w-10 h-10 overflow-hidden rounded-full" />
            </div>
            <div className="flex flex-col justify-between pointer-events-none w-6/12 lg:w-8/12 max-w-[8.25rem]">
                <span className="text-base font-semibold">{partnerName}</span>
                <span className="text-xs text-ourGrey truncate">{roomInfo.lastMsg}</span>
            </div>
            <span className="hidden lg:inline-block arrow opacity-0">
                <IoIosArrowForward size={20} />
            </span>
        </li>
    );
}

//채팅컨테이너 상단 유저 정보 컴포넌트 (상단바)
function ChattingPartner({ setMobileChat, selectedChatRoom }: { setMobileChat: React.Dispatch<SetStateAction<boolean>>; selectedChatRoom: { roomid: string; name: string; img: string } }) {
    return (
        <section className="w-full h-fit flex items-center pb-2 md:pb-4 mb-4 md:space-x-5 border-b">
            <div className="hidden md:inline-block md:w-12 h-12 rounded-full">
                <img src={selectedChatRoom.img} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex w-6 justify-start items-center md:hidden">
                <GrPrevious onClick={() => setMobileChat(false)} />
            </div>
            <div className="flex text-lg items-center font-semibold w-full md:w-fit justify-center mr-6 md:mr-0">{selectedChatRoom.name}</div>
        </section>
    );
}

// 채팅내용 컨테이너 컴포넌트
function ChatBubbleContainer({
    selectedChatRoom,
    setMessages,
    children,
}: {
    selectedChatRoom: { roomid: string; name: string; img: string };
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    children: JSX.Element | JSX.Element[];
}) {
    const [chatInput, setChatInput] = useState<string>();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    function handleMessage(e: React.ChangeEvent<HTMLInputElement>) {
        setChatInput(e.target.value);
    }

    //채팅 보내는 함수. 채팅 보내고 나면 기존 chatInput은 비워준다.
    //또한, 채팅을 담은 div의 스크롤을 맨 밑으로 내려준다.
    async function sendMessage() {
        await axiosInstance
            .post('/chat/send', {
                room: selectedChatRoom.roomid,
                msg: chatInput,
                sender: loginUserState.user?.type,
            })
            .then(res => {
                setMessages(res.data.data.msgs);
            })
            .then(() => {
                setChatInput('');
            })
            .then(() => {
                const chatDiv = document.getElementById('chatdiv') as HTMLDivElement;
                chatDiv.scrollTop = chatDiv.scrollHeight;
            });
    }

    return (
        <section className="relative min-w-[20.5rem] w-full h-[91%] md:h-5/6 pb-14 min-w-[24rem] flex flex-col bg-white overflow-hidden box-border">
            <div className="h-full min-w-[20.5rem] w-full flex flex-col overflow-y-auto scroll-smooth scrollbar" id="chatdiv">
                {children}
            </div>
            <div className="absolute bottom-0 min-w-[20.5rem] w-full flex items-center bg-white">
                <input
                    className="min-w-[20.5rem] w-full h-14 rounded-full bg-gray-200/50 focus:outline-none px-6"
                    placeholder="Type Message Here!"
                    value={chatInput}
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => {
                        if (e.key == 'Enter') sendMessage();
                    }}
                />
                <span className="absolute bottom-[50%] translate-y-[50%] right-3.5 rounded-full w-8 h-8 bg-[#0b93f6] flex items-center justify-center" onClick={sendMessage}>
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
    'bg-[#e5e5ea] text-black ml-[0.5rem] md:ml-[1.625rem] self-start before:-left-[0.438rem] before:w-5 before:bg-[#e5e5ea] before:rounded-br-[1rem] after:-left-[1.625rem] after:w-[1.625rem] after:bg-white after:rounded-br-[0.625rem]';

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

export { ChatNavSection, ChattingPartner, ChatBubbleContainer, ChatBubble, ChatListItem };
