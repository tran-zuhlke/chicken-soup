import prisma from '../../../../lib/prisma';

// DELETE /api/userDish/:id
export default async function handle(req, res) {
  const userDishId = req.query.id;
  const post = await prisma.userDish.delete({
    where: { id: userDishId },
  });
  res.json(post);
}
