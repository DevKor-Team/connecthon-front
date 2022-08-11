import { atom } from 'recoil';
import { User } from '../interfaces/user';

export interface UserState {
    isLogin: boolean;
    user: User | null;
}

const defaultValue = {
    isLogin: false,
    user: {
        type: '',
        id: '',
        name: '',
        email: '',
        team: '',
        profile: {
            link: {
                github: '',
                blog: '',
                instagram: '',
            },
            position: null,
            img: '',
            introduction: '',
            university: '',
            major: '',
            career: [''],
        },
        provider: undefined,
        isAdmin: false,
    },
};

export const userRecoilState = atom<UserState>({
    key: 'userState',
    default: defaultValue,
});
