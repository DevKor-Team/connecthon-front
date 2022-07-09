import Button from '../../components/Button';

const SecondLanding = () => {
    return (
        <div className="mt-[30rem] mb-0">
            <div className="my-[10rem]">
                <h3 className="text-center mb-7">후원</h3>
                <img className="w-[90%] mx-auto" src="/mobile-company.svg" alt="company" />
            </div>
            <Button size="sm" className="block px-3 mt-[5rem] mx-auto border-2 border-black hover:text-white">
                Get Started
            </Button>
        </div>
    );
};

export default SecondLanding;
