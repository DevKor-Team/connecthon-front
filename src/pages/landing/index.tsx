import Layout from '../../layouts/Layout';
import useWindowSize from '../../hooks/useWindowSize';
import MobileLanding from './_mobile';
import PCLanding from './_pc';

const Landing = () => {
    const size = useWindowSize();
    return <div>{size.width && size.width > 640 ? <PCLanding /> : <MobileLanding />}</div>;
};

Landing.Layout = Layout;
export default Landing;
