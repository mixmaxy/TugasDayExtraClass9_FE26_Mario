import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { FoodType } from "@prisma/client";

const VALID_FOOD_TYPES: FoodType[] = ["upf", "fresh"];

// Force dynamic rendering untuk API route (jangan cache di build time)
export const dynamic = "force-dynamic";

// GET /api/foods → ambil semua makanan, diurutkan terbaru dulu
export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: foods });
  } catch (error) {
    console.error("[GET /api/foods]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data makanan" },
      { status: 500 },
    );
  }
}

// POST /api/foods → buat makanan baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, ingredients, description, type, imageUrl } = body;

    // Validasi input manual (lebih transparan)
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

    const food = await prisma.food.create({
      data: {
        name: name.trim(),
        ingredients: ingredients.trim(),
        description: description.trim(),
        type: type as FoodType,
        imageUrl: imageUrl?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, data: food }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/foods]", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat makanan baru" },
      { status: 500 },
    );
  }
}
