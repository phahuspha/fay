// pages/api/profileData/index.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const profiles = await prisma.profileData.findMany();
                res.status(200).json(profiles);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching profiles" });
            }
            break;
        case 'POST':
            try {
                const profile = await prisma.profileData.create({
                    data: req.body,
                });
                res.status(201).json(profile);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the profile" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
