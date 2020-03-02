const {
    getM,
    getBool_MatricesAreEqual,
    matrix_multiply,
    matrix_transpose,
    identity_matrix,
    determinant,
    submatrix,
    minor,
    cofactor
} = require("../src/matrices.js");
const { tuple, getBool_numbersAreEqual, getBool_tuplesAreEqual } = require("../src/tuples.js");

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

test("Multiplying a matrix by the identity matrix", function() {
    let m1 = [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 4, 8, 16],
        [4, 8, 16, 32]
    ];
    expect(getBool_MatricesAreEqual(matrix_multiply(m1, identity_matrix), m1)).toBe(true);
});

test("Transposing a Matrix", function() {
    let m1 = [
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
    ];
    let m2 = [
        [0, 9, 1, 0],
        [9, 8, 8, 0],
        [3, 0, 5, 5],
        [0, 8, 3, 8]
    ];
    expect(getBool_MatricesAreEqual(matrix_transpose(m1), m2)).toBe(true);
});

test("Transposing the identity matrix", function() {
    expect(getBool_MatricesAreEqual(matrix_transpose(identity_matrix), identity_matrix)).toBe(true);
});

test("Calculating the determinant of a 2x2 matrix", function() {
    let m = [
        [1, 5],
        [-3, 2]
    ];
    expect(getBool_MatricesAreEqual(determinant(m), 17)).toBe(true);
});

test("A submatrix of 3x3 matrix is a 2x2 matrix", function() {
    let m = [
        [1, 5, 0],
        [-3, 2, 7],
        [0, 6, -3]
    ];
    let result = [
        [-3, 2],
        [0, 6]
    ];
    expect(getBool_MatricesAreEqual(submatrix(m, 0, 2), result)).toBe(true);
});

test("A submatrix of 4x4 matrix is a 3x3 matrix", function() {
    let m = [
        [-6, 1, 1, 6],
        [-8, 5, 8, 6],
        [-1, 0, 8, 2],
        [-7, 1, -1, 1]
    ];
    let result = [
        [-6, 1, 6],
        [-8, 8, 6],
        [-7, -1, 1]
    ];
    expect(getBool_MatricesAreEqual(submatrix(m, 2, 1), result)).toBe(true);
});

test("Calculating a minor of a 3 x 3 matrix", function() {
    let m = [
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
    ];
    let s = submatrix(m, 1, 0);
    let d = determinant(s);
    expect(getBool_numbersAreEqual(minor(m, 1, 0), d)).toBe(true);
    expect(getBool_numbersAreEqual(minor(m, 1, 0), 25)).toBe(true);
});

test("Calculating a cofactor of a 3 x 3 matrix", function() {
    let m = [
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
    ];
    expect(getBool_numbersAreEqual(minor(m, 0, 0), -12)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 0), -12)).toBe(true);
    expect(getBool_numbersAreEqual(minor(m, 1, 0), 25)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 1, 0), -25)).toBe(true);
});

test("Calculating the determinant of a 3 x 3 matrix", function() {
    let m = [
        [1, 2, 6],
        [-5, 8, -4],
        [2, 6, 4]
    ];
    expect(getBool_numbersAreEqual(cofactor(m, 0, 0), 56)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 1), 12)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 2), -46)).toBe(true);
    expect(getBool_numbersAreEqual(determinant(m), -196)).toBe(true);
});

test("Calculating the determinant of a 4 x 4 matrix", function() {
    let m = [
        [-2, -8, 3, 5],
        [-3, 1, 7, 3],
        [1, 2, -9, 6],
        [-6, 7, 7, -9]
    ];
    expect(getBool_numbersAreEqual(cofactor(m, 0, 0), 690)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 1), 447)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 2), 210)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m, 0, 3), 51)).toBe(true);
    expect(getBool_numbersAreEqual(determinant(m), -4071)).toBe(true);
});
