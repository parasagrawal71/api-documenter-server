const { isEmptyObject } = require("./functions");

test("should return true for empty object", () => {
  expect(isEmptyObject({})).toBe(true);
});

test("should return false for non-empty object", () => {
  expect(isEmptyObject({ name: "paras" })).toBe(false);
});
