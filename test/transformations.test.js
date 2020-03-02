const { inverse, matrix_multiply } = require("../src/matrices.js");
const { vector, point, getBool_tuplesAreEqual } = require("../src/tuples.js");
const { translation } = require("../src/transformations.js");

test("Multiplying by a translation matrix", function() {
    let p = point(-3, 4, 5);
    let t = translation(5, -3, 2);
    let result = point(2, 1, 7);
    expect(getBool_tuplesAreEqual(matrix_multiply(t, p), result)).toBe(true);
});

test("Multiplying by the inverse of a translation matrix", function() {
    let p = point(-3, 4, 5);
    let t = translation(5, -3, 2);
    let i = inverse(t);
    let result = point(-8, 7, 3);
    expect(getBool_tuplesAreEqual(matrix_multiply(i, p), result)).toBe(true);
});

test("Translation does not affect vectors", function() {
    let v = vector(-3, 4, 5);
    let t = translation(5, -3, 2);
    expect(getBool_tuplesAreEqual(matrix_multiply(t, v), v)).toBe(true);
});
