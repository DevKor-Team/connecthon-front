import Link from 'next/link';

interface BtnType {
    size: 'sm' | 'md' | 'lg';
    className?: string;
    children: string;
}

const sizes = {
    sm: 'w-44 h-10',
    md: 'w-52 h-12',
    lg: 'w-64 h-[3.75rem]',
};

export default function HomeButton({ size = 'md', className, children }: BtnType) {
    const btnSize = sizes[size];
    const shadowStyle = 'shadow-[0px_5px_20px_5px_rgba(17,17,26,0.4)]';

    return (
        <Link href="/about">
            <button className={`${className} font-medium rounded-md bg-ourBlue text-white hover:bg-white hover:text-ourBlue ${shadowStyle}`}>{children}</button>
        </Link>
    );
}
