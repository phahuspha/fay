// pages/api/galleryTemplate/[id].ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const galleryTemplate = await prisma.galleryTemplate.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (galleryTemplate) {
                    res.status(200).json(galleryTemplate);
                } else {
                    res.status(404).json({ message: "Gallery template not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the gallery template" });
            }
            break;
        case 'PUT':
            try {
                const galleryTemplate = await prisma.galleryTemplate.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(galleryTemplate);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the gallery template" });
            }
            break;
        case 'DELETE':
            try {
                await prisma.galleryTemplate.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the gallery template" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
