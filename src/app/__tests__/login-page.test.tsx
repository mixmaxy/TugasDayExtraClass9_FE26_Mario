import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../login/page";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("LoginPage (app/login/page.tsx)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form elements", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: /Selamat Datang/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Masuk/i })).toBeInTheDocument();
  });

  it("toggles password visibility when the eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: /Tampilkan password/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: /Sembunyikan password/i })).toBeInTheDocument();
  });

  it("disables the submit button when inputs are empty", () => {
    render(<LoginPage />);
    const submitButton = screen.getByRole("button", { name: /Masuk/i });

    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when inputs are filled", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");

    const submitButton = screen.getByRole("button", { name: /Masuk/i });
    expect(submitButton).toBeEnabled();
  });

  it("handles successful login and redirects", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/Email/i), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");

    const submitButton = screen.getByRole("button", { name: /Masuk/i });

    await act(async () => {
      await user.click(submitButton);
    });

    expect(submitButton).toHaveTextContent(/Masuk/i);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(pushMock).toHaveBeenCalledWith("/foods");

    jest.useRealTimers();
  });
});
