import { MouseEvent } from 'react';

function attachScaling(e: MouseEvent<HTMLDivElement>) {
    //for collecting siblings
    const siblings: HTMLElement[] = [];

    let target;
    if (e.target instanceof HTMLDivElement) target = e.target;

    if (typeof target == 'undefined') return;

    //if no parent, return
    if (!target.parentElement) {
        return;
    }

    console.log('mouse over');

    //first child of the parent element
    let currentChild = target.parentElement.firstChild;

    //collecting siblings
    if (currentChild instanceof HTMLDivElement) {
        while (currentChild) {
            if (currentChild.nodeType === 1 && currentChild !== target) {
                siblings.push(currentChild);
            }

            currentChild = currentChild.nextSibling;
        }
    }
    target.classList.add('sm:scale-110', 'sm:shadow-[7px_7px_18px_2px_rgba(0,0,0,0.1)]');
    siblings.forEach(sib => sib.classList.add('sm:scale-75'));
}

function detachScaling(e: MouseEvent<HTMLDivElement>) {
    //for collecting siblings
    const siblings: HTMLElement[] = [];

    let target;
    if (e.target instanceof HTMLDivElement) target = e.target;

    if (typeof target == 'undefined') return;

    //if no parent, return
    if (!target.parentElement) {
        return;
    }

    //first child of the parent element
    let currentChild = target.parentElement.firstChild;

    //collecting siblings
    if (currentChild instanceof HTMLDivElement) {
        while (currentChild) {
            if (currentChild.nodeType === 1 && currentChild !== target) {
                siblings.push(currentChild as HTMLElement);
            }

            currentChild = currentChild.nextSibling;
        }
    }

    target.classList.remove('sm:scale-110', 'sm:shadow-[7px_7px_18px_2px_rgba(0,0,0,0.1)]');
    siblings.forEach(sib => sib.classList.remove('sm:scale-75'));
    console.log('mouse leave');
}

export default function MainProjectCard({ imgurl, title, team }: { imgurl?: string; title: string; team: string }) {
    return (
        <div className="transition-all ease-out duration-300 w-full md:w-1/3 rounded-xl" onMouseOver={e => attachScaling(e)} onMouseLeave={e => detachScaling(e)}>
            <div className="bg-sky-100 w-full h-56 md:h-60 lg:h-64 xl:h-80 2xl:h-96 rounded-t-xl pointer-events-none">
                <img src={imgurl} alt={title} />
            </div>
            <div className="bg-ourWhite w-full h-[5.5rem] px-10 lg:px-6 py-4 rounded-b-xl flex flex-col items-start justify-around pointer-events-none">
                <h1 className="font-bold text-lg sm:text-base lg:text-lg">{title}</h1>
                <h2 className="font-semibold text-base sm:text-sm lg:text-base">{team}</h2>
            </div>
        </div>
    );
}
