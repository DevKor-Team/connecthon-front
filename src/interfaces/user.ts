export interface User {
    id?: number;
    name: string;
    email: string;
    image?: string;
    position?: string;
    teamName?: string;
    profile: {
        link: {
            github?: string;
            blog?: string;
            instagram?: string;
        };
        img: string;
        introduction?: string;
        university?: string;
        major?: string;
        career: string[];
    };
}
