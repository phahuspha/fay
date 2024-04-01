import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query; // Extract the ID from the query
      const baseURL = process.env.DATABASE_IMG;

      if (!baseURL) {
        return res.status(500).json({ error: 'Base URL for the database is not configured.' });
      }

      const response = await axios.post(`${baseURL}/${id}`, req.body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Image upload failed:', error);
      res.status(500).json({ error: 'Failed to upload image.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
