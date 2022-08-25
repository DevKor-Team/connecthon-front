import React, { useState, useEffect, SetStateAction } from 'react';
import { ImPlus } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { ChatNavSection, ChattingPartner, ChatBubbleContainer, ChatBubble, ChatListItem } from '../components/ChatComponent';
import { IoMdClose } from 'react-icons/io';
import { ChatRoomType, MessageType } from '../interfaces/chat';
import { axiosInstance } from '../hooks/queries';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import ModalUser from '../components/ChatModalUser';
import { ChatUser } from '../interfaces/chat';

function UserListModal({
    userList,
    chatRooms,
    setIsModalOpen,
    setChatRooms,
}: {
    userList: ChatUser[];
    chatRooms: ChatRoomType[];
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
    setChatRooms: React.Dispatch<SetStateAction<ChatRoomType[]>>;
}) {
    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center h-[100%] w-[100vw] bg-ourBlack bg-opacity-70">
            <div className="w-[21rem] sm:w-[30rem] h-[30rem] bg-white rounded-2xl drop-shadow-2xl p-8 flex flex-col space-y-6">
                <section className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">UserList</h1>
                    <IoMdClose size={24} className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
                </section>
                <section className="w-full h-[95%] flex flex-col space-y-6 items-start overflow-auto scrollbar">
                    {userList.map(user => (
                        <ModalUser key={user.id} userInfo={user} setIsModalOpen={setIsModalOpen} setChatRooms={setChatRooms} />
                    ))}
                </section>
            </div>
        </div>
    );
}

