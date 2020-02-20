const {
    tuple,
    point,
    vector,
    getBool_tupleIsPoint,
    getBool_tupleIsVector,
    getBool_tuplesAreEqual,
    tuple_add,
    tuple_subtract
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

test("A tuple with w=0 is a point", function() {
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
});

test("vector() creates tuples with w=0", function() {
    expect(getBool_tupleIsPoint(vector(4, -4, 3))).toBe(false);
    expect(getBool_tupleIsVector(vector(4, -4, 3))).toBe(true);
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

test("adding two tuples: vector + point = vector", function() {
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
