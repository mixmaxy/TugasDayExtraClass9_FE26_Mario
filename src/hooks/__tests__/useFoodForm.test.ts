import { renderHook, act } from "@testing-library/react";
import { useFoodForm } from "../useFoodForm";

// ─── Initial state ─────────────────────────────────────────────────────────

describe("useFoodForm — initial state", () => {
  it("starts with empty default values", () => {
    const { result } = renderHook(() => useFoodForm());
    expect(result.current.values).toEqual({
      name: "",
      description: "",
      ingredients: "",
      type: "fresh",
      imageUrl: "",
    });
  });

  it("accepts and merges custom initial values", () => {
    const { result } = renderHook(() =>
      useFoodForm({ initialValues: { name: "Apple", type: "fresh" } })
    );
    expect(result.current.values.name).toBe("Apple");
    expect(result.current.values.type).toBe("fresh");
    // Fields not provided retain defaults
    expect(result.current.values.description).toBe("");
  });

  it("starts with no errors", () => {
    const { result } = renderHook(() => useFoodForm());
    expect(result.current.errors).toEqual({});
  });

  it("isValid is false when required fields are empty", () => {
    const { result } = renderHook(() => useFoodForm());
    expect(result.current.isValid).toBe(false);
  });

  it("isValid is true when all required fields are filled", () => {
    const { result } = renderHook(() =>
      useFoodForm({
        initialValues: {
          name: "Apple",
          description: "A juicy red apple",
          ingredients: "apple",
        },
      })
    );
    expect(result.current.isValid).toBe(true);
  });
});

// ─── handleChange ──────────────────────────────────────────────────────────

describe("useFoodForm — handleChange", () => {
  it("updates the target field value", () => {
    const { result } = renderHook(() => useFoodForm());
    act(() => {
      result.current.handleChange("name", "Banana");
    });
    expect(result.current.values.name).toBe("Banana");
  });

  it("does not affect other fields when one field changes", () => {
    const { result } = renderHook(() => useFoodForm());
    act(() => {
      result.current.handleChange("name", "Banana");
    });
    expect(result.current.values.description).toBe("");
    expect(result.current.values.ingredients).toBe("");
  });

  it("clears the error for the changed field", () => {
    const { result } = renderHook(() => useFoodForm());

    // Trigger a validation error first
    act(() => {
      result.current.validate();
    });
    expect(result.current.errors.name).toBeDefined();

    // Then type in the field — error should be cleared
    act(() => {
      result.current.handleChange("name", "Apple");
    });
    expect(result.current.errors.name).toBeUndefined();
  });
});

// ─── validate ──────────────────────────────────────────────────────────────

describe("useFoodForm — validate", () => {
  it("returns false and sets errors when all required fields are empty", () => {
    const { result } = renderHook(() => useFoodForm());
    let isValid: boolean;
    act(() => {
      isValid = result.current.validate();
    });
    expect(isValid!).toBe(false);
    expect(result.current.errors.name).toBe("Nama makanan wajib diisi");
    expect(result.current.errors.description).toBe("Deskripsi wajib diisi");
    expect(result.current.errors.ingredients).toBe("Bahan-bahan wajib diisi");
  });

  it("returns false when description is too short (< 10 chars)", () => {
    const { result } = renderHook(() =>
      useFoodForm({
        initialValues: {
          name: "Apple",
          description: "Short",
          ingredients: "apple",
        },
      })
    );
    let isValid: boolean;
    act(() => {
      isValid = result.current.validate();
    });
    expect(isValid!).toBe(false);
    expect(result.current.errors.description).toBe(
      "Deskripsi minimal 10 karakter"
    );
  });

  it("returns true when all required fields are valid", () => {
    const { result } = renderHook(() =>
      useFoodForm({
        initialValues: {
          name: "Apple",
          description: "A delicious and juicy red apple",
          ingredients: "apple",
        },
      })
    );
    let isValid: boolean;
    act(() => {
      isValid = result.current.validate();
    });
    expect(isValid!).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it("ignores leading/trailing whitespace in required field check", () => {
    const { result } = renderHook(() =>
      useFoodForm({ initialValues: { name: "   " } })
    );
    act(() => {
      result.current.validate();
    });
    expect(result.current.errors.name).toBe("Nama makanan wajib diisi");
  });
});

// ─── reset ─────────────────────────────────────────────────────────────────

describe("useFoodForm — reset", () => {
  it("resets values back to initial values", () => {
    const { result } = renderHook(() =>
      useFoodForm({ initialValues: { name: "Apple" } })
    );

    // Change a field
    act(() => {
      result.current.handleChange("name", "Banana");
    });
    expect(result.current.values.name).toBe("Banana");

    // Reset
    act(() => {
      result.current.reset();
    });
    expect(result.current.values.name).toBe("Apple");
  });

  it("clears all errors on reset", () => {
    const { result } = renderHook(() => useFoodForm());

    // Trigger errors
    act(() => {
      result.current.validate();
    });
    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

    // Reset should clear errors
    act(() => {
      result.current.reset();
    });
    expect(result.current.errors).toEqual({});
  });
});