function Chat() {
    //chatRooms: 사용자가 참여하고 있는 모든 채팅방 리스트
    //selectedChatRoom: ChatRooms 중에서 선택된 채팅방 => 채팅방 선택 시 해당 채팅방의 roomid, 상대방의 이름, 상대방의 프사가 저장됨.
    //따라서 ChatListItem 컴포넌트에 setSelectedUser를 전달하여 onClick시 selectedUser가 업데이트 되도록 한다.
    //messages: 선택된 채팅방의 모든 메시지들을 담은 배열. (ChatListItem에 전달된 room의 id를 이용하여 GET 해오는 구조)
    const [selectedChatRoom, setSelectedChatRoom] = useState<{ roomid: string; name: string; img: string }>({ roomid: '', name: '', img: '' });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [call, setCall] = useState<boolean>(true);

    //모바일 화면일 때 채팅리스트/채팅방을 오가기 위한 상태
    const [mobileChat, setMobileChat] = useState<boolean>(false);

    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    //회사가 New Conversation 클릭 시 넘겨줄 유저리스트 (새롭게 채팅 할 유저를 찾는 데 사용)
    const [userList, setUserList] = useState<ChatUser[]>([]);

    //채팅방 리스트 검색 관련
    const [input, setInput] = useState<string>('');
    const [enterPressed, setEnterPressed] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<ChatRoomType[]>([]);

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
            setSearchResult(
                loginUserState.user?.type == 'company'
                    ? chatRooms.filter(room => (room.userName.first + room.userName.last).includes(keyword))
                    : chatRooms.filter(room => room.companyName.includes(keyword)),
            );
            setInput('');
            searchinput.blur();
        } else return;
    }

    // 가장 먼저 현재 접속한 유저 정보 받아서 Recoil State로 저장하기.
    // 로그인하지 않은 유저는 로그인 페이지로 돌려보냅니다.
    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserState({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserState({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                alert('로그인이 필요한 서비스입니다.');
                router.push('/login');
            }
        };

        getSessionUser();
    }, []);

    //로그인한 유저가 참여중인 모든 채팅방을 불러와서 저장합니다.
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                await axiosInstance.get('/chat').then(res => {
                    if (JSON.stringify(chatRooms) == JSON.stringify(res.data.data)) {
                        return;
                    } else {
                        setChatRooms(res.data.data);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchChatRooms();
    }, [chatRooms, selectedChatRoom, messages]);

    //모든 참가자 리스트를 불러와서 저장합니다. (추후 New Conversation 모달에 전달할 배열)
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                await axiosInstance.get('/users').then(res => setUserList(res.data.data));
            } catch (err) {
                console.log(err);
            }
        };

        fetchParticipants();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCall(true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedChatRoom.roomid == '') {
            const fetchChatRooms = async () => {
                try {
                    await axiosInstance.get('/chat').then(res => {
                        if (JSON.stringify(chatRooms) == JSON.stringify(res.data.data)) {
                            return;
                        } else {
                            setChatRooms(res.data.data);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            };

            fetchChatRooms();
        } else {
            axiosInstance.get(`/chat/${selectedChatRoom.roomid}`).then(res => {
                if (JSON.stringify(res.data.data.msgs[0]) === JSON.stringify(messages[0])) {
                    return;
                } else {
                    setMessages(res.data.data.msgs);
                }
            });
        }

        setCall(false);
    }, [call]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (selectedChatRoom.roomid == '') {
    //             const fetchChatRooms = async () => {
    //                 try {
    //                     await axiosInstance.get('/chat').then(res => {
    //                         if (JSON.stringify(chatRooms) == JSON.stringify(res.data.data)) {
    //                             return;
    //                         } else {
    //                             setChatRooms(res.data.data);
    //                         }
    //                     });
    //                 } catch (err) {
    //                     console.log(err);
    //                 }
    //             };

    //             fetchChatRooms();
    //         } else {
    //             axiosInstance.get(`/chat/${selectedChatRoom.roomid}`).then(res => {
    //                 if (JSON.stringify(res.data.data.msgs[0]) === JSON.stringify(messages[0])) {
    //                     console.log('같습니다!');
    //                     return;
    //                 } else {
    //                     console.log('다릅니다!');
    //                     console.log(`새로받은거의 0번째: ${JSON.stringify(res.data.data.msgs[0])}`);
    //                     console.log(`원래꺼의 0번째: ${JSON.stringify(messages[0])}`);
    //                     setMessages(res.data.data.msgs);
    //                 }
    //             });
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [selectedChatRoom]);

    useEffect(() => {
        const chatDiv = document.getElementById('chatdiv') as HTMLDivElement;
        chatDiv.scrollTop = chatDiv?.scrollHeight;
    }, [messages]);

    return (
        <div className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem] relative">
            {isModalOpen ? <UserListModal userList={userList} chatRooms={chatRooms} setIsModalOpen={setIsModalOpen} setChatRooms={setChatRooms} /> : null}
            <main className="flex items-center h-[calc(100vh-5rem)] mt-20 md:space-x-10 ">
                {/* 채팅방 리스트 섹션 */}
                <ChatNavSection mobileChat={mobileChat} chatRoomList={chatRooms} setIsModalOpen={setIsModalOpen}>
                    <button
                        className={`${
                            loginUserState.user?.level ? (loginUserState.user.level >= 1 ? '' : 'hidden') : 'hidden'
                        } w-full h-12 md:h-16 rounded-md flex justify-center space-x-8 items-center bg-ourBlue hover:bg-blue-600 mb-8`}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <ImPlus size={14} fill="white" />
                        <span className="text-white font-medium">New Conversation</span>
                    </button>
                    <div className="self-start mb-4 flex space-x-3 items-center">
                        <h1 className="text-3xl font-bold">Chats</h1>
                        <span>
                            <HiOutlineRefresh
                                size={24}
                                className="cursor-pointer"
                                onClick={() => {
                                    setEnterPressed(false);
                                    const fetchChatRooms = async () => {
                                        try {
                                            await axiosInstance.get('/chat').then(res => {
                                                if (JSON.stringify(chatRooms) == JSON.stringify(res.data.data)) {
                                                    return;
                                                } else {
                                                    setChatRooms(res.data.data);
                                                }
                                            });
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    };

                                    fetchChatRooms();
                                }}
                                title="Refresh Chat List"
                            />
                        </span>
                    </div>
                    <div className="relative w-full mb-4">
                        <input
                            placeholder="Search Here"
                            className="h-12 w-full bg-gray-200 rounded-md px-4 focus:outline-none"
                            value={input}
                            onChange={onInputChange}
                            onKeyDown={e => searchUser(e)}
                            id="chat-search-input"
                        />
                        <span className="absolute top-3 right-4">
                            <FiSearch size={24} />
                        </span>
                    </div>
                    <ul className="w-full h-full flex flex-col items-start space-y-3 overflow-y-auto scrollbar">
                        {(enterPressed ? searchResult : chatRooms).map(room => (
                            <ChatListItem
                                key={room.id}
                                roomInfo={room}
                                messages={messages}
                                setMobileChat={setMobileChat}
                                setMessages={setMessages}
                                selectedChatRoom={selectedChatRoom}
                                setSelectedChatRoom={setSelectedChatRoom}
                            />
                        ))}
                    </ul>
                </ChatNavSection>

                {/* 실제 채팅 내용이 오가는 채팅방 */}
                <div className={`${mobileChat ? 'flex flex-col' : 'hidden'} md:flex md:flex-col md:justify-center w-full h-full overflow-hidden box-border`}>
                    {selectedChatRoom.name == '' ? (
                        <div className="w-full h-[90%] flex justify-center items-center bg-ourWhite rounded-2xl font-base text-base lg:text-xl" id="chatdiv">
                            Chats 리스트에서 대화를 나눌 상대방을 선택해 주세요
                        </div>
                    ) : (
                        <>
                            <ChattingPartner setMobileChat={setMobileChat} selectedChatRoom={selectedChatRoom} />
                            <ChatBubbleContainer selectedChatRoom={selectedChatRoom} setMessages={setMessages}>
                                <>
                                    {messages
                                        ?.slice(0)
                                        .reverse()
                                        .map((msg, idx) => (
                                            <ChatBubble key={idx} type={msg.sender == loginUserState.user?.type ? 'send' : 'receive'}>
                                                {msg.msg}
                                            </ChatBubble>
                                        ))}
                                </>
                            </ChatBubbleContainer>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Chat;
