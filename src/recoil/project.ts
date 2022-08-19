import { atom } from 'recoil';

export interface ProjectState {
    content: string;
    stack: string[];
}

const defaultValue = {
    content: '',
    stack: [''],
};

export const projectRecoilState = atom<ProjectState>({
    key: 'projectState',
    default: defaultValue,
});
