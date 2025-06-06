import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Cria o favorito se não existir
  const favorite = await prisma.favorite.create({
    data: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Remove o favorito
  const deleted = await prisma.favorite.deleteMany({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json(deleted);
}
