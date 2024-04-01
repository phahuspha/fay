// pages/api/imageData/[id].ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const image = await prisma.imageData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (image) {
                    res.status(200).json(image);
                } else {
                    res.status(404).json({ message: "Image not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the image" });
            }
            break;
        case 'PUT':
            try {
                const { src, postProfileID } = req.body;
                const image = await prisma.imageData.update({
                    where: {
                        id: id as string,
                    },
                    data: {
                        src,
                        postProfileID
                    },
                });
                res.status(200).json(image);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the image" });
            }
            break;
        case 'DELETE':
            try {
                await prisma.imageData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the image" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
