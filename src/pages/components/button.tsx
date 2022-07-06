const sizes = {
    sm: 'w-[170px] h-[40px] text-lg',
    md: 'w-[210px] h-[49px] text-xl',
    lg: 'w-[251px] h-[59px] text-2xl',
};

export default function Button({ size, className, children }: { size: 'sm' | 'md' | 'lg'; className: string; children: string }) {
    let btnSize = sizes[size];

    return <button className={`font-medium ${btnSize} text-ourBlack bg-ourWhite hover:bg-ourBlack hover:text-ourWhite rounded-md ${className}`}>{children}</button>;
}
