export interface Company {
    id?: string;
    name: string;
    logo?: string;
    alias?: string;
    level?: number;
    profile?: {
        link?: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        introduction?: string;
        university?: string;
        major?: string;
        career?: string[];
        _id?: string;
    };
}
