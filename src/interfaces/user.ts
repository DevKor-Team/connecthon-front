export interface User {
    id?: number;
    name: string;
    image?: string;
    position?: string;
    teamName?: string;
    introduction?: string;
    university?: string;
    major?: string;
    email?: string;
    instagram?: string;
    github?: string;
    career?: {
        startYear: number;
        startMonth: string;
        onProgress: boolean;
        endYear?: number;
        endMonth?: string;
        content: string;
    }[];
}
