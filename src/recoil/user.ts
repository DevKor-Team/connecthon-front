import { atom } from 'recoil';
import { User } from '../interfaces/user';

export interface UserState {
    isLogin: boolean;
    user: User | null;
}

const defaultValue = {
    isLogin: false,
    user: null,
};

export const userRecoilState = atom<UserState>({
    key: 'userState',
    default: defaultValue,
});
