const { inverse, matrix_multiply } = require("../src/matrices.js");
const { vector, point, getBool_tuplesAreEqual } = require("../src/tuples.js");
const { translation, scaling } = require("../src/transformations.js");

//translation
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

//scaling
test("A scaling matrix applied to a point", function() {
    let p = point(-4, 6, 8);
    let t = scaling(2, 3, 4);
    let result = point(-8, 18, 32);
    expect(getBool_tuplesAreEqual(matrix_multiply(t, p), result)).toBe(true);
});

test("A scaling matrix applied to a vector", function() {
    let v = vector(-4, 6, 8);
    let t = scaling(2, 3, 4);
    let result = vector(-8, 18, 32);
    expect(getBool_tuplesAreEqual(matrix_multiply(t, v), result)).toBe(true);
});

test("Multiplying by the inverse of a scaling matrix", function() {
    let v = vector(-4, 6, 8);
    let t = scaling(2, 3, 4);
    let i = inverse(t);
    let iv = matrix_multiply(i, v);
    let result = vector(-2, 2, 2);
    expect(getBool_tuplesAreEqual(iv, result)).toBe(true);
});

test("Reflection is scaling by a negative value", function() {
    let p = point(2, 3, 4);
    let t = scaling(-1, 1, 1);
    let result = point(-2, 3, 4);
    expect(getBool_tuplesAreEqual(matrix_multiply(t, p), result)).toBe(true);
});
