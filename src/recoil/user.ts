import { atom } from 'recoil';
import { User } from '../interfaces/user';
import { PositionType } from '../interfaces/position.types';

export interface UserState {
    isLogin: boolean;
    user: User | null;
}

const defaultValue = {
    isLogin: false,
    user: {
        id: 0,
        name: '',
        email: '',
        team: '',
        profile: {
            link: {
                github: '',
                blog: '',
                instagram: '',
            },
            position: PositionType.developer,
            img: '',
            introduction: '',
            university: '',
            major: '',
            career: [''],
        },
    },
};

export const userRecoilState = atom<UserState>({
    key: 'userState',
    default: defaultValue,
});
