import { useSpring, animated } from 'react-spring';
import Button from '../../components/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../hooks/queries';
import { Company } from '../../interfaces/company';

const SecondLanding = () => {
    const componentAnimation = useSpring({
        loop: false,
        from: { opacity: 0 },
        to: [{ opacity: 1 }],
        config: {
            duration: 700,
        },
    });

    const [companyList, setCompanyList] = useState<Company[]>([]);
    useEffect(() => {
        async function fetchCompanies() {
            try {
                await axiosInstance.get('/api/companies').then(res => setCompanyList(res.data.data));
            } catch (e) {
                console.log(e);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <animated.div className="mt-[30rem] mb-0" style={{ ...componentAnimation }}>
            <div className="my-[10rem]">
                <h3 className="text-center font-semibold text-xl mb-[5rem]">후원사</h3>
                <div className="w-full grid grid-cols-3 grid-flow-row gap-8">
                    {companyList
                        .filter(comp => !comp.alias?.includes('devkor'))
                        .map(comp => (
                            <Link href={`/enterprise/${comp.id}`}>
                                <div className="h-[5rem] flex items-center justify-center">
                                    <img src={`${comp.logo}`} className="cursor-pointer" />
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
            <Link href="/home">
                <a>
                    <Button size="sm" className="block px-3 mt-[5rem] mb-[7rem] mx-auto border-2 border-black hover:text-white">
                        Get Started
                    </Button>
                </a>
            </Link>
        </animated.div>
    );
};

export default SecondLanding;
