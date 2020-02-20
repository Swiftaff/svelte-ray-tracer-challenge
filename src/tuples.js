const EPSILON = 0.00001;

function getBool_tupleIsPoint(tuple) {
    return tuple.w === 1;
}

function getBool_tupleIsVector(tuple) {
    return tuple.w === 0;
}

function getBool_tuplesAreEqual(a, b) {
    return (
        Math.abs(a.x - b.x) < EPSILON && Math.abs(a.y - b.y) < EPSILON && Math.abs(a.z - b.z) < EPSILON && a.w === b.w
    );
}

function tuple_add(a, b) {
    let tuple = { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z, w: a.w + b.w };
    if (tuple.w === 2) {
        console.error("tuple_add: can't add two points");
        return false;
    } else {
        return tuple;
    }
}

function tuple_subtract(a, b) {
    let tuple = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z, w: a.w - b.w };
    if (tuple.w === -1) {
        console.error("tuple_add: can't subtract a point from a vector");
        return false;
    } else {
        return tuple;
    }
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
    tuple_add,
    tuple_subtract
};
