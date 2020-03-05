const { color } = require("../src/tuples.js");

function material() {
    let m = { color: color(1, 1, 1), ambient: 0.1, diffuse: 0.9, specular: 0.9, shininess: 200 };
    return m;
}

module.exports = {
    material
};
