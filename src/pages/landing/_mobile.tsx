import Layout from '../../layouts/Layout';
import { useEffect, useState } from 'react';
import FirstLanding from './_first';
import SecondLanding from './_second';

const MobileLanding = () => {
    const [scrollDirection, setScrollDirection] = useState<boolean>(false);
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const threshold = 0;
        let lastScrollY: number = window.pageYOffset;
        let ticking = false;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDirection(scrollY > lastScrollY ? true : false);
            if (count == 0) {
                if (scrollDirection) {
                    setIsFirst(false);
                    setCount(prev => prev + 1);
                }
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDirection);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollDirection]);

    return <div>{scrollDirection ? <SecondLanding /> : <FirstLanding isFirst={isFirst} />}</div>;
};

MobileLanding.Layout = Layout;
export default MobileLanding;
