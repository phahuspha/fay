// pages/api/payment/index.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const payments = await prisma.payment.findMany();
                res.status(200).json(payments);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching payments" });
            }
            break;
        case 'POST':
            try {
                const payment = await prisma.payment.create({
                    data: req.body,
                });
                res.status(201).json(payment);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the payment" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
