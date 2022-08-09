import { atom } from 'recoil';
import { Project } from '../interfaces/project';

const defaultValue = {
    id: 0,
    title: '',
    content: '',
    stack: [],
    team: '',
    likes: [],
    thumbnail: '',
};

export const projectRecoilState = atom<Project>({
    key: 'projectState',
    default: defaultValue,
    effects: [],
});
