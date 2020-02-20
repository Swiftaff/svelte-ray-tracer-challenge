function getBool_tuple4ObjIsPoint(tuple4Obj) {
    return tuple4Obj.w === 1;
}

function getBool_tuple4ObjIsVector(tuple4Obj) {
    return tuple4Obj.w === 0;
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

module.exports = { tuple, point, vector, getBool_tuple4ObjIsPoint, getBool_tuple4ObjIsVector };
