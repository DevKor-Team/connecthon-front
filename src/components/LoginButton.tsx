import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsGithub, BsGoogle } from 'react-icons/bs';

const BtnCommonProperty = 'w-full sm:w-[20.625rem] h-[2.625rem] flex items-center justify-center rounded-xl px-5';

const GithubLoginBtn = () => {
    return (
        <button className={`${BtnCommonProperty} bg-ourBlack`}>
            <div className="w-18 flex items-center after:content-[' '] after:w-[1px] after:h-[26px] after:rounded-full after:ml-4 after:bg-[#c7c7c7]">
                <BsGithub size={26} fill="white" />
            </div>
            <div className="flex items-center justify-center text-white flex-auto text-base">Continue with Github</div>
        </button>
    );
};

const GoogleLoginBtn = () => {
    return (
        <button className={`${BtnCommonProperty} bg-[#ea4335]`}>
            <div className="w-18 flex items-center after:content-[' '] after:w-[1px] after:h-[26px] after:rounded-full after:ml-4 after:bg-[#ffdcd9]">
                <BsGoogle size={26} fill="white" />
            </div>
            <div className="flex items-center justify-center text-white flex-auto text-base">Continue with Google</div>
        </button>
    );
};

const KakaoLoginBtn = () => {
    return (
        <button className={`${BtnCommonProperty} bg-[#ffe812]`}>
            <div className="w-18 flex items-center after:content-[' '] after:w-[1px] after:h-[26px] after:rounded-full after:ml-3 after:bg-[#7b710e]">
                <RiKakaoTalkFill size={30} />
            </div>
            <div className="flex items-center justify-center text-black flex-auto text-base font-medium">Continue with KakaoTalk</div>
        </button>
    );
};

export { KakaoLoginBtn, GoogleLoginBtn, GithubLoginBtn };
