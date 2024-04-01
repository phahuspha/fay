// pages/api/admin/[id].ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs'; // Assuming you're using bcryptjs for password hashing

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const admin = await prisma.admin.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (admin) {
                    res.status(200).json(admin);
                } else {
                    res.status(404).json({ message: "Admin not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the admin" });
            }
            break;
        case 'PUT':
            try {
                // Updating password should include hashing
                const { password, ...rest } = req.body;
                const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
                const admin = await prisma.admin.update({
                    where: {
                        id: id as string,
                    },
                    data: {
                        ...rest,
                        ...(hashedPassword && { password: hashedPassword }),
                    },
                });
                res.status(200).json(admin);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the admin" });
            }
            break;
        case 'DELETE':
            try {
                await prisma.admin.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the admin" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
