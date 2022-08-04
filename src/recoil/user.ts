import { atom } from 'recoil';
import { User } from '../interfaces/user';

export interface UserState {
    accessToken: string | null;
    user: User | null;
}

const defaultValue = {
    accessToken: null,
    user: null,
};

export const userRecoilState = atom<UserState>({
    key: 'userState',
    default: defaultValue,
});
