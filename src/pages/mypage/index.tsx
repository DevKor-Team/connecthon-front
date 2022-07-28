// import { CustomNextPage } from '../types/types';
import { CustomNextPage } from '../../types/types';
import Layout from '../../layouts/Layout';
import { Personal } from '../../components/Personal';
import { ProjectMain } from '../../components/ProjectMain';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';

const MyPage: CustomNextPage = () => {
    return (
        <div>
            <div className="relative mt-[10rem]">
                <div className="flex">
                    <AiOutlineLeft className="absolute left-[-3rem] top-[55%] text-xl cursor-pointer" />
                    <BsChatLeft className="absolute top-[-2rem] right-0 text-2xl cursor-pointer" fill="#2087FF" />

                    <div>
                        <Personal />

                        <ProjectMain />
                    </div>
                    <AiOutlineRight className="absolute right-[-3rem] top-[55%] text-xl cursor-pointer " />
                </div>

                <div className="my-[20rem]"></div>
            </div>
        </div>
    );
};

MyPage.Layout = Layout;
export default MyPage;
