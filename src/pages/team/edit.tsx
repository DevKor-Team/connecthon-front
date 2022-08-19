import React, { useState, useRef, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../../recoil/loginuser';
import { axiosInstance } from '../../hooks/queries';

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
    // const teamId = loginUserState.user?.team?._id;
    const [teamId, setTeamId] = useState<string>();
    //라우터
    const router = useRouter();

    //파일
    const [file, setfile] = useState<string>();

    //모달
    const [onModal, setOnModal] = useState<boolean>(false);

    //경력(career) 관련

    //img 관련
    const aspect = 1;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [onProfileImage, setOnProfileImage] = useState<boolean>(false);

    //useForm에 최종적으로 들어갈 오브젝트타입
    type FormValues = {
        teamName: string;
        description: string;
        thumbnail: string;
    };

    //react-hook-form
    const { control, register, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(`user 알려줘 : ${loginUserState.user?.team?._id}`);
        axiosInstance.put(`/teams/${teamId}`, {
            data: {
                description: data.description,
                image: data.thumbnail,
            },
        });
        alert('팀 프로필이 수정되었습니다!');
    };

    // useEffect(() => {
    //     setOnModal(false);
    //     if (loginUserState.user?.profile?.career) {
    //         if (loginUserState.user?.profile?.career?.length >= 1) {
    //             setNumCareerInput(loginUserState.user?.profile?.career.length);
    //         }
    //     } else {
    //         setNumCareerInput(1);
    //     }
    // }, []);

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

        //blob객체를 서버로 전송한다.
        //이미지에 대한 POST는 응답으로 프사 업데이트된 유저객체가 돌아오므로 다시 loginUserState에 저장해준다.
        const data = new FormData();
        data.append('image', blob);
        await axiosInstance.post(`/image/team/${teamId}`, data);
        alert('팀 프로필 사진이 성공적으로 업데이트 되었습니다.');

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

    useEffect(() => {
        if (loginUserState.isLogin === true) {
            setTeamId(loginUserState.user?.team?._id);
        }
    }, [loginUserState]);

    const onPreview = () => {
        createCanvas();
    };

    const onSave = () => {
        if (!canvasRef.current) {
            return alert('이미지 저장에 실패하였습니다. 다시 시도해주세요.');
        }
        createCanvas();
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

    return (
        <div className="mt-[8rem] px-4 md:px-16 lg:px-20 xl:px-[13.375rem]">
            <div className="md:bg-ourWhite mt-[8rem] mb-[8rem] w-[100%]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex relative flex-col justify-center items-center md:flex-row">
                        <div className="flex flex-col justify-center items-center space-y-4 bg-[#FFFFFF] drop-shadow-lg shadow-blue-500/50 z-10 rounded-b-3xl rounded-t-md w-[100%] mb-10 md:mb-0 h-[20rem] pb-5">
                            <Dropzone
                                onDrop={acceptedFiles => {
                                    setfile(URL.createObjectURL(acceptedFiles[0]));
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {onProfileImage || loginUserState.user?.team?.image ? (
                                                <div className="flex justify-center w-[100%] max-w-[30rem]">
                                                    <img src={loginUserState.user?.team?.image} alt="team profile image" className="w-[60%]" />
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-[#2087FF] w-[80%]">
                                                    <img src="/dragdrop.svg" alt="dragdrop" />
                                                </div>
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
                                        className="overflow-hidden w-[50%] sm:w-[15rem]"
                                    >
                                        <img ref={imgRef} alt="Crop me" src={file} onLoad={onImageLoad} />
                                    </ReactCrop>
                                    <div>
                                        <canvas ref={canvasRef} className="w-[15rem] mx-auto mt-5 sm:mt-0 overflow-hidden sm:mx-5"></canvas>
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
                        {/* <div className="flex flex-col drop-shadow-md bg-[#FFFFFF] w-[100%] md:w-[60%] lg:w-[80%] px-[4rem] h-[20rem] py-7 rounded-b-3xl rounded-t-md">hihi</div> */}
                    </div>
                    <div className="flex flex-col mt-[4rem] mb-[2rem] py-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-[2rem]">
                        <label htmlFor="teamIntro" className="opacity-50 px-[1rem]">
                            팀 이름
                        </label>
                        <input {...register('teamName')} type="text" defaultValue={loginUserState.user?.team?.name} className="border-2 rounded-md md:w-[30rem] mt-2 mb-6 p-1.5 mx-[1rem]" readOnly />
                        <label htmlFor="teamIntro" className="opacity-50 px-[1rem]">
                            팀 소개
                        </label>
                        <input
                            {...register('description')}
                            type="text"
                            placeholder="팀 소개를 입력해주세요!"
                            defaultValue={loginUserState.user?.team?.description}
                            className="border-2 rounded-md md:w-[30rem] mt-2 mb-6 p-1.5 mx-[1rem]"
                        />
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
export default ProfileEdit;
