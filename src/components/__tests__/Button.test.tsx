import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../ui/Button";

describe("Button component", () => {
  it("renders children text", () => {
    render(<Button>Simpan</Button>);
    expect(screen.getByRole("button", { name: "Simpan" })).toBeInTheDocument();
  });

  it("is enabled by default", () => {
    render(<Button>Klik</Button>);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Klik</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled and shows loading text when isLoading is true", () => {
    render(<Button isLoading loadingText="Memproses...">Simpan</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Memproses...")).toBeInTheDocument();
  });

  it("shows children as loading text when isLoading=true but loadingText is not provided", () => {
    render(<Button isLoading>Simpan</Button>);
    // children is reused as loading text
    expect(screen.getByText("Simpan")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders leftIcon when provided", () => {
    render(
      <Button leftIcon={<span data-testid="icon">✓</span>}>Simpan</Button>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Klik</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Klik</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
