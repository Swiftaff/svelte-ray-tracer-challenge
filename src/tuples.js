const EPSILON = 0.00001;

function tuple(x, y, z, w) {
    return { x, y, z, w };
}

function point(x, y, z) {
    return { x, y, z, w: 1 };
}

function vector(x, y, z) {
    return { x, y, z, w: 0 };
}

function color(red, green, blue) {
    return { red, green, blue };
}

function projectile(position, velocity) {
    return { position, velocity };
}

function environment(gravity, wind) {
    return { gravity, wind };
}

function tick(env, proj) {
    let position = tuple_add(proj.position, proj.velocity);
    let envVector = tuple_add(env.gravity, env.wind);
    let velocity = tuple_add(proj.velocity, envVector);
    return projectile(position, velocity);
}

function getBool_tupleIsPoint(tuple) {
    return (
        tuple.hasOwnProperty("x") &&
        tuple.hasOwnProperty("y") &&
        tuple.hasOwnProperty("z") &&
        tuple.hasOwnProperty("w") &&
        typeof tuple.x == "number" &&
        typeof tuple.y == "number" &&
        typeof tuple.z == "number" &&
        typeof tuple.w == "number" &&
        tuple.w === 1
    );
}

function getBool_tupleIsVector(tuple) {
    return (
        tuple.hasOwnProperty("x") &&
        tuple.hasOwnProperty("y") &&
        tuple.hasOwnProperty("z") &&
        tuple.hasOwnProperty("w") &&
        typeof tuple.x == "number" &&
        typeof tuple.y == "number" &&
        typeof tuple.z == "number" &&
        typeof tuple.w == "number" &&
        tuple.w === 0
    );
}

function getBool_tupleIsColor(col) {
    return (
        col.hasOwnProperty("red") &&
        col.hasOwnProperty("green") &&
        col.hasOwnProperty("blue") &&
        typeof col.red == "number" &&
        typeof col.green == "number" &&
        typeof col.blue == "number"
    );
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

function getBool_isProjectile(proj) {
    return (
        proj.hasOwnProperty("position") &&
        proj.hasOwnProperty("velocity") &&
        getBool_tupleIsPoint(proj.position) &&
        getBool_tupleIsVector(proj.velocity)
    );
}

function getBool_isEnvironment(env) {
    return (
        env.hasOwnProperty("gravity") &&
        env.hasOwnProperty("wind") &&
        getBool_tupleIsVector(env.gravity) &&
        getBool_tupleIsVector(env.wind)
    );
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

function vector_normalize(a) {
    let m = vector_magnitude(a);
    let tuple = { x: a.x / m, y: a.y / m, z: a.z / m, w: a.w };
    if (tuple.w === 1) {
        console.warn("vector_normalize: can't normalize a point");
        return false;
    } else {
        return tuple;
    }
}

function vector_dotProduct(a, b) {
    if (a.w === 1 || b.w === 1) {
        console.warn("vector_dotProduct: can only dotproduct two vectors");
        return false;
    } else {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
}

function vector_crossProduct(a, b) {
    if (a.w === 1 || b.w === 1) {
        console.warn("vector_crossProduct: can only crossproduct two vectors");
        return false;
    } else {
        return vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
}

module.exports = {
    tuple,
    point,
    vector,
    color,
    projectile,
    environment,
    tick,
    getBool_tupleIsPoint,
    getBool_tupleIsVector,
    getBool_tupleIsColor,
    getBool_tuplesAreEqual,
    getBool_isProjectile,
    getBool_isEnvironment,
    getBool_numbersAreEqual,
    tuple_add,
    tuple_subtract,
    vector_negate,
    tuple_multiply,
    tuple_divide,
    vector_magnitude,
    vector_normalize,
    vector_dotProduct,
    vector_crossProduct
};
