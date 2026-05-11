import { render, screen } from "@testing-library/react";
import { FormField } from "../ui/FormField";

describe("FormField component", () => {
  it("renders label text", () => {
    render(
      <FormField label="Nama" htmlFor="name">
        <input id="name" />
      </FormField>
    );
    expect(screen.getByText("Nama")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(
      <FormField label="Nama" htmlFor="name">
        <input id="name" />
      </FormField>
    );
    expect(screen.getByLabelText("Nama")).toBeInTheDocument();
  });

  it("shows required asterisk when required=true", () => {
    render(
      <FormField label="Nama" htmlFor="name" required>
        <input id="name" />
      </FormField>
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required asterisk by default", () => {
    render(
      <FormField label="Nama" htmlFor="name">
        <input id="name" />
      </FormField>
    );
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("shows '(opsional)' badge when optional=true", () => {
    render(
      <FormField label="Gambar" htmlFor="image" optional>
        <input id="image" />
      </FormField>
    );
    expect(screen.getByText("(opsional)")).toBeInTheDocument();
  });

  it("shows error message and not hint when error is provided", () => {
    render(
      <FormField label="Nama" htmlFor="name" error="Wajib diisi" hint="Tulis nama Anda">
        <input id="name" />
      </FormField>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Wajib diisi");
    expect(screen.queryByText("Tulis nama Anda")).not.toBeInTheDocument();
  });

  it("shows hint text when no error", () => {
    render(
      <FormField label="Nama" htmlFor="name" hint="Tulis nama Anda">
        <input id="name" />
      </FormField>
    );
    expect(screen.getByText("Tulis nama Anda")).toBeInTheDocument();
  });

  it("renders children (input slot)", () => {
    render(
      <FormField label="Nama" htmlFor="name">
        <input id="name" data-testid="the-input" />
      </FormField>
    );
    expect(screen.getByTestId("the-input")).toBeInTheDocument();
  });
});
