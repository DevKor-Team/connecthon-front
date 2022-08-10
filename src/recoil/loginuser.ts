import { atom } from 'recoil';
import { User } from '../interfaces/user';
import { Company } from '../interfaces/company';
import { PositionType } from '../interfaces/position.types';
import { ProviderType } from '../interfaces/provider.types';

export interface LoginState {
    isLogin: boolean;
    user: User | Company | null;
}

const defaultValue = {
    isLogin: false,
    user: {
        type: 'user',
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
