import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { FoodType } from "@prisma/client";

type RouteParams = { params: Promise<{ id: string }> };
const VALID_FOOD_TYPES: FoodType[] = ["upf", "fresh"];

// Force dynamic rendering untuk API route (jangan cache di build time)
export const dynamic = "force-dynamic";

// GET /api/foods/[id] → ambil detail satu makanan berdasarkan ID
export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const food = await prisma.food.findUnique({
      where: { id },
    });

    if (!food) {
      return NextResponse.json(
        { success: false, error: "Makanan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: food });
  } catch (error) {
    console.error("[GET /api/foods/:id]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil detail makanan" },
      { status: 500 },
    );
  }
}

// PUT /api/foods/[id] → update makanan berdasarkan ID
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, ingredients, description, type, imageUrl } = body;

    if (!name || !ingredients || !description || !type) {
      return NextResponse.json(
        { success: false, error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    if (!VALID_FOOD_TYPES.includes(type as FoodType)) {
      return NextResponse.json(
        { success: false, error: "Tipe makanan tidak valid" },
        { status: 400 },
      );
    }

    const existing = await prisma.food.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Makanan tidak ditemukan" },
        { status: 404 },
      );
    }

    const updated = await prisma.food.update({
      where: { id },
      data: {
        name: name.trim(),
        ingredients: ingredients.trim(),
        description: description.trim(),
        type: type as FoodType,
        imageUrl: imageUrl?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PUT /api/foods/:id]", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui makanan" },
      { status: 500 },
    );
  }
}

// DELETE /api/foods/[id] → hapus makanan berdasarkan ID
export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const existing = await prisma.food.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Makanan tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.food.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: { message: "Makanan berhasil dihapus" },
    });
  } catch (error) {
    console.error("[DELETE /api/foods/:id]", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus makanan" },
      { status: 500 },
    );
  }
}
