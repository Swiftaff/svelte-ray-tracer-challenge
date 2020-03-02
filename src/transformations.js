const { identity_matrix, matrix_clone } = require("./matrices.js");

function translation(x, y, z) {
    let t = matrix_clone(identity_matrix);
    t[0][3] = x;
    t[1][3] = y;
    t[2][3] = z;
    return t;
}

function scaling(x, y, z) {
    let t = matrix_clone(identity_matrix);
    t[0][0] = x;
    t[1][1] = y;
    t[2][2] = z;
    return t;
}

module.exports = {
    translation,
    scaling
};
