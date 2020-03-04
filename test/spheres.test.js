const { point, vector, getBool_numbersAreEqual } = require("../src/tuples.js");
const { ray } = require("../src/rays.js");
const { sphere, intersect, set_transform } = require("../src/spheres.js");
const { getBool_matricesAreEqual, identity_matrix } = require("../src/matrices.js");
const { translation, scaling } = require("../src/transformations.js");

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

test("A sphere's default transformation", function() {
    let s = sphere();
    expect(getBool_matricesAreEqual(s.transform, identity_matrix)).toBe(true);
});

test("Changing a sphere's transformation", function() {
    let s = sphere();
    let t = translation(2, 3, 4);
    s = set_transform(s, t);
    expect(getBool_matricesAreEqual(s.transform, t)).toBe(true);
});

test("Intersecting a scaled sphere with a ray", function() {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let t = scaling(2, 2, 2);
    s = set_transform(s, t);
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 2)).toBe(true);
    expect(getBool_numbersAreEqual(xs[0].t, 3)).toBe(true);
    expect(getBool_numbersAreEqual(xs[1].t, 7)).toBe(true);
});

test("Intersecting a translated sphere with a ray", function() {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let t = translation(5, 0, 0);
    s = set_transform(s, t);
    let xs = intersect(s, r);
    expect(getBool_numbersAreEqual(xs.length, 0)).toBe(true);
});
