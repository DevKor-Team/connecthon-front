import { User } from '../interfaces/user';

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

export interface MessageType {
    sender: 'user' | 'company';
    when: Date;
    msg: string;
}

export interface ChatDataType {
    room: string;
    sender: 'user' | 'company';
    when: Date;
    msg: string;
}

export interface ChatTeamType {
    id: string;
    name: string;
    users: User[];
    description: string;
    image: string;
}

export interface ChatUser {
    type?: string;
    id?: string;
    name: {
        first: string;
        last: string;
    };
    email?: string;
    team?: ChatTeamType;
    profile?: {
        link?: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        position?: string;
        img?: string;
        introduction?: string;
        university?: string;
        major?: string;
        career?: string[];
        _id?: string;
    };
    provider?: string;
    isAdmin?: boolean;
    oauthid?: string;
}
