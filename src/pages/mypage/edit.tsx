import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../layouts/Layout';
import Dropzone from 'react-dropzone';
import { FiMail, FiInstagram, FiGithub, FiHome } from 'react-icons/fi';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import { useRecoilState } from 'recoil';
import { userRecoilState } from '../../recoil/user';

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
    const [userState, setUserState] = useRecoilState(userRecoilState);
    const router = useRouter();
    const [file, setfile] = useState<string>();
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [onModal, setOnModal] = useState<boolean>(false);
    const [onProfileImage, setOnProfileImage] = useState<boolean>(false);
    const [numCareerInput, setNumCareerInput] = useState<number>(1);
    const aspect = 1;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
    });

    const onValid = data => {
        setUserState(
            Object.assign(
                { ...userState },
                {
                    user: {
                        team: data.team,
                        profile: {
                            link: {
                                github: data.github,
                                blog: data.blog,
                                instagram: data.instagram,
                            },
                            introduction: data.introduction,
                            position: data.position,
                            university: data.university,
                            major: data.major,
                            career: data.career,
                        },
                    },
                },
            ),
        );
    };
    const onInvalid = errors => {
        console.log(errors);
    };

    useEffect(() => {
        setOnModal(false);
        if (userState.user?.profile.career) {
            setNumCareerInput(userState.user?.profile.career.length);
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
        setUserState(
            Object.assign(
                { ...userState },
                {
                    user: {
                        profile: {
                            img: url,
                        },
                    },
                },
            ),
        ),
            setOnModal(false);
        console.log(`blob 객체를 서버로 데이터 전송`);
    };

    const onPreview = () => {
        createCanvas();
    };
    const onSave = () => {
        if (!canvasRef.current) {
            return alert('이미지 저장에 실패하였습니다.');
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
        <div className="bg-ourWhite mt-[8rem] mb-[3rem] w-[100%]">
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <div className="flex relative">
                    <div className="flex justify-center items-center bg-[#FFFFFF] drop-shadow-2xl z-10 rounded-md w-[35%] h-[20rem] pb-5">
                        <Dropzone
                            onDrop={acceptedFiles => {
                                setfile(URL.createObjectURL(acceptedFiles[0]));
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {onProfileImage ? (
                                            <div className="flex justify-center">
                                                <img src={userState.user?.profile.img} alt="user profile image" className="rounded-full w-[50%]" />
                                            </div>
                                        ) : (
                                            <img src="/dragdrop.svg" alt="dragdrop" />
                                        )}
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {Boolean(file) && onModal ? (
                            <div className="flex flex-col justify-center items-center w-[50rem] overflow-hidden bg-red-300 absolute top-[30%] left-[50%] ">
                                <div className="flex items-center justify-center">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={c => {
                                            setCompletedCrop(c);
                                        }}
                                        aspect={aspect}
                                        circularCrop={true}
                                        className=" mt-[6rem] mb-3 overflow-hidden w-[15rem] h-[26rem]"
                                    >
                                        <img ref={imgRef} alt="Crop me" src={file} onLoad={onImageLoad} />
                                    </ReactCrop>
                                    <div>
                                        <h2 className="text-center text-white text-xl mb-5">미리보기</h2>
                                        <canvas ref={canvasRef} className="rounded-full w-[10rem] h-[10rem] overflow-hidden mx-10"></canvas>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="bg-[#2087FF] w-[10rem] p-2 mx-3 rounded-md text-[#FFF] mb-5" onClick={onPreview}>
                                        <p className="text-white text-center cursor-pointer">미리보기</p>
                                    </div>
                                    <div className="bg-[#2087FF] w-[10rem] p-2 mx-3 rounded-md text-[#FFF] mb-5" onClick={onSave}>
                                        <p className="text-white text-center cursor-pointer">저장하기</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="flex flex-col drop-shadow-md bg-[#FFFFFF] w-[80%] px-[4rem] h-[20rem] py-7 rounded-md">
                        <label htmlFor="name">이름</label>
                        <input type="text" value={userState.user?.name} className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                        <label htmlFor="position">직책</label>
                        <select {...register('position')} name="position" id="position" className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" defaultValue={userState?.user?.profile.position}>
                            <option value="developer">개발자</option>
                            <option value="planner">기획자</option>
                            <option value="designer">디자이너</option>
                        </select>
                        <label htmlFor="teamName">소속 팀</label>
                        <input {...register('team')} type="text" placeholder="팀명을 입력해주세요" defaultValue={userState.user?.team} className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1" />
                    </div>
                </div>
                <div className="flex flex-col mt-[4rem] mb-[2rem] py-[3rem] px-[4rem] bg-[#FFFFFF] drop-shadow-lg rounded-md">
                    <label htmlFor="teamIntro" className="opacity-50 px-[1rem]">
                        한 줄 소개
                    </label>
                    <input
                        {...register('introduction')}
                        type="text"
                        placeholder="본인을 한 줄로 소개해주세요!"
                        defaultValue={userState.user?.profile.introduction}
                        className="border-2 rounded-md w-[30rem] mt-2 mb-6 p-1 mx-[1rem]"
                    />
                    <label htmlFor="univ" className="opacity-50 mx-[1rem]">
                        학력
                    </label>
                    <div>
                        <input
                            {...register('university')}
                            type="text"
                            placeholder="재학 중인 학교명을 입력해주세요"
                            defaultValue={userState.user?.profile.university}
                            className="border-2 rounded-md w-[30%] mt-2 mb-6 p-1 mr-7 mx-[1rem]"
                        />
                        <input
                            {...register('major')}
                            type="text"
                            placeholder="전공을 입력해주세요"
                            defaultValue={userState.user?.profile.major}
                            className="border-2 rounded-md w-[30%] mt-2 mb-6 p-1"
                        />
                    </div>
                    <label htmlFor="career" className="opacity-50 mx-[1rem]">
                        경력
                    </label>
                    {Array.from({ length: numCareerInput }).map(() => {
                        return (
                            <div className="flex items-center">
                                <input {...register('career')} type="text" placeholder="경력을 입력해주세요" className="border-2 rounded-md w-[63%] mt-2 mb-2 p-1 mr-3 mx-[1rem]" />
                                <AiOutlinePlusCircle
                                    onClick={() => {
                                        setNumCareerInput(numCareerInput + 1);
                                    }}
                                    className="fill-[#2087FF]"
                                    size={24}
                                />
                                <AiOutlineMinusCircle
                                    onClick={() => {
                                        if (numCareerInput === 1) {
                                            return;
                                        } else {
                                            setNumCareerInput(numCareerInput - 1);
                                        }
                                    }}
                                    className="fill-[#c02224] mx-1"
                                    size={24}
                                />
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
                        <input type="text" className="border-2 bg-[#FFFFFF] rounded-lg w-[30%] h-[2.5rem] p-1 flex justify-start items-center ml-3 mr-5 mb-4 mt-3" value={userState.user?.email} />
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
                            defaultValue={userState.user?.profile.link.instagram}
                            className="border-2 rounded-md w-[30%] h-[2.5rem] p-1 ml-3 mr-5"
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
                            defaultValue={userState.user?.profile.link.github}
                            className="border-2 rounded-md w-[30%] h-[2.5rem] mt-5 mb-5 p-1 ml-3 mr-5"
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
                            defaultValue={userState.user?.profile.link.blog}
                            className="border-2 rounded-md w-[30%] h-[2.5rem] p-1 ml-3 mr-5"
                        />
                    </div>
                </div>
                <button
                    className="w-[100%] bg-[#2087FF] rounded-full h-[3.6rem] text-white text-xl tracking-wider cursor-pointer"
                    onClick={() => {
                        router.push('/mypage');
                    }}
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};
ProfileEdit.Layout = Layout;
export default ProfileEdit;
