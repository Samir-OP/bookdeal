// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const data = await prisma.product.findMany();
  res.status(200).json(data);
}
