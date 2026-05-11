import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  it("renders brand name FoodVault", () => {
    render(<Footer />);
    expect(screen.getByText("FoodVault")).toBeInTheDocument();
  });

  it("renders current year in copyright text", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders Katalog link pointing to /foods", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Katalog" });
    expect(link).toHaveAttribute("href", "/foods");
  });

  it("renders Tambah link pointing to /foods/create", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Tambah" });
    expect(link).toHaveAttribute("href", "/foods/create");
  });

  it("renders a footer landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
