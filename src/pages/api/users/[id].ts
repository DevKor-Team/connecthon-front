import type { NextApiRequest, NextApiResponse } from 'next';
import { UserList } from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const matchedUser = UserList.find(elem => elem.id === id);

    res.status(200).json({
        data: matchedUser,
    });
}
