const {
    point,
    vector,
    vector_normalize,
    getBool_numbersAreEqual,
    getBool_tuplesAreEqual
} = require("../src/tuples.js");
const { ray } = require("../src/rays.js");
const { sphere, intersect, set_transform, normal_at, set_material } = require("../src/spheres.js");
const { getBool_matricesAreEqual, identity_matrix, matrix_multiply } = require("../src/matrices.js");
const { translation, scaling, rotation_z_rad } = require("../src/transformations.js");
const { material } = require("../src/materials.js");

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

//normal_at
test("The normal on a sphere at a point on the x axis", function() {
    let s = sphere();
    let n = normal_at(s, point(1, 0, 0));
    let result = vector(1, 0, 0);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("The normal on a sphere at a point on the y axis", function() {
    let s = sphere();
    let n = normal_at(s, point(0, 1, 0));
    let result = vector(0, 1, 0);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("The normal on a sphere at a point on the z axis", function() {
    let s = sphere();
    let n = normal_at(s, point(0, 0, 1));
    let result = vector(0, 0, 1);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("The normal on a sphere at a nonaxial point", function() {
    let s = sphere();
    let n = normal_at(s, point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    let result = vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("The normal is a normalized vector", function() {
    let s = sphere();
    let n = normal_at(s, point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    let result = vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3);
    expect(getBool_tuplesAreEqual(result, vector_normalize(result))).toBe(true);
});

test("Computing the normal on a translated sphere", function() {
    let s = sphere();
    s = set_transform(s, translation(0, 1, 0));
    let n = normal_at(s, point(0, 1.70711, -0.70711));
    let result = vector(0, 0.70711, -0.70711);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("Computing the normal on a transformed sphere", function() {
    let s = sphere();
    let m = matrix_multiply(scaling(1, 0.5, 1), rotation_z_rad(Math.PI / 5));
    s = set_transform(s, m);
    let n = normal_at(s, point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
    let result = vector(0, 0.97014, -0.24254);
    expect(getBool_tuplesAreEqual(n, result)).toBe(true);
});

test("A sphere has a default material", function() {
    let s = sphere();
    let m = s.material;
    expect(m).toMatchObject(material());
});

test("A sphere may be assigned a material", function() {
    let s = sphere();
    let m = material();
    m.ambient = 1;
    s = set_material(s, m);
    expect(s.material).toMatchObject(m);
});
