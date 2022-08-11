import { PositionType } from './position.types';
import { ProviderType } from './provider.types';

export interface User {
    type: string;
    id?: string;
    name: string;
    email?: string;
    team?: string;
    profile: {
        link?: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        position?: PositionType | null;
        img: string;
        introduction?: string;
        university?: string;
        major?: string;
        career: string[];
    };
    provider?: ProviderType;
    isAdmin?: boolean;
}
