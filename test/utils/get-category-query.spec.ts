import { getCategoryQuery, type CategoryQuery } from "../../src/utils/get-category-query";
import type { Context } from "telegraf";

describe("getCategoryQuery", () => {
  it("should return the correct categoryId when provided with valid context", () => {
    const mockCtx = {
      match: ["someText", "12345"],
    } as unknown as Context;

    const result: CategoryQuery = getCategoryQuery(mockCtx);

    expect(result).toEqual({ categoryId: "12345" });
  });

  it("should throw an error when match array does not contain a valid categoryId", () => {
    const mockCtx = {
      match: ["someText"],
    } as unknown as Context;

    expect(() => getCategoryQuery(mockCtx)).toThrow(
      "Could not extract category id from the query"
    );
  });

  it("should handle null or undefined context gracefully", () => {
    const mockCtx = null as unknown as Context;

    expect(() => getCategoryQuery(mockCtx)).toThrow(
      "Could not extract category id from the query"
    );
  });
});
