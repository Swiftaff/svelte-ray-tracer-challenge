const { material } = require("../src/materials.js");
const { color, vector, point, getBool_colorsAreEqual } = require("../src/tuples.js");
const { point_light, lighting } = require("../src/lights.js");

test("The default material", function() {
    let m = material();
    expect(m.color).toMatchObject(color(1, 1, 1));
    expect(m.ambient).toBe(0.1);
    expect(m.diffuse).toBe(0.9);
    expect(m.specular).toBe(0.9);
    expect(m.shininess).toBe(200);
});

let m = material();
let position = point(0, 0, 0);

test("Lighting with the eye between the light and the surface", function() {
    let eyev = vector(0, 0, -1);
    let normalv = vector(0, 0, -1);
    let light = point_light(point(0, 0, -10), color(1, 1, 1));
    let result = lighting(m, light, position, eyev, normalv);
    expect(result).toMatchObject(color(1.9, 1.9, 1.9));
});

test("Lighting with the eye between light and surface, eye offset 45°", function() {
    let eyev = vector(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    let normalv = vector(0, 0, -1);
    let light = point_light(point(0, 0, -10), color(1, 1, 1));
    let result = lighting(m, light, position, eyev, normalv);
    expect(result).toMatchObject(color(1, 1, 1));
});

test("Lighting with eye opposite surface, light offset 45°", function() {
    let eyev = vector(0, 0, -1);
    let normalv = vector(0, 0, -1);
    let light = point_light(point(0, 10, -10), color(1, 1, 1));
    let result = lighting(m, light, position, eyev, normalv);
    expect(getBool_colorsAreEqual(result, color(0.7364, 0.7364, 0.7364))).toBe(true);
});

test("Lighting with eye in the path of the reflection vector", function() {
    let eyev = vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    let normalv = vector(0, 0, -1);
    let light = point_light(point(0, 10, -10), color(1, 1, 1));
    let result = lighting(m, light, position, eyev, normalv);
    expect(getBool_colorsAreEqual(result, color(1.6364, 1.6364, 1.6364))).toBe(true);
});

test("Lighting with the light behind the surface", function() {
    let eyev = vector(0, 0, -1);
    let normalv = vector(0, 0, -1);
    let light = point_light(point(0, 0, 10), color(1, 1, 1));
    let result = lighting(m, light, position, eyev, normalv);
    expect(result).toMatchObject(color(0.1, 0.1, 0.1));
});
