import { render, screen } from "@testing-library/react";
import { FoodCard } from "../FoodCard";
import type { Food } from "@/types/food";

describe("FoodCard component", () => {
  const mockFoodFresh: Pick<Food, "id" | "name" | "description" | "type" | "imageUrl"> = {
    id: "1",
    name: "Apple",
    description: "Fresh red apple",
    type: "fresh",
    imageUrl: "/apple.jpg",
  };

  const mockFoodUPF: Pick<Food, "id" | "name" | "description" | "type" | "imageUrl"> = {
    id: "2",
    name: "Soda",
    description: "Sugary drink",
    type: "upf",
    imageUrl: null,
  };

  it("renders correctly with fresh food and image", () => {
    render(<FoodCard food={mockFoodFresh} />);
    
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Fresh red apple")).toBeInTheDocument();
    expect(screen.getByText("Segar")).toBeInTheDocument();
    
    const link = screen.getByRole("link", { name: /Lihat detail Apple/i });
    expect(link).toHaveAttribute("href", "/foods/1");
    
    const image = screen.getByAltText("Gambar Apple");
    expect(image).toBeInTheDocument();
  });

  it("renders correctly with upf food and no image", () => {
    render(<FoodCard food={mockFoodUPF} />);
    
    expect(screen.getByText("Soda")).toBeInTheDocument();
    expect(screen.getByText("Sugary drink")).toBeInTheDocument();
    expect(screen.getByText("Ultra Proses")).toBeInTheDocument();
    
    const link = screen.getByRole("link", { name: /Lihat detail Soda/i });
    expect(link).toHaveAttribute("href", "/foods/2");
    
    const placeholder = screen.getByTestId("image-placeholder");
    expect(placeholder).toBeInTheDocument();
  });
});
