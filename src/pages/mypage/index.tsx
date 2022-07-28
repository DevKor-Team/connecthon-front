// import { CustomNextPage } from '../types/types';
import { CustomNextPage } from '../../types/types';
import Layout from '../../layouts/Layout';
import { Personal } from '../../components/Personal';
import { ProjectMain } from '../../components/ProjectMain';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const MyPage: CustomNextPage = () => {
    return (
        <div>
            <div className="relative mt-[10rem]">
                <div className="flex">
                    <AiOutlineLeft className="absolute left-[-3rem] top-[55%] text-xl cursor-pointer" />
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
