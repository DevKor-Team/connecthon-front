import Layout from '../../layouts/Layout';
import useWindowSize from '../../hooks/useWindowSize';
import MobileLanding from './_mobile';
import PCLanding from './_pc';
import { useEffect, useState } from 'react';

const Landing = () => {
    const size = useWindowSize();
    const [xLocation, setXLocation] = useState<number>(5);
    const [yLocation, setYLocation] = useState<number>(-73);
    const [symbolLocation, setSymbolLocation] = useState<number>(-550);

    useEffect(() => {
        if (size.width && size.width < 765) {
            setXLocation(7);
            setYLocation(-130);
            setSymbolLocation(-550);
        } else if (size.width && size.width <= 1024) {
            setXLocation(7);
            setYLocation(-110);
            setSymbolLocation(-450);
        } else if (size.width && size.width <= 1280) {
            setXLocation(7);
            setYLocation(-95);
            setSymbolLocation(-620);
        } else if (size.width && size.width > 1280) {
            setXLocation(7);
            setYLocation(-80);
            setSymbolLocation(-450);
        }
    }, [size]);

    return <div>{size.width && size.width > 640 ? <PCLanding xLocation={xLocation} yLocation={yLocation} symbolLocation={symbolLocation} /> : <MobileLanding />}</div>;
};

Landing.Layout = Layout;
export default Landing;
