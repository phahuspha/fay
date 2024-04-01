// pages/api/galleryTemplate/index.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const galleryTemplates = await prisma.galleryTemplate.findMany();
                res.status(200).json(galleryTemplates);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching gallery templates" });
            }
            break;
        case 'POST':
            try {
                // Note: Validate req.body to match your model requirements
                const galleryTemplate = await prisma.galleryTemplate.create({
                    data: req.body,
                });
                res.status(201).json(galleryTemplate);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the gallery template" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
