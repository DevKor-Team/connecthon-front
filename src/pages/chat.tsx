import Layout from '../layouts/Layout';
import React, { useState, useEffect } from 'react';
import { CustomNextPage } from '../types/types';
import { ChatList, ChattingPartner, ChatBubbleContainer, ChatBubble, ChatListItem } from '../components/ChatComponent';
import io from 'socket.io-client';
import getConfig from 'next/config';
import { IoMdClose } from 'react-icons/io';
import { ChatRoomType, ChatDataType } from '../interfaces/chat';
import { axiosInstance } from '../hooks/queries';

const { publicRuntimeConfig } = getConfig();

const userList = [
    { name: '안수진', team: '해커톤 숨막혀요' },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '정호진',
        team: 'TS 안 쓸건가요?',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
    {
        name: '노정훈',
        team: '풀스택 개발자 할거에오',
    },
];

function UserListModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center h-[100%] w-[100vw] bg-ourBlack bg-opacity-70">
            <div className="w-[50rem] h-[30rem] bg-white rounded-2xl drop-shadow-2xl p-8">
                <section className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl">UserList</h1>
                    <IoMdClose size={24} className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
                </section>
            </div>
        </div>
    );
}

const Chat: CustomNextPage = () => {
    //selectedUser는 채팅방리스트에서 선택된 유저이며,
    //따라서 ChatListItem 컴포넌트에 setSelectedUser를 전달하여 onClick시 selectedUser가 업데이트 되도록 한다.
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const ENDPOINT = publicRuntimeConfig.ENDPOINT;

    let sendMessage;
    let disconnectSocket;

    useEffect(() => {
        //채팅방 리스트 받아오기
        //axiosInstance.get('/chat').then(res => setChatRoomList(res));

        const socket = io(ENDPOINT);

        socket.on('connect', () => {
            socket.emit('make session', {
                uid: 'userid', //loginRecoilState 사용해서 넣기
                userType: 'usertype', //마찬가지로 loginReocilState의 user의 type 넣기
            });
        });

        socket.on('error', () => {
            //제대로 안 보내졌다고 띄워주세요.
        });

        socket.on('receive', data => {
            /*
		    data = {
			room: roomid,
			sender: 'user'|'company',
			when: Date, 
			msg: string,
		}
		*/
            //채팅 메세지 왔으니까 띄워주시면 될 듯
            //data 구조 위와 동일, 서버에 메세지 보내는 event
            sendMessage = data => {
                socket.emit('send', data);
            };

            disconnectSocket = socket.disconnect;
        });
    });

    return (
        <main className="relative flex items-center h-64 md:h-[calc(100vh-5rem)] mt-20 space-x-10">
            {isModalOpen ? <UserListModal setIsModalOpen={setIsModalOpen} /> : null}
            <ChatList userList={userList} setIsModalOpen={setIsModalOpen}>
                {userList.map(user => (
                    <ChatListItem key={user.name} username={user.name} team={user.team} setSelectedUser={setSelectedUser} />
                ))}
            </ChatList>
            <div className="flex flex-col justify-center w-full h-full overflow-hidden box-border">
                <ChattingPartner selectedUser={selectedUser} />
                <ChatBubbleContainer>
                    <ChatBubble type="send">안수진~</ChatBubble>
                    <ChatBubble type="receive">헐 머야 대박!</ChatBubble>
                    <ChatBubble type="send">이거봐봐~ 아이폰메세지 따라했다!</ChatBubble>
                    <ChatBubble type="receive">역시.. TF팀으로 잘 데려왔따ㅠㅠ LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!</ChatBubble>
                    <ChatBubble type="send">역시.. TF팀으로 잘 데려왔따ㅠㅠ LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!</ChatBubble>
                    <ChatBubble type="receive">역시.. TF팀으로 잘 데려왔따ㅠㅠ LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!</ChatBubble>
                    <ChatBubble type="send">역시.. TF팀으로 잘 데려왔따ㅠㅠ LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!</ChatBubble>
                    <ChatBubble type="receive">역시.. TF팀으로 잘 데려왔따ㅠㅠ LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!LGTM!</ChatBubble>
                </ChatBubbleContainer>
            </div>
        </main>
    );
};

Chat.Layout = Layout;
export default Chat;
