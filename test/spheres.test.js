const { point, vector, getBool_numbersAreEqual } = require("../src/tuples.js");
const { ray } = require("../src/rays.js");
const { sphere, intersect } = require("../src/spheres.js");

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
    expect(getBool_numbersAreEqual(xs[0].t, 4)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1].t, 6)).toBe(true);
});

test("A ray intersects a sphere at a tangent", function() {
    let r = ray(point(0, 1, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0].t, 5)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1].t, 5)).toBe(true);
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
    expect(getBool_numbersAreEqual(xs[0].t, -1)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1].t, 1)).toBe(true);
});

test("A sphere is behind a ray", function() {
    let r = ray(point(0, 0, 5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0].t, -6)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1].t, -4)).toBe(true);
});

test("Intersect sets the object on the intersection", function() {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(xs[0].id).toBe(s.id);
    expect(xs[1].id).toBe(s.id);
});
