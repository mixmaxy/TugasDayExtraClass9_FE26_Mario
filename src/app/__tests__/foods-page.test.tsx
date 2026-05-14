import { render, screen } from "@testing-library/react";
import FoodsPage from "../foods/page";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    food: {
      findMany: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

jest.mock("@/components/FoodCard", () => ({
  FoodCard: ({ food }: any) => <div data-testid={`food-card-${food.id}`}>{food.name}</div>,
}));

describe("FoodsPage (app/foods/page.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the empty state when there are no foods", async () => {
    (mockPrisma.food.findMany as jest.Mock).mockResolvedValue([]);

    const page = await FoodsPage();
    render(page);

    expect(screen.getByRole("heading", { name: /Daftar Makanan/i })).toBeInTheDocument();
    expect(screen.getByText(/Belum Ada Makanan/i)).toBeInTheDocument();
    expect(screen.getByText(/Mulai dengan membuat makanan pertamamu!/i)).toBeInTheDocument();
  });

  it("renders the food list and stats when foods exist", async () => {
    const mockFoods = [
      { id: "1", name: "Apple", description: "Fresh apple", type: "fresh", imageUrl: null, createdAt: new Date() },
      { id: "2", name: "Burger", description: "Fast food", type: "upf", imageUrl: null, createdAt: new Date() },
    ];
    (mockPrisma.food.findMany as jest.Mock).mockResolvedValue(mockFoods);

    const page = await FoodsPage();
    render(page);

    expect(screen.getByRole("heading", { name: /Daftar Makanan/i })).toBeInTheDocument();
    expect(screen.getByText("2 Makanan")).toBeInTheDocument();
    expect(screen.getByText("1 Segar")).toBeInTheDocument();
    expect(screen.getByText("1 Ultra Proses")).toBeInTheDocument();

    expect(screen.getByTestId("food-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("food-card-2")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
  });

  it("throws an error if prisma fails to fetch foods", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    (mockPrisma.food.findMany as jest.Mock).mockRejectedValue(new Error("Database crash"));

    await expect(FoodsPage()).rejects.toThrow("Gagal mengambil data makanan");
    
    consoleSpy.mockRestore();
  });
});
