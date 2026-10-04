const prisma = require('../db/prismaClient.cjs');

// GET /api/artisans/city/:cityId
async function getArtisansByCity(req, res) {
  const { cityId } = req.params;

  try {
    const artisans = await prisma.sellers.findMany({
      where: {
        city_id: cityId,
        craft_category_id: { not: null },
      },
      select: {
        id: true,
        shop_name: true,
        description: true,
        address: true,
        craft_category: { select: { name: true } },
      },
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch artisans' });
  }
}

module.exports = { getArtisansByCity };