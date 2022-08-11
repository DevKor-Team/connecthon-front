import { atom } from 'recoil';
import { User } from '../interfaces/user';
import { PositionType } from '../interfaces/position.types';
import { ProviderType } from '../interfaces/provider.types';

export interface LoginState {
    isLogin: boolean;
    user: User | null;
}

const defaultValue = {
    isLogin: false,
    user: {
        type: 'user',
        id: '',
        name: {
            first: '',
            last: '',
        },
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
        provider: ProviderType.none,
        isAdmin: false,
    },
};

export const loginRecoilState = atom<LoginState>({
    key: 'loginState',
    default: defaultValue,
});
