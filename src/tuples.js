const EPSILON = 0.00001;

function getBool_tupleIsPoint(tuple) {
    return tuple.w === 1;
}

function getBool_tupleIsVector(tuple) {
    return tuple.w === 0;
}

function getBool_tuplesAreEqual(a, b) {
    return (
        getBool_numbersAreEqual(a.x, b.x) &&
        getBool_numbersAreEqual(a.y, b.y) &&
        getBool_numbersAreEqual(a.z, b.z) &&
        a.w === b.w
    );
}

function getBool_numbersAreEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}

function tuple_add(a, b) {
    let tuple = { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z, w: a.w + b.w };
    if (tuple.w === 2) {
        console.warn("tuple_add: can't add two points");
        return false;
    } else {
        return tuple;
    }
}

function tuple_subtract(a, b) {
    let tuple = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z, w: a.w - b.w };
    if (tuple.w === -1) {
        console.warn("tuple_subtract: can't subtract a point from a vector");
        return false;
    } else {
        return tuple;
    }
}

function tuple_multiply(a, s) {
    return { x: a.x * s, y: a.y * s, z: a.z * s, w: a.w };
}

function tuple_divide(a, s) {
    return { x: a.x / s, y: a.y / s, z: a.z / s, w: a.w };
}

function vector_negate(a) {
    let tuple = { x: -a.x, y: -a.y, z: -a.z, w: a.w };
    if (tuple.w === 1) {
        console.warn(
            "tuple_negate: can't negate a point (is this correct - example on page 7 'Negating a tuple' shows the 4th value not being 0 or 1??)"
        );
        return false;
    } else {
        return tuple;
    }
}

function vector_magnitude(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

function tuple(x, y, z, w) {
    return { x, y, z, w };
}

function point(x, y, z) {
    return { x, y, z, w: 1 };
}

function vector(x, y, z) {
    return { x, y, z, w: 0 };
}

module.exports = {
    tuple,
    point,
    vector,
    getBool_tupleIsPoint,
    getBool_tupleIsVector,
    getBool_tuplesAreEqual,
    getBool_numbersAreEqual,
    tuple_add,
    tuple_subtract,
    vector_negate,
    tuple_multiply,
    tuple_divide,
    vector_magnitude
};
