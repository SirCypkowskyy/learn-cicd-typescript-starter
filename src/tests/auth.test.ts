import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null when no authorization header", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer abc123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when header missing token after scheme", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the token when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey my-secret" };
    expect(getAPIKey(headers)).toBe("my-secret");
  });

  test("is case-sensitive for scheme (lowercase should fail)", () => {
    const headers: IncomingHttpHeaders = { authorization: "apikey wrong" };
    expect(getAPIKey(headers)).toBeNull();
  });
});
