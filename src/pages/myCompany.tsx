import { axiosInstance } from '../hooks/queries';
import { useRecoilState } from 'recoil';
import { loginRecoilState } from '../recoil/loginuser';
import { useEffect, useState } from 'react';

function myCompany() {
    const [loginUserState, setLoginUserState] = useRecoilState(loginRecoilState);

    <main className="md:px-16 lg:px-20 xl:px-[13.375rem]">영역</main>;
}

export default myCompany;
