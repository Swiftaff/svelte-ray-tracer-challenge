const { warnings, getBool_isTuple, getBool_numbersAreEqual, getMatrix_fromTuple, trunc } = require("../src/tuples.js");

const identity_matrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

function matrix_clone(m) {
    let rows = m.length;
    let cols = m[0].length;
    let newMatrix = matrix(rows, cols);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            newMatrix[y][x] = m[y][x];
        }
    }
    return newMatrix;
}

function matrix(h, w) {
    return Array.from({ length: h }, _ => Array(w).fill(0));
}

function getM(m, y, x) {
    if (m && m[y] && typeof m[y][x] === "number") {
        return m[y][x];
    } else {
        if (warnings) console.warn("get matrix value: error");
        return false;
    }
}

function getBool_matricesAreEqual(m1, m2) {
    let failed = false;
    let rows = m1.length;
    let cols = m1[0].length;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (!getBool_numbersAreEqual(m1[y][x], m2[y][x])) {
                failed = true;
            }
        }
    }
    return !failed;
}

function getBool_matrixIsInvertible(m) {
    return !getBool_numbersAreEqual(determinant(m), 0);
}

function matrix_multiply(m1, m2) {
    let m1y = m1.length;
    let m1x = m1[0].length;
    let m2isTuple = false;

    //allows m2 to be a tuple for matrix & tuple multiplication
    if (getBool_isTuple(m2)) {
        let newM2 = [[m2.x], [m2.y], [m2.z], [m2.w]];
        m2 = newM2;
        m2isTuple = true;
    }
    let m2y = m2.length;
    let m2x = m2[0].length;
    if (m1y === m2y) {
        let result = matrix(m1y, m2x);
        for (let y = 0; y < m1y; y++) {
            for (let x = 0; x < m2x; x++) {
                let thisResult = 0;
                for (let xx = 0; xx < m1x; xx++) {
                    thisResult += m1[y][xx] * m2[xx][x];
                }
                result[y][x] = trunc(thisResult);
            }
        }
        let finalResult = m2isTuple ? getMatrix_fromTuple(result) : result;
        return finalResult;
    } else {
        if (warnings) console.warn("can't multiply different sized matrices");
        return false;
    }
}

function matrix_transpose(m) {
    let my = m.length;
    let mx = m[0].length;
    let result = matrix(my, mx);
    for (let y = 0; y < my; y++) {
        for (let x = 0; x < mx; x++) {
            result[y][x] = m[x][y];
        }
    }
    return result;
}

function determinant(m) {
    let det = 0;
    if (m.length === 2) {
        det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
    } else {
        for (let col = 0; col < m.length; col++) {
            det = det + m[0][col] * cofactor(m, 0, col);
        }
    }
    return trunc(det);
}

function submatrix(m, rowToDelete, colToDelete) {
    let my = m.length;
    let mx = m[0].length;
    let result = matrix(my - 1, mx - 1);
    for (let y = 0; y < my; y++) {
        for (let x = 0; x < mx; x++) {
            if (y !== rowToDelete) {
                if (x !== colToDelete) {
                    let xx = x > colToDelete ? x - 1 : x;
                    let yy = y > rowToDelete ? y - 1 : y;
                    result[yy][xx] = m[y][x];
                }
            }
        }
    }
    return result;
}

function minor(m, rowToDelete, colToDelete) {
    return determinant(submatrix(m, rowToDelete, colToDelete));
}

function cofactor(m, row, col) {
    let m1 = minor(m, row, col);
    return (row + col) % 2 === 1 ? -1 * m1 : m1;
}

function inverse(m) {
    if (getBool_matrixIsInvertible(m)) {
        let my = m.length;
        let mx = m[0].length;
        let result = matrix(my, mx);
        for (let y = 0; y < my; y++) {
            for (let x = 0; x < mx; x++) {
                let c = cofactor(m, y, x);
                result[x][y] = trunc(c / determinant(m));
            }
        }
        return result;
    } else {
        if (warnings) console.warn("can't invert this matrix");
        return m;
    }
}

module.exports = {
    identity_matrix,
    matrix,
    getM,
    getBool_matricesAreEqual,
    getBool_matrixIsInvertible,
    matrix_clone,
    matrix_multiply,
    matrix_transpose,
    determinant,
    submatrix,
    minor,
    cofactor,
    inverse
};
