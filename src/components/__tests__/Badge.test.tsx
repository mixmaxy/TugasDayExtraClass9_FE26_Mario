import { render, screen } from "@testing-library/react";
import { Badge } from "../ui/Badge";

describe("Badge component", () => {
  it("renders children text", () => {
    render(<Badge variant="fresh">Segar</Badge>);
    expect(screen.getByText("Segar")).toBeInTheDocument();
  });

  it("renders with fresh variant", () => {
    render(<Badge variant="fresh">Segar</Badge>);
    const badge = screen.getByText("Segar");
    expect(badge).toHaveClass("text-emerald-700");
  });

  it("renders with upf variant", () => {
    render(<Badge variant="upf">Ultra Proses</Badge>);
    const badge = screen.getByText("Ultra Proses");
    expect(badge).toHaveClass("text-orange-700");
  });

  it("renders with neutral variant", () => {
    render(<Badge variant="neutral">Netral</Badge>);
    const badge = screen.getByText("Netral");
    expect(badge).toHaveClass("text-stone-600");
  });

  it("renders icon when provided", () => {
    render(
      <Badge variant="fresh" icon={<span data-testid="icon">🌿</span>}>
        Segar
      </Badge>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render icon wrapper when icon is not provided", () => {
    render(<Badge variant="fresh">Segar</Badge>);
    // icon span should not be in the DOM
    expect(screen.queryByRole("none")).not.toBeInTheDocument();
  });
});
