const {
    getM,
    getBool_matricesAreEqual,
    getBool_matrixIsInvertible,
    matrix_multiply,
    matrix_transpose,
    identity_matrix,
    determinant,
    submatrix,
    minor,
    cofactor,
    inverse
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
    expect(getBool_matricesAreEqual(m1, m2)).toBe(true);
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
    expect(getBool_matricesAreEqual(m1, m2)).toBe(false);
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
    expect(getBool_matricesAreEqual(matrix_multiply(m1, m2), m3)).toBe(true);
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
    expect(getBool_matricesAreEqual(matrix_multiply(m1, identity_matrix), m1)).toBe(true);
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
    expect(getBool_matricesAreEqual(matrix_transpose(m1), m2)).toBe(true);
});

test("Transposing the identity matrix", function() {
    expect(getBool_matricesAreEqual(matrix_transpose(identity_matrix), identity_matrix)).toBe(true);
});

test("Calculating the determinant of a 2x2 matrix", function() {
    let m = [
        [1, 5],
        [-3, 2]
    ];
    expect(getBool_numbersAreEqual(determinant(m), 17)).toBe(true);
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
    expect(getBool_matricesAreEqual(submatrix(m, 0, 2), result)).toBe(true);
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
    expect(getBool_matricesAreEqual(submatrix(m, 2, 1), result)).toBe(true);
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

test("Testing an invertible matrix for invertability", function() {
    let m = [
        [6, 4, 4, 4],
        [5, 5, 7, 6],
        [4, -9, 3, -7],
        [9, 1, 7, -6]
    ];
    expect(getBool_numbersAreEqual(determinant(m), -2120)).toBe(true);
    expect(getBool_matrixIsInvertible(m)).toBe(true);
});

test("Testing a noninvertible matrix for invertability", function() {
    let m = [
        [-4, 2, -2, -3],
        [9, 6, 2, 6],
        [0, -5, 1, -5],
        [0, 0, 0, 0]
    ];
    expect(getBool_numbersAreEqual(determinant(m), 0)).toBe(true);
    expect(getBool_matrixIsInvertible(m)).toBe(false);
});

test("Calculating the inverse of a matrix", function() {
    let m1 = [
        [-5, 2, 6, -8],
        [1, -5, 1, 8],
        [7, 7, -6, -7],
        [1, -3, 7, 4]
    ];
    let m2 = inverse(m1);
    let result = [
        [0.21805, 0.45113, 0.2406, -0.04511],
        [-0.80827, -1.45677, -0.44361, 0.52068],
        [-0.07895, -0.22368, -0.05263, 0.19737],
        [-0.52256, -0.81391, -0.30075, 0.30639]
    ];
    expect(getBool_numbersAreEqual(determinant(m1), 532)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m1, 2, 3), -160)).toBe(true);
    expect(getBool_numbersAreEqual(m2[3][2], -160 / 532)).toBe(true);
    expect(getBool_numbersAreEqual(cofactor(m1, 3, 2), 105)).toBe(true);
    expect(getBool_numbersAreEqual(m2[2][3], 105 / 532)).toBe(true);
    expect(getBool_matricesAreEqual(m2, result)).toBe(true);
});

test("Calculating the inverse of another matrix", function() {
    let m1 = [
        [8, -5, 9, 2],
        [7, 5, 6, 1],
        [-6, 0, 9, 6],
        [-3, 0, -9, -4]
    ];
    let m2 = inverse(m1);
    let result = [
        [-0.15385, -0.15385, -0.28205, -0.53846],
        [-0.07692, 0.12308, 0.02564, 0.03077],
        [0.35897, 0.35897, 0.4359, 0.92308],
        [-0.69231, -0.69231, -0.76923, -1.92308]
    ];
    expect(getBool_matricesAreEqual(m2, result)).toBe(true);
});

test("Calculating the inverse of a third matrix", function() {
    let m1 = [
        [9, 3, 0, 9],
        [-5, -2, -6, -3],
        [-4, 9, 6, 4],
        [-7, 6, 6, 2]
    ];
    let m2 = inverse(m1);
    let result = [
        [-0.04074, -0.07778, 0.14444, -0.22222],
        [-0.07778, 0.03333, 0.36667, -0.33333],
        [-0.02901, -0.1463, -0.10926, 0.12963],
        [0.17778, 0.06667, -0.26667, 0.33333]
    ];
    expect(getBool_matricesAreEqual(m2, result)).toBe(true);
});

test("Multiplying a product by its inverse", function() {
    let m1 = [
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [-6, 5, -1, 1]
    ];
    let m2 = [
        [8, 2, 2, 2],
        [3, -1, 7, 0],
        [7, 0, 5, 4],
        [6, -2, 0, 5]
    ];
    let m3 = matrix_multiply(m1, m2);
    expect(getBool_matricesAreEqual(matrix_multiply(m3, inverse(m2)), m1)).toBe(true);
});
