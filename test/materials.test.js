const { material } = require("../src/materials.js");
const { color } = require("../src/tuples.js");

test("The default material", function() {
    let m = material();
    expect(m.color).toMatchObject(color(1, 1, 1));
    expect(m.ambient).toBe(0.1);
    expect(m.diffuse).toBe(0.9);
    expect(m.specular).toBe(0.9);
    expect(m.shininess).toBe(200);
});
