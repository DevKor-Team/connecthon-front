import Layout from '../../layouts/Layout';
import useWindowSize from '../../hooks/useWindowSize';
import MobileLanding from './_mobile';
import PCLanding from './_pc';
import { useEffect, useState } from 'react';

const Landing = () => {
    const size = useWindowSize();
    const [xLocation, setXLocation] = useState<number>(5);
    const [yLocation, setYLocation] = useState<number>(-73);
    useEffect(() => {
        if (size.width && size.width < 1280 && size.width >= 1024) {
            setXLocation(7);
            setYLocation(-85);
        } else if (size.width && size.width < 1024 && size.width >= 900) {
            setXLocation(7);
            setYLocation(-100);
        } else if (size.width && size.width < 900) {
            setXLocation(7);
            setYLocation(-110);
        }
    }, [size]);

    return <div>{size.width && size.width > 640 ? <PCLanding xLocation={xLocation} yLocation={yLocation} /> : <MobileLanding />}</div>;
};

Landing.Layout = Layout;
export default Landing;
