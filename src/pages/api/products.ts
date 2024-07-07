import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/lib/stripe'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}
