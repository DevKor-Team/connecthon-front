import Layout from '../../layouts/Layout';
import useWindowSize from '../../hooks/useWindowSize';
import MobileLanding from './_mobile';
import PCLanding from './labtop';
import TabletLanding from './_tablet';
import { useEffect, useState } from 'react';
import LabTopLanding from './labtop';
import DeskTopLanding from './_desktop';

const Landing = () => {
    const size = useWindowSize();

    return (
        <div className="md:mt-[8rem] mx-4 md:mx-16 lg:mx-20 xl:mx-[13.375rem]">
            {size.width && size.width < 640 ? <MobileLanding /> : size.width && size.width < 1024 ? <TabletLanding /> : size.width && size.width < 1280 ? <LabTopLanding /> : <DeskTopLanding />}
        </div>
    );
};

Landing.Layout = Layout;
export default Landing;
