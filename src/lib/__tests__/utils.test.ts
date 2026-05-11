import {
  truncate,
  formatDate,
  parseIngredients,
  cn,
  capitalize,
  FOOD_TYPE_LABELS,
} from "../utils";

// ─── truncate ──────────────────────────────────────────────────────────────

describe("truncate", () => {
  it("returns the original text if within maxLength", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("returns original text if exactly equal to maxLength", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("truncates and appends '...' when text exceeds maxLength", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
  });

  it("handles empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});

// ─── formatDate ────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("formats a Date object to Indonesian locale", () => {
    const date = new Date("2024-04-22");
    const result = formatDate(date);
    // Should contain the year
    expect(result).toContain("2024");
    // Should contain the month in Indonesian
    expect(result).toContain("April");
  });

  it("accepts a date string", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("2024");
    expect(result).toContain("Januari");
  });

  it("accepts custom Intl.DateTimeFormatOptions", () => {
    const result = formatDate(new Date("2024-04-22"), {
      month: "short",
      year: "numeric",
    });
    expect(result).toContain("2024");
  });
});

// ─── parseIngredients ──────────────────────────────────────────────────────

describe("parseIngredients", () => {
  it("splits a comma-separated string into an array", () => {
    expect(parseIngredients("nasi, telur, bawang")).toEqual([
      "nasi",
      "telur",
      "bawang",
    ]);
  });

  it("trims whitespace from each ingredient", () => {
    expect(parseIngredients("  nasi  ,  telur  ")).toEqual(["nasi", "telur"]);
  });

  it("filters out empty entries", () => {
    expect(parseIngredients("nasi,,telur,")).toEqual(["nasi", "telur"]);
  });

  it("returns an empty array for an empty string", () => {
    expect(parseIngredients("")).toEqual([]);
  });

  it("handles a single ingredient without comma", () => {
    expect(parseIngredients("nasi")).toEqual(["nasi"]);
  });
});

// ─── cn ────────────────────────────────────────────────────────────────────

describe("cn", () => {
  it("joins multiple class strings", () => {
    expect(cn("base", "active")).toBe("base active");
  });

  it("filters out falsy values", () => {
    expect(cn("base", undefined, null, false, "extra")).toBe("base extra");
  });

  it("returns empty string when all values are falsy", () => {
    expect(cn(undefined, null, false)).toBe("");
  });

  it("handles conditional class pattern", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toBe("base active");
  });
});

// ─── capitalize ────────────────────────────────────────────────────────────

describe("capitalize", () => {
  it("capitalizes the first letter of a string", () => {
    expect(capitalize("fresh")).toBe("Fresh");
  });

  it("returns empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });

  it("does not change already-capitalized string", () => {
    expect(capitalize("Fresh")).toBe("Fresh");
  });

  it("only capitalizes the first character", () => {
    expect(capitalize("ultra processed food")).toBe("Ultra processed food");
  });
});

// ─── FOOD_TYPE_LABELS ──────────────────────────────────────────────────────

describe("FOOD_TYPE_LABELS", () => {
  it("has label for 'fresh'", () => {
    expect(FOOD_TYPE_LABELS.fresh).toBe("Fresh");
  });

  it("has label for 'upf'", () => {
    expect(FOOD_TYPE_LABELS.upf).toBe("Ultra Processed Food");
  });
});
