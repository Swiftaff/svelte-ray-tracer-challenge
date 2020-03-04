const { point, vector, getBool_tuplesAreEqual } = require("../src/tuples.js");
const { ray, position, transform } = require("../src/rays.js");
const { translation, scaling } = require("../src/transformations.js");

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

test("Translating a ray", function() {
    let r = ray(point(1, 2, 3), vector(0, 1, 0));
    let m = translation(3, 4, 5);
    let r2 = transform(r, m);
    expect(getBool_tuplesAreEqual(r2.origin, point(4, 6, 8))).toBe(true);
    expect(getBool_tuplesAreEqual(r2.direction, vector(0, 1, 0))).toBe(true);
});

test("Scaling a ray", function() {
    let r = ray(point(1, 2, 3), vector(0, 1, 0));
    let m = scaling(2, 3, 4);
    let r2 = transform(r, m);
    expect(getBool_tuplesAreEqual(r2.origin, point(2, 6, 12))).toBe(true);
    expect(getBool_tuplesAreEqual(r2.direction, vector(0, 3, 0))).toBe(true);
});
