import Link from 'next/link';

interface BtnType {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children: string;
}

const sizes = {
    sm: 'w-44 h-10 text-lg',
    md: 'w-52 h-12 text-xl',
    lg: 'w-64 h-[3.75rem] text-2xl',
};

export default function HomeButton({ size, className, children }: BtnType) {
    const btnSize = sizes[size];
    const shadowStyle = 'shadow-[0px_5px_20px_5px_rgba(17,17,26,0.4)]';

    return (
        <Link href="/about">
            <button className={`${className} font-medium rounded-md bg-ourBlue text-white hover:bg-white hover:text-ourBlue ${shadowStyle} ${btnSize}`}>{children}</button>
        </Link>
    );
}
