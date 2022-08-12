export interface ChatRoomType {
    id: string;
    company: string;
    user: string;
    lastMsg: string;
    lastSend: Date;
}

export interface ChatDataType {
    room: string;
    sender: 'user' | 'company';
    when: Date;
    msg: string;
}
