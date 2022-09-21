import type { NextApiRequest, NextApiResponse } from 'next';

export const TeamListData = [
    {
        id: '62fa4a28c4dd47bee8327262',
        name: 'Staff',
        users: [
            '62fa58184d39f9a43f6d857e',
            '62f6691221e438812302476d',
            '62f650245d26a1cce3b22ff9',
            '630039f39f84cefc8ea134da',
            '630046f79f84cefc8ea1367c',
            '62fb4107bd976e2245d4416a',
            '62f6978b2bce4847ebac1df4',
        ],
        description: '해커톤 준비위원회 최고!!',
        image: 'https://connecthon-image-s3.s3.ap-northeast-2.amazonaws.com/7c6e6550-2357-11ed-b942-450c904d646c',
    },
    {
        id: '62fe7563c9c904b725f26940',
        name: '스물 다섯, 스물 하나',
        users: ['62fc6fedfda0c93b99131923', '6303b38a35b0e05a7e944236', '62fb9994bd976e2245d44547', '62fd9a35a1a10a92bdefc848'],
        description: '',
    },
    {
        id: '62fe7584c9c904b725f2695c',
        name: '오뉴월 병아리',
        users: ['62fb9e2dbd976e2245d4469e', '62fbac6ebd976e2245d44928', '62fb984abd976e2245d444b4', '62fe5ba8c9c904b725f25e1c', '6300e8549f84cefc8ea1f4b7'],
        description: '오뉴월 병아리 하루 볕이 새롭다',
        image: '/projectlogo/oneworl-image.png',
    },
    {
        id: '62fe7584c9c904b725f26962',
        name: 'Devel5per',
        users: ['62fcb78873e68b5cf47036c4', '6300e8779f84cefc8ea1f5c0', '62fcaac373e68b5cf4703648', '62fcce0e42513c5865bfe55f', '62fb9a68bd976e2245d44594'],
        description: '1기획 4개발, 근데 개발은 5명이 가능한.',
    },
    {
        id: '62fe7584c9c904b725f2696c',
        name: '고수ㅋ',
        users: ['6300e0319f84cefc8ea1cb83', '62fb9834bd976e2245d444a3', '6300e8659f84cefc8ea1f50b', '62fcc89cc0afa79615f7b594', '62fbba84bd976e2245d449b3'],
        description: '',
    },
    {
        id: '62fe7584c9c904b725f26975',
        name: 'Just alpha',
        users: ['62fba10ebd976e2245d4478d', '62fd8702a1a10a92bdefc807', '62fc3eefbd976e2245d60c6f', '63019d1435b0e05a7e90e64a', '62fbd6f5bd976e2245d44bfa'],
        description: '',
    },
    {
        id: '62fe7584c9c904b725f26988',
        name: '순항',
        users: ['62fbadf9bd976e2245d4493a', '62fd8bcfa1a10a92bdefc816', '62fd7fa974f9a64f05a11be3'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f26999',
        name: 'Epoch',
        users: ['62fc2777bd976e2245d60c0e', '6301a8fb35b0e05a7e91492f', '62fbbdbcbd976e2245d449fa', '62fb9ac4bd976e2245d445c4', '62fc2b47bd976e2245d60c2f'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f2699b',
        name: 'TOP',
        users: ['62fbaa1dbd976e2245d44892', '62fba4a3bd976e2245d44858', '62fe590bc9c904b725f2578c', '62fe20d35b5b9934943a0862'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f2699d',
        name: '새벽노을',
        users: ['6300e81d9f84cefc8ea1f3a6', '62fc730afda0c93b99131932', '62fba014bd976e2245d4471b', '62fbc474bd976e2245d44a48', '62fc5b5ebd976e2245d60d9c'],
        description: '이웃과의 소통을 Re-do, Do-re ',
        image: '/projectlogo/dore-image.png',
    },
    {
        id: '62fe7585c9c904b725f269a1',
        name: '핫식스',
        users: ['62fba469bd976e2245d44843', '62fcc04d73e68b5cf4703775', '62fe0a19551fe4fff16c6daa'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f269a3',
        name: 'E렇게 N너지가 넘치조',
        users: ['62fcc05073e68b5cf470377b', '62fc929473e68b5cf4703043', '62ff4380c9c904b725f36054', '62ff96ee9f84cefc8ea0a7ed'],
        description: 'E렇게 N너지가 넘쳐흐르는 EN Overflow',
        image: '/projectlogo/enoverflow-image.png',
    },
    {
        id: '62fe7585c9c904b725f269a5',
        name: 'MDU',
        users: ['62fd051c1690f43bc96a25d1', '62fbcd8dbd976e2245d44b7f', '630138469f84cefc8ea55bf1', '62fb9826bd976e2245d44499'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f269a7',
        name: 'Flawless',
        users: ['62fb9860bd976e2245d444c4', '62fe30325b5b9934943a0d7a', '6300e8ba9f84cefc8ea1f71a', '62fb9881bd976e2245d444ca', '62fd84a1a1a10a92bdefc7ec'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f269ad',
        name: '청바지',
        users: ['62fb9faabd976e2245d44712', '62fee416c9c904b725f2b181', '62fe22425b5b9934943a0889', '62fb9923bd976e2245d444ff'],
        description: '',
    },
    {
        id: '62fe7585c9c904b725f269af',
        name: 'PARTY LAB',
        users: ['62fc8353fda0c93b99131959', '62fbb73fbd976e2245d449a6', '62fcd6e8da5029f6dd96f413', '62fc879a4b018a5e5c5dd69d'],
        description: '🐾 소중한 반려동물을 위한 수의사/행동전문가와의 Q&A, 유료 화상 상담 서비스 ',
        image: '/projectlogo/peteran-image.png',
    },
    {
        id: '62fe7585c9c904b725f269b9',
        name: '복음자리딸기잼',
        users: ['62fbd257bd976e2245d44bed', '62ff5bbbc9c904b725f3611e', '62fe42e35b5b9934943a1ef8', '62fb98f1bd976e2245d444ea', '62fc6e03fda0c93b991318ed'],
        description: '',
        image: '/projectlogo/strawberryjam-image.png',
    },
    {
        id: '62fe7585c9c904b725f269b7',
        name: 'NO.1',
        users: ['62fca33773e68b5cf4703637', '62fcc1e173e68b5cf4703792', '62fc8d8573e68b5cf4702f27', '62fcc68473e68b5cf4703854'],
        description: '',
    },
    {
        id: '62ff8278c9c904b725f363bb',
        name: '영민해',
        users: ['630137a09f84cefc8ea55837', '62fb9964bd976e2245d4451d', '62fb98acbd976e2245d444d5', '62fddc58a590f164ac6c91a2', '62fb9d9fbd976e2245d4466e'],
        description: '',
    },
    {
        id: '62ff8286c9c904b725f363c1',
        name: '토요코인노래방',
        users: ['6300e88e9f84cefc8ea1f5fa', '62ff0a0bc9c904b725f2d1af', '62fc27dfbd976e2245d60c1c', '63019b7335b0e05a7e90dce4', '62fe3c575b5b9934943a1121'],
        description: '팀 소개 테스트중',
        image: '/projectlogo/toyokoinn-image.png',
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        data: TeamListData,
    });
}
