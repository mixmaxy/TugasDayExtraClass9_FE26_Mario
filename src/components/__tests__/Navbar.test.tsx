import { render, screen } from "@testing-library/react";
import { Navbar } from "../Navbar";

describe("Navbar component", () => {
  it("renders the brand name FoodVault", () => {
    render(<Navbar />);
    expect(screen.getByText("FoodVault")).toBeInTheDocument();
  });

  it("brand link navigates to homepage", () => {
    render(<Navbar />);
    const brandLink = screen.getByRole("link", { name: /FoodVault - Halaman Utama/i });
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders 'Buat Makanan' CTA button", () => {
    render(<Navbar />);
    expect(screen.getByText("Buat Makanan")).toBeInTheDocument();
  });

  it("CTA link navigates to create food page", () => {
    render(<Navbar />);
    const ctaLink = screen.getByRole("link", { name: /Buat Makanan/i });
    expect(ctaLink).toHaveAttribute("href", "/foods/create");
  });

  it("renders a nav landmark with correct aria-label", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation", { name: /Navigasi utama/i })).toBeInTheDocument();
  });
});
