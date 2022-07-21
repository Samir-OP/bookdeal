import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = await prisma.product.findMany({
    where: {
      name: {
        contains: req.body.search as string,
        mode: "insensitive",
      },
    },
    select: {
      slug: true,
      name: true,
    },
  });

  res.json(data);
}
