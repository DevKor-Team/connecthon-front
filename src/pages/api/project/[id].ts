import type { NextApiRequest, NextApiResponse } from 'next';
import { ProjectListData } from '.';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const matchedProject = ProjectListData.find(elem => elem.id === id);

    res.status(200).json({
        data: matchedProject?._doc,
    });
}
