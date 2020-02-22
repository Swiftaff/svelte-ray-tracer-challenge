function matrix(h, w) {
    return Array.from({ length: h }, _ => Array(w).fill(0));
}

function getM(m, y, x) {
    if (m && m[y] && typeof m[y][x] === "number") {
        return m[y][x];
    } else {
        console.warn("get matrix value: error");
        return false;
    }
}

function getBool_MatricesAreEqual(m1, m2) {
    return JSON.stringify(m1) === JSON.stringify(m2);
}

function matrix_multiply(m1, m2) {
    let m1y = m1.length;
    let m1x = m1[0].length;
    let m2y = m2.length;
    let m2x = m2[0].length;
    if (m1y === m2y && m1x === m2x) {
        let result = matrix(m1y, m1x);
        for (let y = 0; y < m1y; y++) {
            for (let x = 0; x < m1x; x++) {
                let thisResult = 0;
                for (let xx = 0; xx < m1x; xx++) {
                    thisResult += m1[y][xx] * m2[xx][x];
                }
                result[y][x] = thisResult;
            }
        }
        console.log(result);
        return result;
    } else {
        console.warn("can't multiply different sized matrices");
        return false;
    }
}

//is this the long way?
/*
function getBool_MatricesAreEqual(m1, m2) {
    let areEqual = true;
    let m1y = m1.length;
    let m1x = m1[0].length;
    let m2y = m2.length;
    let m2x = m2[0].length;

    if (m1y === m2y && m1x === m2x) {
        for (let y = 0; y < m1.length; y++) {
            for (let x = 0; index < array.length; index++) {
                if (!getBool_numbersAreEqual(m1[y][x], b.x)) {
                    areEqal = false;
                }
            }
        }
    } else {
        areEqual = false;
    }
    return areEqual;
}
*/

module.exports = {
    matrix,
    getM,
    getBool_MatricesAreEqual,
    matrix_multiply
};
