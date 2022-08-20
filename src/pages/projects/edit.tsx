import dynamic from 'next/dynamic';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Tag from '../../components/Tag';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { axiosInstance } from '../../hooks/queries';
import { TechStack } from '../../interfaces/techStack';
import { NextPage } from 'next';
import { projectRecoilState } from '../../recoil/project';
import { TechStackMapping } from '../../constants/stackMapping';

const TextEditor = dynamic(() => import('../../components/Editor'), { ssr: false });

const ProjectEdit: NextPage = () => {
    const router = useRouter();
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);
    const [project, setProject] = useRecoilState(projectRecoilState);
    const [teamId, setTeamId] = useState<string>();

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
                        alert('참가자 계정만 접근 가능한 페이지입니다.');
                        router.back();
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
        }
    }, [loginUserState]);

    useEffect(() => {
        axiosInstance.get(`/temp/${teamId}`).then(res => {
            setProject({
                content: res.data.data.content,
                stack: res.data.data.stack,
            });
            console.log(`temp 저장된거 가져다줭 : ${res.data.data.content}`);
            console.log(`temp 저장된거 가져다줭 : ${res.data.data.stack}`);
        });
    }, [teamId]);

    // temp get을 해야 함
    // temp save
    // project save

    return (
        <div className="mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem]">
            <div></div>
        </div>
    );
};

export default ProjectEdit;
