const { point, vector, getBool_tuplesAreEqual } = require("../src/tuples.js");
const { ray, position } = require("../src/rays.js");

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
