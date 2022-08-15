const sizes = {
    sm: 'w-44 h-10 text-lg',
    md: 'w-52 h-12 text-xl',
    lg: 'w-64 h-[3.75rem] text-2xl',
};

export default function Button({ size, className, children }: { size: 'sm' | 'md' | 'lg'; className: string; children: string }) {
    const btnSize = sizes[size];

    return <button className={`font-medium ${btnSize} text-ourBlack bg-ourWhite hover:bg-ourBlack hover:text-ourWhite rounded-md ${className}`}>{children}</button>;
}
