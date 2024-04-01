import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Define an interface for the image object structure
interface Image {
    number: number;
    src: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Fetch all profiles including their related ImageData and Payment records
                const profiles = await prisma.profileData.findMany({
                    include: {
                        ImageData: true, // Include all related ImageData records
                        Payment: true, // Include all related Payment records
                    },
                });

                if (!profiles) {
                    return res.status(404).json({ error: "Profiles not found" });
                }

                res.status(200).json(profiles);
            } catch (error) {
                console.error("Failed to retrieve profiles:", error);
                res.status(500).json({ error: "An error occurred while fetching the profiles" });
            }
            break;
        case 'POST':
            try {
                const { name, caption, facebook, instagram, line, galleryTemplate, selectedImages } = req.body;

                // Use the Image interface to type each image in selectedImages
                const imageDatas = selectedImages.map((image: Image) => ({
                    number: image.number,
                    src: image.src,
                }));

                // Constructing the payment object based on the provided structure
                const payment = {
                    amount: 29, // Setting the amount as specified
                    status: 'Pending', // Setting the initial status
                };

                const profile = await prisma.profileData.create({
                    data: {
                        name,
                        caption,
                        facebook,
                        instagram,
                        line,
                        galleryTemplate,
                        ImageData: {
                            create: imageDatas, // Nested creation of ImageData
                        },
                        Payment: {
                            create: payment, // Nested creation of Payment
                        },
                    },
                });

                res.status(201).json(profile);
            } catch (error) {
                console.error("Failed to create profile with nested data:", error);
                res.status(500).json({ error: "An error occurred while creating the profile with nested data" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
