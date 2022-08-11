import Layout from '../layouts/Layout';
import { useState, useEffect } from 'react';
import { CustomNextPage } from '../types/types';
import { ChatList, ChattingPartner, ChatBubbleContainer, ChatBubble, ChatListItem } from '../components/ChatComponent';
import { AxiosInstance } from 'axios';
import io from 'socket.io-client';

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

const Chat: CustomNextPage = () => {
    //selectedUser는 채팅방리스트에서 선택된 유저이며,
    //따라서 ChatListItem 컴포넌트에 setSelectedUser를 전달하여 onClick시 selectedUser가 업데이트 되도록 한다.
    const [selectedUser, setSelectedUser] = useState<string>('');
    const ENDPOINT = process.env.ENDPOINT as string;

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on('connect', () => {
            socket.emit('make session', {
                uid: 'userid', //loginRecoilState 사용해서 넣기
                userType: 'usertype', //마찬가지로 loginReocilState의 user의 type 넣기
            });
        });
    });

    return (
        <main className="flex items-center h-64 md:h-[calc(100vh-5rem)] mt-20 space-x-10">
            <ChatList userList={userList}>
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
