export interface ChatRoomType {
    id: string;
    user: string;
    userImg: string;
    userName: string;
    company: string;
    companyImg: string;
    companyName: string;
    lastMsg: string;
    lastSend: Date;
}

export interface ChatDataType {
    room: string;
    sender: 'user' | 'company';
    when: Date;
    msg: string;
}
