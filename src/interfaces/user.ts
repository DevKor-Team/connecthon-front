import { PositionType } from './position.types';

export interface User {
    id?: number;
    name: string;
    email: string;
    team?: string;
    profile: {
        link: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        position?: PositionType;
        img: string;
        introduction?: string;
        university?: string;
        major?: string;
        career: string[];
    };
}
