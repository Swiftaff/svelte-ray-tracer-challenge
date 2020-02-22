const { matrix, getM, getBool_MatricesAreEqual, matrix_multiply } = require("../src/matrices.js");
const { tuple, getBool_tuplesAreEqual } = require("../src/tuples.js");

test("Creating a matrix", function() {
    let m = [
        [1, 2, 3, 4],
        [5.5, 6.5, 7.5, 8.5],
        [9, 10, 11, 12],
        [13.5, 14.5, 15.5, 16.5]
    ];
    expect(getM(m, 0, 0)).toBe(1);
    expect(getM(m, 0, 3)).toBe(4);
    expect(getM(m, 1, 0)).toBe(5.5);
    expect(getM(m, 1, 2)).toBe(7.5);
    expect(getM(m, 2, 2)).toBe(11);
    expect(getM(m, 3, 0)).toBe(13.5);
    expect(getM(m, 3, 2)).toBe(15.5);
});

test("A 2x2 matrix ought to be representable", function() {
    let m = [
        [-3, 5],
        [1, -2]
    ];
    expect(getM(m, 0, 0)).toBe(-3);
    expect(getM(m, 0, 1)).toBe(5);
    expect(getM(m, 1, 0)).toBe(1);
    expect(getM(m, 1, 1)).toBe(-2);
});

test("A 3x3 matrix ought to be representable", function() {
    let m = [
        [-3, 5, 0],
        [1, -2, -7],
        [0, 1, 1]
    ];
    expect(getM(m, 0, 0)).toBe(-3);
    expect(getM(m, 1, 1)).toBe(-2);
    expect(getM(m, 2, 2)).toBe(1);
});

test("Matrix equality with identical matrices", function() {
    let m1 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ];
    let m2 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ];
    expect(getBool_MatricesAreEqual(m1, m2)).toBe(true);
});

test("Matrix equality with different matrices", function() {
    let m1 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ];
    let m2 = [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [8, 7, 6, 5],
        [4, 3, 2, 1]
    ];
    expect(getBool_MatricesAreEqual(m1, m2)).toBe(false);
});

test("Multiplying two matrices", function() {
    let m1 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ];
    let m2 = [
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
    ];
    let m3 = [
        [20, 22, 50, 48],
        [44, 54, 114, 108],
        [40, 58, 110, 102],
        [16, 26, 46, 42]
    ];
    expect(getBool_MatricesAreEqual(matrix_multiply(m1, m2), m3)).toBe(true);
});

test("A matrix multiplied by a tuple", function() {
    let m1 = [
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
    ];
    let t = tuple(1, 2, 3, 1);
    let r = tuple(18, 24, 33, 1);
    expect(getBool_tuplesAreEqual(matrix_multiply(m1, t), r)).toBe(true);
});
