const { point, vector, getBool_tuplesAreEqual, getBool_numbersAreEqual } = require("../src/tuples.js");
const { ray, position, sphere, intersect } = require("../src/rays.js");

test("Creating and querying a ray", function() {
    let origin = point(1, 2, 3);
    let direction = vector(4, 5, 6);
    let r = ray(origin, direction);
    expect(r.origin).toBe(origin);
    expect(r.direction).toBe(direction);
});

test("Computing a point from a distance", function() {
    let r = ray(point(2, 3, 4), vector(1, 0, 0));
    expect(getBool_tuplesAreEqual(position(r, 0), point(2, 3, 4))).toBe(true);
    expect(getBool_tuplesAreEqual(position(r, 1), point(3, 3, 4))).toBe(true);
    expect(getBool_tuplesAreEqual(position(r, -1), point(1, 3, 4))).toBe(true);
    expect(getBool_tuplesAreEqual(position(r, 2.5), point(4.5, 3, 4))).toBe(true);
});

test("Spheres have unique IDs", function() {
    let s1 = sphere();
    let s2 = sphere();
    let s3 = sphere();
    let s4 = sphere();
    expect(s1.id === s2.id).toBe(false);
    expect(s2.id === s3.id).toBe(false);
    expect(s3.id === s4.id).toBe(false);
    expect(s4.id === s1.id).toBe(false);
});

test("A ray intersects a sphere at two points", function() {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    console.log(xs);
    expect(getBool_numbersAreEqual(xs[0], 4)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1], 6)).toBe(true);
});

test("A ray intersects a sphere at a tangent", function() {
    let r = ray(point(0, 1, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0], 5)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1], 5)).toBe(true);
});

test("A ray misses a sphere", function() {
    let r = ray(point(0, 2, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 0)).toBe(true);
});

test("A ray originates inside a sphere", function() {
    let r = ray(point(0, 0, 0), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0], -1)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1], 1)).toBe(true);
});

test("A sphere is behind a ray", function() {
    let r = ray(point(0, 0, 5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0], -6)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1], -4)).toBe(true);
});
