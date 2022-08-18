import { useRouter } from 'next/router';

function Enterprise() {
    const router = useRouter();
    const { id } = router.query();
}

export default Enterprise;
