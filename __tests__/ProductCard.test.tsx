import "@testing-library/jest-dom";

function add(a: number, b: number) {
  return a + b;
}

test("sum of numbers to be 7", () => {
  expect(add(3, 4)).toBe(7);
});
