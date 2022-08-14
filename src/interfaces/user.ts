import { PositionType } from './position.types';
import { ProviderType } from './provider.types';

export interface User {
    type?: string;
    id?: string;
    name: string;
    email?: string;
    team?: string;
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
