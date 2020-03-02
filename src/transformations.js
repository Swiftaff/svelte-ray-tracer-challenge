const { identity_matrix } = require("./matrices.js");

function translation(x, y, z) {
    let t = identity_matrix;
    t[0][3] = x;
    t[1][3] = y;
    t[2][3] = z;
    return t;
}

module.exports = {
    translation
};
