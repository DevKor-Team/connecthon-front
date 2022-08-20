export default interface Participant {
    type?: string;
    id?: string;
    name: {
        first: string;
        last: string;
    };
    logo?: string;
    alias?: string;
    email?: string;
    level?: number;
    team?: {
        _id: string;
        name: string;
        users: string[];
        image: string;
        description: string;
    };
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
