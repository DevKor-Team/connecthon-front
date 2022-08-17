import { Dispatch, SetStateAction } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { TechStack } from '../interfaces/techStack';

interface TagParams {
    label: string;
    onRemove: (selectedLabel: string) => void;
    // stacks: TechStack[] | undefined;
    // setStacks: Dispatch<SetStateAction<TechStack[] | undefined>>;
}

function Tag({ label, onRemove }: TagParams) {
    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={() => {
                onRemove(label);
            }}
        >
            <IoIosCloseCircle
                className="mr-1 fill-[#FFFFFF]"
                // onClick={() => {
                //     const index = labels.indexOf(x);
                //     if (index > -1) {
                //         labels.splice(index, 1);
                //     }
                //     setLabels(labels);
                // }}
            />
            <p className="text-center text-[#FFFFFF] text-md">{label}</p>
        </div>
    );
}

export default Tag;
