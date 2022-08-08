import Layout from '../../../layouts/Layout';
import { useEffect, useState } from 'react';
import { CustomNextPage } from '../../../types/types';
import React from 'react';
import { Project } from '../../../interfaces/project';
import dynamic from 'next/dynamic';

const PostView = dynamic(() => import('../../../components/Viewer'));

interface teamMember {
    userName: string;
    image: string;
    position: string;
}

const MemberCard: React.FC = () => {
    const memberList: teamMember[] = [
        {
            userName: '김현아',
            image: '/designers/hyuna.png',
            position: 'PLANNER',
        },
        {
            userName: '유지오',
            image: '/designers/jio.png',
            position: 'DESIGNER',
        },
        {
            userName: '장태웅',
            image: '/designers/taewung.png',
            position: 'DESIGNER',
        },
        {
            userName: '김지윤',
            image: '/designers/jiyoon.png',
            position: 'DEVELOPER',
        },
        {
            userName: '정승연',
            image: '/designers/seungyeon.png',
            position: 'DEVELOPER',
        },
    ];

    return <div>member list is here</div>;
};

const contents: Project = {
    title: '해커톤 웹사이트 만들기',
    teamName: '우리는 뎁코',
    description: '누가봐도 1등',
    article: '음...',
    stack: ['파이썬', '제플린'],
};

const ProjectDetail: CustomNextPage = () => {
    const [modal, setModal] = useState<boolean>(false);
    const inputContents = '<h2>하이<h2>';

    return (
        <div className="my-[8rem]">
            <PostView contents={inputContents} />
        </div>
    );
};

ProjectDetail.Layout = Layout;
export default ProjectDetail;
