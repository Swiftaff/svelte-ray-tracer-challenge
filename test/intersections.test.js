const { getBool_numbersAreEqual } = require("../src/tuples.js");
const { sphere } = require("../src/spheres.js");
const { intersection, intersections } = require("../src/intersections.js");

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
    let xs = intersections(i1, i2);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(1);
    expect(xs[1].t).toBe(2);
});
