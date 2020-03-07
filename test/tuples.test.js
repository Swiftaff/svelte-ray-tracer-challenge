const {
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
    getBool_colorsAreEqual,
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
    vector_crossProduct,
    colors_add,
    colors_subtract,
    colors_multiply,
    color_scalarMultiply,
    reflect
} = require("../src/tuples.js");

test("A tuple with w=1.0 is a point", function() {
    let a = tuple(4.3, -4.2, 3.1, 1.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(1.0);
    expect(getBool_tupleIsPoint(a)).toBe(true);
    expect(getBool_tupleIsVector(a)).toBe(false);
});

test("A tuple with w=0 is a vector", function() {
    let a = tuple(4.3, -4.2, 3.1, 0.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(0.0);
    expect(getBool_tupleIsPoint(a)).toBe(false);
    expect(getBool_tupleIsVector(a)).toBe(true);
});

test("point() creates tuples with w=1", function() {
    expect(getBool_tupleIsPoint(point(4, -4, 3))).toBe(true);
    expect(getBool_tupleIsVector(point(4, -4, 3))).toBe(false);
    expect(getBool_tupleIsColor(point(4, -4, 3))).toBe(false);
});

test("vector() creates tuples with w=0", function() {
    expect(getBool_tupleIsPoint(vector(4, -4, 3))).toBe(false);
    expect(getBool_tupleIsVector(vector(4, -4, 3))).toBe(true);
    expect(getBool_tupleIsColor(vector(4, -4, 3))).toBe(false);
});

test("color() creates (red, green, blue) tuples", function() {
    let a = color(-0.5, 0.4, 1.7);
    expect(a.red).toBe(-0.5);
    expect(a.green).toBe(0.4);
    expect(a.blue).toBe(1.7);
    expect(getBool_tupleIsPoint(color(4, -4, 3))).toBe(false);
    expect(getBool_tupleIsVector(color(4, -4, 3))).toBe(false);
    expect(getBool_tupleIsColor(color(4, -4, 3))).toBe(true);
});

test("projectile(p,v) creates object with position and velocity", function() {
    expect(getBool_isProjectile(projectile(point(1, 2, 3), vector(4, -4, 3)))).toBe(true);
    expect(getBool_isProjectile(projectile(vector(4, -4, 3), point(1, 2, 3)))).toBe(false);
    expect(getBool_isProjectile(projectile(vector(4, -4, 3), vector(1, 2, 3)))).toBe(false);
    expect(getBool_isProjectile(projectile(point(4, -4, 3), point(1, 2, 3)))).toBe(false);
});

test("environment(v,v) creates object with gravity and wind", function() {
    expect(getBool_isEnvironment(environment(vector(1, 2, 3), vector(4, -4, 3)))).toBe(true);
    expect(getBool_isEnvironment(environment(vector(4, -4, 3), point(1, 2, 3)))).toBe(false);
    expect(getBool_isEnvironment(environment(point(4, -4, 3), vector(1, 2, 3)))).toBe(false);
    expect(getBool_isEnvironment(environment(point(4, -4, 3), point(1, 2, 3)))).toBe(false);
});

test("tick(environment,projectile) creates correct projectile", function() {
    let env = environment(vector(0, -1, 0), vector(1, 0, 0));
    let proj = projectile(point(0, 0, 0), vector(1, 2, 3));
    let newProjectile = tick(env, proj);
    expect(getBool_isProjectile(newProjectile)).toBe(true);
    expect(getBool_tuplesAreEqual(newProjectile.position, point(1, 2, 3))).toBe(true);
    expect(getBool_tuplesAreEqual(newProjectile.velocity, vector(2, 1, 3))).toBe(true);
});

//getBool_tuplesAreEqual

test("tuples are equal: if exactly the same", function() {
    expect(getBool_tuplesAreEqual(point(4, -4, 3), point(4, -4, 3))).toBe(true);
    expect(getBool_tuplesAreEqual(vector(4, -4, 3), vector(4, -4, 3))).toBe(true);
});

test("tuples are NOT equal: if different", function() {
    expect(getBool_tuplesAreEqual(point(4, -4, 3), point(3, -2, 1))).toBe(false);
    expect(getBool_tuplesAreEqual(vector(4, -4, 3), vector(3, -2, 1))).toBe(false);
});

test("tuples are equal: if difference is less than EPSILON", function() {
    expect(getBool_tuplesAreEqual(point(4.000001, -4.000001, 3.000001), point(4, -4, 3))).toBe(true);
    expect(getBool_tuplesAreEqual(vector(4.000001, -4.000001, 3.000001), vector(4, -4, 3))).toBe(true);
});

test("tuples are NOT equal: if difference is more than EPSILON", function() {
    expect(getBool_tuplesAreEqual(point(4.0001, -4.0001, 3.0001), point(4, -4, 3))).toBe(false);
    expect(getBool_tuplesAreEqual(vector(4.0001, -4.0001, 3.0001), vector(4, -4, 3))).toBe(false);
});

//tuple_add

test("adding two tuples: point + vector = point", function() {
    expect(getBool_tuplesAreEqual(tuple_add(point(3, -2, 5), vector(-2, 3, 1)), point(1, 1, 6))).toBe(true);
});

test("adding two tuples: vector + vector = vector", function() {
    expect(getBool_tuplesAreEqual(tuple_add(vector(3, -2, 5), vector(-2, 3, 1)), vector(1, 1, 6))).toBe(true);
});

test("adding two tuples: vector + point = point", function() {
    expect(getBool_tuplesAreEqual(tuple_add(vector(3, -2, 5), point(-2, 3, 1)), point(1, 1, 6))).toBe(true);
});

test("adding two tuples: point + point = false (and console error)", function() {
    expect(tuple_add(point(3, -2, 5), point(-2, 3, 1))).toBe(false);
});

//tuple_subtract

test("subtract two tuples: point - point = vector", function() {
    expect(getBool_tuplesAreEqual(tuple_subtract(point(3, 2, 1), point(5, 6, 7)), vector(-2, -4, -6))).toBe(true);
});

test("subtract two tuples: point - vector = point", function() {
    expect(getBool_tuplesAreEqual(tuple_subtract(point(3, 2, 1), vector(5, 6, 7)), point(-2, -4, -6))).toBe(true);
});

test("subtract two tuples: vector - vector = vector", function() {
    expect(getBool_tuplesAreEqual(tuple_subtract(vector(3, 2, 1), vector(5, 6, 7)), vector(-2, -4, -6))).toBe(true);
});

test("subtract two tuples: vector - point = false (and console error)", function() {
    expect(tuple_subtract(vector(3, 2, 1), point(5, 6, 7))).toBe(false);
});

//vector_negate

test("negate a vector = -vector", function() {
    expect(getBool_tuplesAreEqual(vector_negate(vector(1, -2, 3)), vector(-1, 2, -3))).toBe(true);
});

test("negate a point = false (and console error)", function() {
    expect(vector_negate(point(1, -2, 3))).toBe(false);
});

//tuple_multiply

test("Multiplying a vector by a scalar", function() {
    expect(getBool_tuplesAreEqual(tuple_multiply(vector(1, -2, 3), 3.5), vector(3.5, -7, 10.5))).toBe(true);
});

test("Multiplying a point by a scalar", function() {
    expect(getBool_tuplesAreEqual(tuple_multiply(point(1, -2, 3), 3.5), point(3.5, -7, 10.5))).toBe(true);
});

test("Multiplying a vector by a fraction", function() {
    expect(getBool_tuplesAreEqual(tuple_multiply(vector(1, -2, 3), 0.5), vector(0.5, -1, 1.5))).toBe(true);
});

test("Multiplying a point by a fraction", function() {
    expect(getBool_tuplesAreEqual(tuple_multiply(point(1, -2, 3), 0.5), point(0.5, -1, 1.5))).toBe(true);
});

//tuple_divide

test("Dividing a vector by a scalar", function() {
    expect(getBool_tuplesAreEqual(tuple_divide(vector(1, -2, 3), 2), vector(0.5, -1, 1.5))).toBe(true);
});

test("Dividing a point by a scalar", function() {
    expect(getBool_tuplesAreEqual(tuple_divide(point(1, -2, 3), 2), point(0.5, -1, 1.5))).toBe(true);
});

//vector_magnitude

test("Computing the magnitude ofvector(1, 0, 0)", function() {
    expect(getBool_numbersAreEqual(vector_magnitude(vector(1, 0, 0)), 1)).toBe(true);
});

test("Computing the magnitude ofvector(0, 1, 0)", function() {
    expect(getBool_numbersAreEqual(vector_magnitude(vector(0, 1, 0)), 1)).toBe(true);
});

test("Computing the magnitude ofvector(0, 0, 1)", function() {
    expect(getBool_numbersAreEqual(vector_magnitude(vector(0, 0, 1)), 1)).toBe(true);
});

test("Computing the magnitude ofvector(1, 2, 3)", function() {
    expect(getBool_numbersAreEqual(vector_magnitude(vector(1, 2, 3)), Math.sqrt(14))).toBe(true);
});

test("Computing the magnitude ofvector(-1, -2, -3)", function() {
    expect(getBool_numbersAreEqual(vector_magnitude(vector(-1, -2, -3)), Math.sqrt(14))).toBe(true);
});

//vector_normalize

test("vector_normalize(4, 0, 0) gives vector(1, 0, 0)", function() {
    expect(getBool_tuplesAreEqual(vector_normalize(vector(4, 0, 0)), vector(1, 0, 0))).toBe(true);
});

test("vector_normalize(1,2,3) gives vector(1/√14, 2/√14, 3/√14)", function() {
    expect(getBool_tuplesAreEqual(vector_normalize(vector(1, 2, 3)), vector(0.26726, 0.53452, 0.80178))).toBe(true);
});

test("The magnitude of a normalized vector gives 1", function() {
    let norm = vector_normalize(vector(1, 2, 3));
    expect(getBool_numbersAreEqual(vector_magnitude(norm), 1)).toBe(true);
});

test("vector_normalize a point = false (and console error)", function() {
    expect(vector_normalize(point(1, -2, 3))).toBe(false);
});

//vector_dotProduct

test("The dot product of two vectors", function() {
    expect(getBool_numbersAreEqual(vector_dotProduct(vector(1, 2, 3), vector(2, 3, 4)), 20)).toBe(true);
});

test("Can't vector_dotProduct points = false (and console error)", function() {
    expect(vector_dotProduct(point(1, 2, 3), vector(2, 3, 4))).toBe(false);
});

test("Can't vector_dotProduct points = false (and console error)", function() {
    expect(vector_dotProduct(point(1, 2, 3), point(2, 3, 4))).toBe(false);
});

test("Can't vector_dotProduct points = false (and console error)", function() {
    expect(vector_dotProduct(vector(1, 2, 3), point(2, 3, 4))).toBe(false);
});

//vector_crossProduct

test("The cross product of two vectors a and b", function() {
    expect(getBool_tuplesAreEqual(vector_crossProduct(vector(1, 2, 3), vector(2, 3, 4)), vector(-1, 2, -1))).toBe(true);
});

test("The cross product of two vectors b and a", function() {
    expect(getBool_tuplesAreEqual(vector_crossProduct(vector(2, 3, 4), vector(1, 2, 3)), vector(1, -2, 1))).toBe(true);
});

test("Can't vector_crossProduct points = false (and console error)", function() {
    expect(vector_crossProduct(point(1, 2, 3), vector(2, 3, 4))).toBe(false);
});

test("Can't vector_crossProduct points = false (and console error)", function() {
    expect(vector_crossProduct(point(1, 2, 3), point(2, 3, 4))).toBe(false);
});

test("Can't vector_crossProduct points = false (and console error)", function() {
    expect(vector_crossProduct(vector(1, 2, 3), point(2, 3, 4))).toBe(false);
});

//colors

test("adding two colors", function() {
    expect(getBool_colorsAreEqual(colors_add(color(0.9, 0.6, 0.75), color(0.7, 0.1, 0.25)), color(1.6, 0.7, 1.0))).toBe(
        true
    );
});

test("subtracting two colors", function() {
    expect(
        getBool_colorsAreEqual(colors_subtract(color(0.9, 0.6, 0.75), color(0.7, 0.1, 0.25)), color(0.2, 0.5, 0.5))
    ).toBe(true);
});

test("multiplying a color by a scalar", function() {
    expect(getBool_colorsAreEqual(color_scalarMultiply(color(0.2, 0.3, 0.4), 2), color(0.4, 0.6, 0.8))).toBe(true);
});

test("multiplying a color by another color", function() {
    expect(getBool_colorsAreEqual(colors_multiply(color(1, 0.2, 0.4), color(0.9, 1, 0.1)), color(0.9, 0.2, 0.04))).toBe(
        true
    );
});

test("Reflecting a vector approaching at 45°", function() {
    let v = vector(1, -1, 0);
    let n = vector(0, 1, 0);
    let r = reflect(v, n);
    let result = vector(1, 1, 0);
    expect(getBool_tuplesAreEqual(r, result)).toBe(true);
});

test("Reflecting a vector off a slanted surface", function() {
    let v = vector(0, -1, 0);
    let n = vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    let r = reflect(v, n);
    let result = vector(1, 0, 0);
    expect(getBool_tuplesAreEqual(r, result)).toBe(true);
});
