import type { NextPage } from 'next';
import Button from './components/button';

const Home: NextPage = () => {
    return (
        <>
            <h1 className="ml-10">h1 - Hello DevKor</h1>
            <h2 className="ml-10">h2 - Hello DevKor</h2>
            <h3 className="ml-10">h3 - Hello DevKor</h3>
            <Button size="lg" className="ml-10">
                Large Button
            </Button>
            <Button size="md" className="ml-10 mt-5">
                Medium Button
            </Button>
            <Button size="sm" className="ml-10 mt-5">
                Small Button
            </Button>
        </>
    );
};

export default Home;
