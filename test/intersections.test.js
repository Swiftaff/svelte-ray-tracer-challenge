const { getBool_numbersAreEqual } = require("../src/tuples.js");
const { sphere } = require("../src/spheres.js");
const { intersection, list_intersections, hit } = require("../src/intersections.js");

test("An intersection encapsulates t and object", function() {
    let s = sphere();
    let i = intersection(3.5, s);
    expect(getBool_numbersAreEqual(i.t, 3.5)).toBe(true);
    expect(i.id).toBe(s.id);
});

test("Aggregating intersections", function() {
    let s = sphere();
    let i1 = intersection(1, s);
    let i2 = intersection(2, s);
    let xs = list_intersections([i1, i2]);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(1);
    expect(xs[1].t).toBe(2);
});

test("The hit, when all intersections have positive t", function() {
    let s = sphere();
    let i1 = intersection(1, s);
    let i2 = intersection(2, s);
    let xs = list_intersections([i2, i1]);
    let i = hit(xs);
    expect(i).toMatchObject(i1);
});

test("The hit, when some intersections have negative t", function() {
    let s = sphere();
    let i1 = intersection(-1, s);
    let i2 = intersection(1, s);
    let xs = list_intersections([i2, i1]);
    let i = hit(xs);
    expect(i).toMatchObject(i2);
});

test("The hit, when all intersections have negative t", function() {
    let s = sphere();
    let i1 = intersection(-2, s);
    let i2 = intersection(-1, s);
    let xs = list_intersections([i1, i2]);
    let i = hit(xs);
    expect(i).toBe(false);
});

test("The hit is always the lowest nonnegative intersection", function() {
    let s = sphere();
    let i1 = intersection(5, s);
    let i2 = intersection(7, s);
    let i3 = intersection(-3, s);
    let i4 = intersection(2, s);
    let xs = list_intersections([i1, i2, i3, i4]);
    let i = hit(xs);
    expect(i).toMatchObject(i4);
});
