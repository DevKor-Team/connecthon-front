import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { useRouter } from 'next/router';
import { projectRecoilState } from '../../recoil/project';
import { TechStackMapping } from '../../constants/stackMapping';
import { isFunctionDeclaration } from 'typescript';
import { User } from '../../interfaces/user';
import { Project } from '../../interfaces/project';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('../../components/Viewer'), { ssr: false });

const ProjectDetail = () => {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [teamId, setTeamId] = useState<string>();
    const [projectState, setProjectState] = useRecoilState(projectRecoilState);

    const [teamName, setTeamName] = useState();
    const [userIdArr, setUserIdArr] = useState();
    const [teamUsers, setTeamUsers] = useState<User[]>();
    const tempTeamUser: User[] = [];
    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/user');
                if (response.status != 401) {
                    if (response.data.type == 'user') {
                        setLoginUserState({
                            isLogin: true,
                            user: { ...response.data, name: response.data.name.first + (response.data.name.last || '') },
                        });
                    } else if (response.data.type == 'company') {
                        setLoginUserState({
                            isLogin: true,
                            user: response.data,
                        });
                    }
                }
            } catch (err) {
                alert('로그인이 필요한 서비스입니다.');
                router.push('/login');
            }
        };

        getSessionUser();
    }, []);
    useEffect(() => {
        if (loginUserState.isLogin) {
            setTeamId(loginUserState.user?.team?._id);
            console.log(`로그인 성공했고, 팀 아이디 받아옴 : ${teamId}`);
        } else {
            console.log('로그인 실패 ');
        }
    }, [loginUserState]);

    useEffect(() => {
        console.log(`team id 있니 : ${teamId}`);
        if (teamId) {
            axiosInstance.get(`/project/${teamId}`).then(res => {
                setProjectState(res.data.data);
                console.log(`team id 로 부터 프로젝트 가져온다. ${res.data.data.content}`);
            });

            axiosInstance.get(`/teams/${teamId}`).then(res => {
                setTeamName(res.data.data.name);
                // team user 정보도 여기서 가져와야 한느데.. 잘 안되넹
            });
        }
    }, [teamId]);

    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem] flex flex-col md:flex-row border-2">
            <BiEditAlt
                className="text-2xl my-5 mx-4"
                onClick={() => {
                    router.push('/projects/edit');
                }}
            />
            <Viewer resultContent={projectState?.content ? projectState?.content : ''} />
        </div>
    );
};

export default ProjectDetail;
