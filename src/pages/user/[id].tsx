import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Participant from '../../interfaces/participant';
import { axiosInstance } from '../../hooks/queries';
import { FiEdit } from 'react-icons/fi';
import { FiMail, FiInstagram, FiGithub, FiHome } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';

function IndividualParticipant() {
    const router = useRouter();
    const { id } = router.query;

    const [individual, setIndividual] = useState<Participant>();

    const [onMail, setOnMail] = useState<boolean>(false);
    const [onInstagram, setOnInstagram] = useState<boolean>(false);
    const [onGithub, setOnGithub] = useState<boolean>(false);

    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    useEffect(() => {
        try {
            axiosInstance.get(`/users/${id}`).then(res => setIndividual(res.data.data));
        } catch (e) {
            console.log(e);
        }
    }, []);

    //어차피 이 함수를 쓸 수 있는 사용자는 회사 뿐이니, companyId에는 loginUserState.user.id를 넣어주면 된다!
    async function createChatRoom(companyId?: string, participantId?: string[] | string) {
        try {
            await axiosInstance.post('/chat/create', { user: participantId, company: companyId });
        } catch (e) {
            alert('해당 참가자와의 채팅방이 이미 존재합니다!');
        }
    }

    return (
        <main className="md:px-16 lg:px-20 xl:px-[13.375rem]">
            <div className="mt-[8rem] md:mt-[5rem] flex w-[100%] items-center md:h-auto">
                <div className="grow">
                    <div className="flex mb-10 flex-col items-center md:flex-row">
                        <div className="w-[80%] md:w-[30%] rounded-[1.25rem] min-h-[50rem] bg-ourWhite drop-shadow-lg p-[1rem] max-w-[25rem] z-10 min-w-[15rem]">
                            <div className="flex flex-col items-center">
                                {individual?.profile?.img ? (
                                    <img src={individual?.profile?.img} alt="my photo" className="rounded-full w-[50%] my-2" />
                                ) : (
                                    <img src="/profile-default.jpg" alt="default-profile" className="rounded-full w-[50%] my-2" />
                                )}
                                <div className="flex items-center mt-2">
                                    <h4 className={`text-${individual?.profile?.position} mx-1`}>{individual?.profile?.position}</h4>
                                </div>
                                <h3 className="font-bold text-[1.75rem] my-1">{`${individual?.name.first}${individual?.name.last || ''}`}</h3>
                                {/* <p className="mt-1 mb-5">{loginUserState.user?.team?.name ? `TEAM ${loginUserState.user?.team.name}` : '팀명을 정해주세요'}</p> */}
                                <p className="mt-1 mb-5">{individual?.team ? `TEAM ${individual?.team.name}` : '팀명을 정해주세요'}</p>
                            </div>

                            <div className="flex flex-col mx-5 pt-1 pb-10 w-[90%] border-t-2">
                                <div className="my-4">
                                    <h4 className="font-semibold">한 줄 소개</h4>
                                    <p>{individual?.profile?.introduction}</p>
                                </div>
                                <div className="my-4">
                                    <h4 className="font-semibold">학력</h4>
                                    <p>{`${individual?.profile?.university || ''} ${individual?.profile?.major || ''}`}</p>
                                </div>
                                <div className="my-4">
                                    <h4 className="font-semibold mb-1">경력</h4>
                                    <div>{individual?.profile?.career ? individual?.profile?.career.map(crr => <p>{crr}</p>) : null}</div>
                                </div>

                                <h4 className="font-semibold my-2">SNS</h4>
                                <div className="flex items-center space-x-4 relative">
                                    <div>
                                        <FiMail
                                            className="text-2xl cursor-pointer"
                                            onMouseOver={() => {
                                                setOnMail(true);
                                            }}
                                            onMouseOut={() => {
                                                setOnMail(false);
                                            }}
                                            onClick={() => {
                                                if (individual?.email) {
                                                    window.open(`mailto:${individual?.email}`);
                                                } else {
                                                    alert('해당 참가자의 이메일 정보가 없습니다!');
                                                }
                                            }}
                                        />
                                        {onMail ? <img src="/mail-text.svg" alt="mail-text" className="absolute -left-3 w-[3rem] drop-shadow-lg" /> : null}
                                    </div>
                                    <div className="mx-2">
                                        <FiInstagram
                                            className="text-2xl cursor-pointer"
                                            onMouseOver={() => {
                                                setOnInstagram(true);
                                            }}
                                            onMouseOut={() => {
                                                setOnInstagram(false);
                                            }}
                                            onClick={() => {
                                                if (individual?.profile?.link?.instagram) {
                                                    window.open(`https://instagram.com/${individual?.profile?.link?.instagram}`);
                                                } else {
                                                    alert('해당 참가자의 인스타그램 계정 정보가 없습니다!');
                                                }
                                            }}
                                        />

                                        {onInstagram ? <img src="/instagram-text.svg" alt="mail-text" className="absolute left-2.5 drop-shadow-lg" /> : null}
                                    </div>
                                    <div>
                                        <FiGithub
                                            className="text-2xl cursor-pointer"
                                            onMouseOver={() => {
                                                setOnGithub(true);
                                            }}
                                            onMouseOut={() => {
                                                setOnGithub(false);
                                            }}
                                            onClick={() => {
                                                if (individual?.profile?.link?.github) {
                                                    window.open(`https://github.com/${individual?.profile?.link.github}`);
                                                } else {
                                                    alert('해당 참가자의 Github 계정 정보가 없습니다!');
                                                }
                                            }}
                                        />

                                        {onGithub ? <img src="/github-text.svg" alt="github-text" className="absolute left-[4rem] drop-shadow-lg" /> : null}
                                    </div>
                                    <div>
                                        <FiHome
                                            className="text-2xl cursor-pointer"
                                            onClick={() => {
                                                if (individual?.profile?.link?.blog) {
                                                    window.open(`${individual?.profile?.link?.blog}`);
                                                } else {
                                                    alert('해당 참가자의 블로그 정보가 없습니다!');
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    className={`${
                                        loginUserState.user?.level ? (loginUserState.user.level >= 1 ? '' : 'hidden') : 'hidden'
                                    } my-8 flex justify-center py-2 bg-ourBlue text-white rounded-md`}
                                    onClick={() => {
                                        createChatRoom(loginUserState.user?.id, id);
                                        router.push('/chatting');
                                    }}
                                >
                                    START CHAT
                                </button>
                            </div>
                        </div>

                        <div className="mt-[5rem] md:mt-0 md:w-[70%] sm:h-[70vh] md:h-auto md:flex md:flex-col md:justify-end min-w-[24rem] max-w-[100rem] self-end">
                            <div className="flex flex-col bg-ourWhite rounded-[1.25rem] drop-shadow-lg w-[80%] h-[60%] sm:w-[100%] md:min-h-[46rem] md:h-[80vh] p-[1rem] mx-auto">
                                <div className="grow p-3 md:pl-5 md:pt-5 md:pr-0 md:pb-0">
                                    <h4 className="my-1 flex items-center space-x-2 mb-5">
                                        <p className="text-2xl md:text-3xl font-bold">{individual?.team ? `TEAM ${individual?.team.name}` : '팀명을 정해주세요'}</p>{' '}
                                    </h4>
                                    <h3 className="text-lg tracking-normal">{individual?.team?.description}</h3>
                                    <div className="flex justify-center m-auto sm:w-[50%] md:w-[80%] ">
                                        <img src={individual?.team?.image ? individual?.team?.image : `/project-ex.svg`} alt="project-example" className="w-[80%] max-w-[33rem]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default IndividualParticipant;
