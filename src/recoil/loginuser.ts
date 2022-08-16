import { atom } from 'recoil';
import { User } from '../interfaces/user';

export interface LoginState {
    isLogin: boolean;
    user: User | null;
}

const defaultValue = {
    isLogin: false,
    user: {
        type: 'user',
        id: '',
        name: '',
        email: '',
        team: {
            _id: '',
            name: '',
            users: [],
            image: '',
            description: '',
        },
        profile: {
            link: {
                github: '',
                blog: '',
                instagram: '',
            },
            position: 'developer',
            img: '',
            introduction: '',
            university: '',
            major: '',
            career: [''],
            _id: '',
        },
        provider: 'none',
        isAdmin: false,
        oauthid: '',
    },
};

export const loginRecoilState = atom<LoginState>({
    key: 'loginState',
    default: defaultValue,
});
