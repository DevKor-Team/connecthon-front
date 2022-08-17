import { IoIosCloseCircle } from 'react-icons/io';

interface TagParams {
    label: string;
    onRemove: (selectedLabel: string) => void;
}

function Tag({ label, onRemove }: TagParams) {
    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={() => {
                onRemove(label);
            }}
        >
            <IoIosCloseCircle className="mr-1 fill-[#FFFFFF]" />
            <p className="text-center text-[#FFFFFF] text-md">{label}</p>
        </div>
    );
}

export default Tag;
