import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "../error";

describe("ErrorPage (app/error.tsx)", () => {
  const mockError = new Error("Something went wrong") as Error & { digest?: string };
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders the error heading", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(
      screen.getByRole("heading", { name: /Terjadi Kesalahan/i })
    ).toBeInTheDocument();
  });

  it("displays the error message from the error prop", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows fallback message when error has no message", () => {
    const emptyError = new Error("") as Error & { digest?: string };
    render(<ErrorPage error={emptyError} reset={mockReset} />);
    expect(
      screen.getByText(/Terjadi kesalahan yang tidak terduga/i)
    ).toBeInTheDocument();
  });

  it("calls reset when 'Coba Lagi' button is clicked", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={mockError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /Coba Lagi/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders 'Ke Daftar Makanan' link to /foods", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const link = screen.getByRole("link", { name: /Ke Daftar Makanan/i });
    expect(link).toHaveAttribute("href", "/foods");
  });

  it("logs the error to console on mount", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(console.error).toHaveBeenCalledWith("[App Error]", mockError);
  });
});
