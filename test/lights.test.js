const { point_light } = require("../src/lights.js");
const { color, point, getBool_tuplesAreEqual } = require("../src/tuples.js");

test("A point light has a position and intensity", function() {
    let intensity = color(1, 1, 1);
    let position = point(0, 0, 0);
    let light = point_light(position, intensity);
    expect(light.intensity).toMatchObject(intensity);
    expect(light.position).toMatchObject(position);
});
