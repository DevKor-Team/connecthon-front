import { atom } from 'recoil';

export interface ProjectState {
    content: string;
    stack: string[];
}

const defaultValue = {
    content: '',
    stack: [''],
};

export const tempProjectRecoilState = atom<ProjectState>({
    key: 'tempProjectState',
    default: defaultValue,
});
