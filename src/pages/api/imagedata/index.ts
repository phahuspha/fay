import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const images = await prisma.imageData.findMany();
                res.status(200).json(images);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the images" });
            }
            break;
        case 'POST':
            try {
                const { number, src, postProfileID } = req.body;
                const image = await prisma.imageData.create({
                    data: {
                        number,
                        src,
                        postProfileID
                    },
                });
                res.status(201).json(image);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the image" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
