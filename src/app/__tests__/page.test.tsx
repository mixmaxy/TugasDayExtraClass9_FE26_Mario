import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home page (app/page.tsx)", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Kelola Nutrisi/i })
    ).toBeInTheDocument();
  });

  it("renders 'Lihat Katalog' CTA link to /foods", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Lihat Katalog/i });
    expect(link).toHaveAttribute("href", "/foods");
  });

  it("renders 'Tambah Baru' CTA link to /foods/create", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Tambah Baru/i });
    expect(link).toHaveAttribute("href", "/foods/create");
  });

  it("renders the Features section heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Mengapa Memilih FoodVault/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 feature cards", () => {
    render(<Home />);
    expect(screen.getByText("Klasifikasi Otomatis")).toBeInTheDocument();
    expect(screen.getByText("Detail Nutrisi")).toBeInTheDocument();
    expect(screen.getByText("Akses Cepat")).toBeInTheDocument();
  });

  it("renders floating add button for mobile with correct href", () => {
    render(<Home />);
    const fab = screen.getByRole("link", { name: /Tambah Makanan Baru/i });
    expect(fab).toHaveAttribute("href", "/foods/create");
  });
});
