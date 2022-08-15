import { useRef } from 'react';

const useAutoScroll = () => {
    const element = useRef<HTMLDivElement>(null);
    const onElement = () => {
        element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return { element, onElement };
};

export default useAutoScroll;
