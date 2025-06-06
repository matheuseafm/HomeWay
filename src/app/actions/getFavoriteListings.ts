import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // Buscar os favoritos do usuário
    const favorites = await prisma.favorite.findMany({
      where: { userId: currentUser.id },
      include: { listing: true },
    });

    // Extrair os listings favoritos
    const safeFavorites = favorites.map((fav) => ({
      ...fav.listing,
      createdAt: fav.listing.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
