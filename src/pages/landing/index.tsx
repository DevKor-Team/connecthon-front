import Layout from '../../layouts/Layout';
import { useEffect, useState } from 'react';
import FirstLanding from './_first';
import SecondLanding from './_second';

const Landing = () => {
    const [scrollDirection, setScrollDirection] = useState(false);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDirection(scrollY > lastScrollY ? true : false);
            setIsFirst(scrollDirection ? true : false);
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

    // return <div>{scrollDirection ? <SecondLanding /> : <FirstLanding />}</div>
    return <div>{scrollDirection ? <SecondLanding /> : <FirstLanding isFirst={isFirst} />}</div>;
};

Landing.Layout = Layout;
export default Landing;
