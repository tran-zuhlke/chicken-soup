import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dishId, userEmail } = req.body;

  const session = await getServerSession(req, res, options);
  const result = await prisma.userDish.create({
    data: {
      dish: { connect: { id: dishId } },
      user: { connect: { email: session?.user?.email } },
      createdAt: new Date(),
    },
  });
  res.json(result);
}
