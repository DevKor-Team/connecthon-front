import { PositionType } from './position.types';
import { ProviderType } from './provider.types';

export interface Company {
    type: string;
    id?: string;
    name: string;
    profile: {
        link?: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        position?: PositionType;
        img: string;
        introduction?: string;
        university?: string;
        major?: string;
        career?: string[];
    };
    provider?: ProviderType;
    isAdmin?: boolean;
}
