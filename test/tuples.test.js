const { tuple, point, vector, getBool_tuple4ObjIsPoint, getBool_tuple4ObjIsVector } = require("../src/tuples.js");

test("A tuple with w=1.0 is a point", function() {
    let a = tuple(4.3, -4.2, 3.1, 1.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(1.0);
    expect(getBool_tuple4ObjIsPoint(a)).toBe(true);
    expect(getBool_tuple4ObjIsVector(a)).toBe(false);
});

test("A tuple with w=0 is a point", function() {
    let a = tuple(4.3, -4.2, 3.1, 0.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(0.0);
    expect(getBool_tuple4ObjIsPoint(a)).toBe(false);
    expect(getBool_tuple4ObjIsVector(a)).toBe(true);
});

test("point() creates tuples with w=1", function() {
    expect(getBool_tuple4ObjIsPoint(point(4, -4, 3))).toBe(true);
    expect(getBool_tuple4ObjIsVector(point(4, -4, 3))).toBe(false);
});

test("vector() creates tuples with w=0", function() {
    expect(getBool_tuple4ObjIsPoint(vector(4, -4, 3))).toBe(false);
    expect(getBool_tuple4ObjIsVector(vector(4, -4, 3))).toBe(true);
});
