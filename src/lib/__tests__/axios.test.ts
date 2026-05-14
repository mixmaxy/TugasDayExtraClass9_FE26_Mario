import MockAdapter from "axios-mock-adapter";
import { apiClient, api } from "../axios";

const mock = new MockAdapter(apiClient);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe("apiClient — default config", () => {
  it("has correct default baseURL", () => {
    expect(apiClient.defaults.baseURL).toBe(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );
  });

  it("has Content-Type: application/json header", () => {
    const headers = apiClient.defaults.headers;
    const contentType =
      headers.common?.["Content-Type"] ??
      headers.post?.["Content-Type"] ??
      (headers as Record<string, unknown>)["Content-Type"];
    expect(contentType).toBe("application/json");
  });

  it("has timeout set to 30000ms", () => {
    expect(apiClient.defaults.timeout).toBe(30000);
  });
});

describe("apiClient — response interceptor (success)", () => {
  it("returns response data on 2xx", async () => {
    mock.onGet("/test").reply(200, { success: true, data: "ok" });

    const response = await apiClient.get("/test");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true, data: "ok" });
  });
});

describe("apiClient — response interceptor (errors)", () => {
  it("rejects with ApiErrorResponse shape on error", async () => {
    mock.onGet("/fail").reply(500, { error: "Server crash" });

    await expect(apiClient.get("/fail")).rejects.toMatchObject({
      success: false,
      error: expect.any(String),
      status: 500,
    });
  });

  it("uses error.error from response data when available", async () => {
    mock.onGet("/fail").reply(400, { error: "Request tidak valid" });

    await expect(apiClient.get("/fail")).rejects.toMatchObject({
      success: false,
      error: "Request tidak valid",
      status: 400,
    });
  });

  it("uses error.message from response data when error field is absent", async () => {
    mock.onGet("/fail").reply(400, { message: "Bad input" });

    await expect(apiClient.get("/fail")).rejects.toMatchObject({
      success: false,
      error: "Bad input",
      status: 400,
    });
  });

  it("returns status 400 default message when response data has no error/message", async () => {
    mock.onGet("/fail").reply(400, {});

    await expect(apiClient.get("/fail")).rejects.toMatchObject({
      success: false,
      error: "Request tidak valid. Periksa kembali data yang dikirim.",
      status: 400,
    });
  });

  it("returns status 401 default message", async () => {
    mock.onGet("/auth").reply(401, {});

    await expect(apiClient.get("/auth")).rejects.toMatchObject({
      success: false,
      error: "Anda tidak terautentikasi. Silakan login kembali.",
      status: 401,
    });
  });

  it("returns status 403 default message", async () => {
    mock.onGet("/forbidden").reply(403, {});

    await expect(apiClient.get("/forbidden")).rejects.toMatchObject({
      success: false,
      error: "Anda tidak memiliki akses ke resource ini.",
      status: 403,
    });
  });

  it("returns status 404 default message", async () => {
    mock.onGet("/not-found").reply(404, {});

    await expect(apiClient.get("/not-found")).rejects.toMatchObject({
      success: false,
      error: "Resource tidak ditemukan.",
      status: 404,
    });
  });

  it("returns status 500 default message", async () => {
    mock.onGet("/server-error").reply(500, {});

    await expect(apiClient.get("/server-error")).rejects.toMatchObject({
      success: false,
      error: "Terjadi kesalahan di server. Silakan coba lagi.",
      status: 500,
    });
  });

  it("returns fallback message for unknown status codes", async () => {
    mock.onGet("/weird").reply(418, {});

    await expect(apiClient.get("/weird")).rejects.toMatchObject({
      success: false,
      error: "Terjadi kesalahan tidak terduga.",
    });
  });

  it("returns timeout message when connection aborts", async () => {
    mock.onGet("/slow").timeout();

    await expect(apiClient.get("/slow")).rejects.toMatchObject({
      success: false,
      error: "Request timeout. Koneksi internet Anda mungkin lambat.",
    });
  });
});

describe("api — convenience methods", () => {
  it("api.get sends GET request", async () => {
    mock.onGet("/foods").reply(200, { success: true, data: [] });
    const res = await api.get("/foods");
    expect(res.data).toEqual({ success: true, data: [] });
  });

  it("api.post sends POST request with body", async () => {
    const payload = { name: "Apple" };
    mock.onPost("/foods", payload).reply(201, { success: true, data: payload });
    const res = await api.post("/foods", payload);
    expect(res.data.success).toBe(true);
  });

  it("api.put sends PUT request", async () => {
    const payload = { name: "Updated" };
    mock.onPut("/foods/1", payload).reply(200, { success: true, data: payload });
    const res = await api.put("/foods/1", payload);
    expect(res.data.success).toBe(true);
  });

  it("api.patch sends PATCH request", async () => {
    mock.onPatch("/foods/1").reply(200, { success: true });
    const res = await api.patch("/foods/1", { name: "Patched" });
    expect(res.data).toMatchObject({ success: true });
  });

  it("api.delete sends DELETE request", async () => {
    mock.onDelete("/foods/1").reply(200, { success: true });
    const res = await api.delete("/foods/1");
    expect(res.data).toMatchObject({ success: true });
  });
});
