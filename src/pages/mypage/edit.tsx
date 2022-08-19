import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../layouts/Layout';
import Dropzone from 'react-dropzone';
import { FiMail, FiInstagram, FiGithub, FiHome } from 'react-icons/fi';
import { AiOutlinePlusCircle, AiOutlineClose, AiOutlineConsoleSql } from 'react-icons/ai';
import { TbTrashOff } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { axiosInstance } from '../../hooks/queries';

interface Team {
    id: string;
    name: string;
    user?: string[];
    description?: string;
    image?: string;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

const ProfileEdit = () => {
    //로그인 Recoil State
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    //라우터
    const router = useRouter();

    //파일
    const [file, setfile] = useState<string>();

    //모달
    const [onModal, setOnModal] = useState<boolean>(false);

    //경력(career) 관련
    const [numCareerInput, setNumCareerInput] = useState<number>(1);

    //img 관련
    const aspect = 1;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [onProfileImage, setOnProfileImage] = useState<boolean>(false);
    // const teamId = loginUserState.user?.team?._id;
    const [teamList, setTeamList] = useState<{ id: string; name: string }[]>([{ id: '', name: '' }]);

    //useForm에 최종적으로 들어갈 오브젝트타입
    type FormValues = {
        name: string;
        email: string;
        team: string;
        github: string;
        blog: string;
        instagram: string;
        introduction: string;
        img: string;
        position: string;
        university: string;
        major: string;
        career: string[];
        teamName: string;
    };

    //react-hook-form
    const { control, register, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        const updatedProfile = {
            link: {
                github: data.github,
                blog: data.blog,
                instagram: data.instagram,
            },
            introduction: data.introduction,
            img: loginUserState.user?.profile?.img,
            position: data.position,
            university: data.university,
            major: data.major,
            career: data.career.slice(0, numCareerInput),
            _id: loginUserState.user?.profile?._id,
        };
        console.log(loginUserState.user?.id);
        axiosInstance
            .put(`/users/${loginUserState.user?.id}/profile`, {
                profile: updatedProfile,
                email: data.email,
                name: { first: data.name.substring(0, 1), last: data.name.substring(1) },
            })
            .then(res => console.log(res.data));

        // 팀 이름을 받으면 이렇게 데이터를 전송할 거에요!
        axiosInstance
            .put(`/teams/${data.teamName}/users`, {
                data: {
                    users: loginUserState.user?.id,
                },
            })
            .then(res => console.log(res.data));

        alert('프로필이 수정되었습니다!');
        console.log(loginUserState.user);
    };

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
                if (loginUserState.isLogin == false) {
                    alert('로그인이 필요한 서비스입니다.');
                    router.push('/login');
                }
            }
        };

        getSessionUser();
    }, []);

    useEffect(() => {
        // axiosInstance.get('/teams').then(res => console.log(`team 정보 all : ${res.data.data[1].name}`));
        axiosInstance.get('/teams').then(res => {
            if (res.data.data) {
                res.data.data.map((x: Team) => {
                    setTeamList(teamList => [...teamList, { id: x.id, name: x.name }]);
                });
                console.log(`team list 해줘어 : ${teamList}`);
            }
        });
    }, []);

    useEffect(() => {
        setOnModal(false);
        if (loginUserState.user?.profile?.career) {
            if (loginUserState.user?.profile?.career?.length >= 1) {
                setNumCareerInput(loginUserState.user?.profile?.career.length);
            }
        } else {
            setNumCareerInput(1);
        }
    }, []);

    useEffect(() => {
        if (file) {
            setOnModal(true);
        } else {
            setOnModal(false);
        }
    }, [file]);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }
    const uploadProfileImage = async (blob: Blob | null) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        console.log(url);

        //blob객체를 서버로 전송한다.
        //이미지에 대한 POST는 응답으로 프사 업데이트된 유저객체가 돌아오므로 다시 loginUserState에 저장해준다.
        const data = new FormData();
        data.append('image', blob);
        await axiosInstance.post('/image/profile', data).then(res => console.log(res.data));
        alert('프로필 사진이 성공적으로 업데이트 되었습니다.');

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
                if (loginUserState.isLogin == false) {
                    alert('로그인이 필요한 서비스입니다.');
                    router.push('/login');
                }
            }
        };

        getSessionUser();

        setOnModal(false);
    };

    const onPreview = () => {
        createCanvas();
    };

    const onSave = () => {
        if (!canvasRef.current) {
            return alert('이미지 저장에 실패하였습니다.');
        }
        createCanvas();
        console.log(canvasRef.current);
        canvasRef.current.toBlob((blob: Blob | null) => uploadProfileImage(blob), 'image/*', 0.95);
        setOnProfileImage(true);
    };

    const createCanvas = () => {
        if (!completedCrop) {
            return;
        }
        if (!canvasRef.current) {
            return;
        }
        if (!imgRef.current) {
            return;
        }
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const crop = completedCrop;

        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        const pixelRatio = window.devicePixelRatio;

        canvasRef.current.width = crop.width * pixelRatio * scaleX;
        canvasRef.current.height = crop?.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(imgRef.current, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width * scaleX, crop.height * scaleY);
    };

    if (loginUserState.isLogin == false) {
        return null;
    }
    //console.log(numCareerInput);
    return (
        <div className="px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">
            <div className="md:bg-ourWhite mt-[8rem] mb-[8rem] w-[100%]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex relative flex-col justify-center items-center md:flex-row">
                        <div className="flex flex-col justify-center items-center space-y-4 bg-[#FFFFFF] drop-shadow-lg shadow-blue-500/50 z-10 rounded-b-3xl rounded-t-md w-[100%] mb-10 md:mb-0 md:w-[45%] lg:w-[35%] h-[20rem] pb-5">
                            <Dropzone
                                onDrop={acceptedFiles => {
                                    setfile(URL.createObjectURL(acceptedFiles[0]));
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {onProfileImage || loginUserState.user?.profile?.img ? (
                                                <div className="flex justify-center w-[100%] max-w-[30rem]">
                                                    <img src={loginUserState.user?.profile?.img} alt="user profile image" className="rounded-full w-[50%]" />
                                                </div>
                                            ) : (
                                                <img src="/dragdrop.svg" alt="dragdrop" />
                                            )}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <section className="text-sm">1MB 이하의 파일로 등록해주세요</section>
                        </div>
                        {Boolean(file) && onModal ? (
                            <div className="flex flex-col justify-center items-center w-[18.75rem] sm:w-[40rem] md:w-[45rem] overflow-hidden bg-ourWhite drop-shadow-xl rounded-md border absolute top-0 md:top-0 md:left-[50%] md:-translate-x-[50%] z-30">
                                <AiOutlineClose
                                    size={18}
                                    className="cursor-pointer absolute top-5 right-5 opacity-50"
                                    onClick={() => {
                                        setOnModal(false);
                                    }}
                                />
                                <div className="flex flex-col sm:flex-row items-center justify-center mt-[4rem] mb-[2rem] sm:mt-[3rem] sm:mb-[3rem]">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={c => {
                                            setCompletedCrop(c);
                                        }}
                                        aspect={aspect}
                                        circularCrop={true}
                                        className="overflow-hidden w-[50%] sm:w-[15rem]"
                                    >
                                        <img ref={imgRef} alt="Crop me" src={file} onLoad={onImageLoad} />
                                    </ReactCrop>
                                    <div>
                                        <canvas ref={canvasRef} className="rounded-full w-[50%] mx-auto sm:w-[15rem] mt-5 sm:mt-0 overflow-hidden sm:mx-10"></canvas>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row space-x-3 ">
                                    <div className="bg-[#2087FF] w-[100%] sm:w-[7rem] p-2 sm:mx-3 rounded-md text-[#FFF] mb-5" onClick={onPreview}>
                                        <p className="text-white md:text-md text-center cursor-pointer">미리보기</p>
                                    </div>
                                    <div className="bg-[#2087FF] w-[100%] sm:w-[7rem] p-2 sm:mx-3 rounded-md text-[#FFF] mb-5" onClick={onSave}>
                                        <p className="text-white md:text-md text-center cursor-pointer">저장하기</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="flex flex-col drop-shadow-md bg-[#FFFFFF] w-[100%] md:w-[60%] lg:w-[80%] px-[4rem] h-[20rem] py-7 rounded-b-3xl rounded-t-md">
                            <label htmlFor="name">이름</label>
                            <input
                                {...register('name')}
                                type="text"
                                defaultValue={`${loginUserState.user?.name}`}
                                placeholder="이름을 입력해주세요"
                                className="border-2 rounded-md lg:w-[30rem] mt-2 mb-6 p-1.5"
                            />
                            <label htmlFor="position">직책</label>
                            <select
                                {...register('position')}
                                name="position"
                                id="position"
                                className="border-2 rounded-md lg:w-[30rem] mt-2 mb-6 p-1.5"
                                defaultValue={loginUserState?.user?.profile?.position}
                            >
                                <option value="developer">개발자</option>
                                <option value="planner">기획자</option>
                                <option value="designer">디자이너</option>
                            </select>
                            <label htmlFor="teamName">소속 팀</label>
                            <select {...register('teamName')} name="teamName" id="teamName" defaultValue={loginUserState.user?.team?.name} className="border-2 rounded-md lg:w-[30rem] mt-2 mb-6 p-1.5">
                                {/* <option value="">팀명은 곧 추가될 예정입니다</option> */}
                                {teamList.slice(1, -1)?.map((x: { id: string; name: string }) => (
                                    <option value={x.id}>{x.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mt-[4rem] mb-[2rem] py-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-[2rem]">
                        <label htmlFor="teamIntro" className="opacity-50 px-[1rem]">
                            한 줄 소개
                        </label>
                        <input
                            {...register('introduction')}
                            type="text"
                            placeholder="본인을 한 줄로 소개해주세요!"
                            defaultValue={loginUserState.user?.profile?.introduction}
                            className="border-2 rounded-md md:w-[30rem] mt-2 mb-6 p-1.5 mx-[1rem]"
                        />
                        <label htmlFor="univ" className="opacity-50 mx-[1rem]">
                            학력
                        </label>
                        <div className="flex flex-col md:flex-row">
                            <input
                                {...register('university')}
                                type="text"
                                placeholder="재학 중인 학교명을 입력해주세요"
                                defaultValue={loginUserState.user?.profile?.university}
                                className="border-2 rounded-md md:w-[30%] mt-2 mb-6 p-1.5 md:mr-7 mx-[1rem]"
                            />
                            <input
                                {...register('major')}
                                type="text"
                                placeholder="전공을 입력해주세요"
                                defaultValue={loginUserState.user?.profile?.major}
                                className="border-2 rounded-md md:w-[30%] mt-2 mb-6 p-1.5 mx-[1rem] md:mx-0"
                            />
                        </div>
                        <label htmlFor="career" className="opacity-50 mx-[1rem]">
                            경력
                        </label>
                        {Array.from({ length: numCareerInput }).map((item, idx) => {
                            return (
                                <div className="flex items-center" key={idx}>
                                    <input
                                        {...register(`career.${idx}`)}
                                        defaultValue={loginUserState.user?.profile?.career && loginUserState.user?.profile?.career.length >= 1 ? loginUserState.user?.profile?.career[idx] : ' '}
                                        type="text"
                                        placeholder="경력을 입력해주세요"
                                        className="border-2 rounded-md w-[63%] mt-2 mb-2 p-1.5 mr-3 mx-[1rem]"
                                    />
                                    {idx == numCareerInput - 1 ? (
                                        <>
                                            <AiOutlinePlusCircle
                                                onClick={() => {
                                                    setNumCareerInput(numCareerInput + 1);
                                                }}
                                                className="fill-[#2087FF]"
                                                size={24}
                                            />
                                            <TbTrashOff
                                                onClick={() => {
                                                    if (numCareerInput === 1) {
                                                        return;
                                                    } else {
                                                        setNumCareerInput(numCareerInput - 1);
                                                    }
                                                }}
                                                className="stroke-[#c02224] mx-1"
                                                size={24}
                                            />
                                        </>
                                    ) : null}
                                </div>
                            );
                        })}

                        <label htmlFor="sns" className="opacity-50 mx-[1rem] mt-4">
                            SNS
                        </label>
                        <div className="flex mb-1">
                            <div className="flex flex-col justify-center items-center mx-[1rem]">
                                <FiMail size={`1.75rem`} />
                                <p className="text-sm">Mail</p>
                            </div>
                            <input
                                {...register('email')}
                                type="text"
                                placeholder="이메일을 입력해주세요"
                                className="border-2 bg-[#FFFFFF] rounded-lg w-[60%] sm:w-[50%] lg:w-[30%] h-[2.5rem] p-1.5 flex justify-start items-center ml-3 mr-5 mb-4 mt-3"
                                defaultValue={loginUserState.user?.email}
                            />
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-center items-center mx-[0.2rem]">
                                <FiInstagram size={`1.75rem`} />
                                <p className="text-xs">Instagram</p>
                            </div>
                            <input
                                {...register('instagram')}
                                type="text"
                                placeholder="인스타그램 아이디를 입력해주세요!"
                                defaultValue={loginUserState.user?.profile?.link?.instagram ? loginUserState.user.profile?.link.instagram : ''}
                                className="border-2 rounded-md w-[60%] sm:w-[50%] lg:w-[30%] h-[2.5rem] p-1.5 ml-3 mr-5"
                            />
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-center items-center mx-[0.5rem] mt-2">
                                <FiGithub size={`1.75rem`} />
                                <p className="text-sm">Github</p>
                            </div>
                            <input
                                {...register('github')}
                                type="text"
                                placeholder="Github 아이디를 입력해주세요!"
                                defaultValue={loginUserState.user?.profile?.link?.github ? loginUserState.user.profile?.link.github : ''}
                                className="border-2 rounded-md w-[60%] sm:w-[50%] lg:w-[30%] h-[2.5rem] mt-5 mb-5 p-1.5 ml-3 mr-5"
                            />
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-center items-center mx-[0.9rem]">
                                <FiHome size={`1.75rem`} />
                                <p className="text-sm">Blog</p>
                            </div>
                            <input
                                {...register('blog')}
                                type="text"
                                placeholder="개인 웹사이트의 URL을 입력해주세요!"
                                defaultValue={loginUserState.user?.profile?.link?.blog ? loginUserState.user.profile?.link.blog : ''}
                                className="border-2 rounded-md w-[60%] sm:w-[50%] lg:w-[30%] h-[2.5rem] p-1.5 ml-3 mr-5"
                            />
                        </div>
                    </div>
                    <button
                        className="w-[100%] bg-[#2087FF] rounded-full h-[3.6rem] text-white text-xl tracking-wider cursor-pointer mt-[6rem]"
                        onClick={() => {
                            router.push('/mypage');
                        }}
                    >
                        SAVE
                    </button>
                </form>
            </div>
        </div>
    );
};
ProfileEdit.Layout = Layout;
export default ProfileEdit;
