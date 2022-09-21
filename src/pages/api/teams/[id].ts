import type { NextApiRequest, NextApiResponse } from 'next';
import { TeamListData } from '.';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const matchedTeam = TeamListData.find(elem => elem.id === id);

    res.status(200).json({
        data: matchedTeam,
    });
}
