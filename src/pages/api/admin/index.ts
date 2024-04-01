// pages/api/admin/index.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const admins = await prisma.admin.findMany({
                    select: {
                        id: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        // Do not return password
                    },
                });
                res.status(200).json(admins);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching admins" });
            }
            break;
        case 'POST':
            try {
                const { username, password } = req.body;

                // Hash password before storing it
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                const admin = await prisma.admin.create({
                    data: {
                        username,
                        password: hash, // Store the hashed password
                    },
                });

                // Return the created admin without the password
                const { password: _, ...adminWithoutPassword } = admin;
                res.status(201).json(adminWithoutPassword);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the admin" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
