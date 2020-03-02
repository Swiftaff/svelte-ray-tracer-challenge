const { inverse, matrix_multiply } = require("../src/matrices.js");
const { vector, point, getBool_tuplesAreEqual } = require("../src/tuples.js");
const { translation, scaling, rotation_x_rad, rotation_y_rad, rotation_z_rad } = require("../src/transformations.js");

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

//rotations

test("Rotating a point around the x axis", function() {
    let p = point(0, 1, 0);
    let half_quarter = rotation_x_rad(Math.PI / 4);
    let full_quarter = rotation_x_rad(Math.PI / 2);
    let result1 = point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    let result2 = point(0, 0, 1);
    expect(getBool_tuplesAreEqual(matrix_multiply(half_quarter, p), result1)).toBe(true);
    expect(getBool_tuplesAreEqual(matrix_multiply(full_quarter, p), result2)).toBe(true);
});

test("The inverse of an x-rotation rotates in the opposite direction", function() {
    let p = point(0, 1, 0);
    let half_quarter = rotation_x_rad(Math.PI / 4);
    let inv = inverse(half_quarter);
    let result = point(0, Math.sqrt(2) / 2, -1 * (Math.sqrt(2) / 2));
    expect(getBool_tuplesAreEqual(matrix_multiply(inv, p), result)).toBe(true);
});

test("Rotating a point around the y axis", function() {
    let p = point(0, 0, 1);
    let half_quarter = rotation_y_rad(Math.PI / 4);
    let full_quarter = rotation_y_rad(Math.PI / 2);
    let result1 = point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    let result2 = point(1, 0, 0);
    expect(getBool_tuplesAreEqual(matrix_multiply(half_quarter, p), result1)).toBe(true);
    expect(getBool_tuplesAreEqual(matrix_multiply(full_quarter, p), result2)).toBe(true);
});

test("Rotating a point around the z axis", function() {
    let p = point(0, 1, 0);
    let half_quarter = rotation_z_rad(Math.PI / 4);
    let full_quarter = rotation_z_rad(Math.PI / 2);
    let result1 = point((-1 * Math.sqrt(2)) / 2, Math.sqrt(2) / 2, 0);
    let result2 = point(-1, 0, 0);
    expect(getBool_tuplesAreEqual(matrix_multiply(half_quarter, p), result1)).toBe(true);
    expect(getBool_tuplesAreEqual(matrix_multiply(full_quarter, p), result2)).toBe(true);
});

