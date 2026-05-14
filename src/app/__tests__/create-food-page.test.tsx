import { render, screen } from "@testing-library/react";
import CreateFoodPage from "../foods/create/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

describe("CreateFoodPage (app/foods/create/page.tsx)", () => {
  it("renders the page heading 'Makanan Baru'", () => {
    render(<CreateFoodPage />);
    expect(
      screen.getByRole("heading", { name: /Makanan Baru/i })
    ).toBeInTheDocument();
  });

  it("renders 'Kembali ke Daftar' back navigation link", () => {
    render(<CreateFoodPage />);
    const link = screen.getByRole("link", { name: /Kembali ke Daftar/i });
    expect(link).toHaveAttribute("href", "/foods");
  });

  it("renders the Tips Pengisian section", () => {
    render(<CreateFoodPage />);
    expect(screen.getByText(/Tips Pengisian/i)).toBeInTheDocument();
  });

  it("renders fresh food tip text", () => {
    render(<CreateFoodPage />);
    expect(screen.getByText(/Makanan alami seperti buah/i)).toBeInTheDocument();
  });

  it("renders UPF tip text", () => {
    render(<CreateFoodPage />);
    expect(
      screen.getByText(/Makanan dengan banyak bahan tambahan pabrik/i)
    ).toBeInTheDocument();
  });
});
