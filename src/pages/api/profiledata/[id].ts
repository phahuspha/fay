// pages/api/profileData/[id].ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const profile = await prisma.profileData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (profile) {
                    res.status(200).json(profile);
                } else {
                    res.status(404).json({ message: "Profile not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the profile" });
            }
            break;
        case 'PUT':
            try {
                const profile = await prisma.profileData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(profile);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the profile" });
            }
            break;
        case 'DELETE':
            try {
                await prisma.profileData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the profile" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
