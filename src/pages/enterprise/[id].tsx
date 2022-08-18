import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../hooks/queries';

function Enterprise() {
    const router = useRouter();
    const { id } = router.query;
    const [company, setCompany] = useState();

    useEffect(() => {
        async function fetchCompany() {
            try {
                await axiosInstance.get(`/companies/${id}`).then(res => setCompany(res.data.data));
            } catch (e) {
                console.log(e);
            }
        }
    });
}

export default Enterprise;
