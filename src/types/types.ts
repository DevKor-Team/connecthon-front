import type { NextPage } from 'next';

export type CustomNextPage<T = void> = NextPage<T> & {
    Layout?: React.FC;
};
