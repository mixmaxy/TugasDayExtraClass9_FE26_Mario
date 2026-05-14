import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

describe("NotFound page (app/not-found.tsx)", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: /Halaman Tidak Ditemukan/i })
    ).toBeInTheDocument();
  });

  it("renders decorative 404 number", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders descriptive message", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/Makanan atau halaman yang kamu cari tidak ada/i)
    ).toBeInTheDocument();
  });

  it("renders 'Kembali ke Daftar Makanan' link to /foods", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /Kembali ke Daftar Makanan/i });
    expect(link).toHaveAttribute("href", "/foods");
  });
});
