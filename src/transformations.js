const { identity_matrix, matrix_clone } = require("./matrices.js");

function radians_to_degrees(r) {
    return (r * 180) / Math.PI;
}

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

function rotation_x_rad(r) {
    let t = matrix_clone(identity_matrix);
    t[1][1] = Math.cos(r);
    t[1][2] = -1 * Math.sin(r);
    t[2][1] = Math.sin(r);
    t[2][2] = Math.cos(r);
    return t;
}

function rotation_y_rad(r) {
    let t = matrix_clone(identity_matrix);
    t[0][0] = Math.cos(r);
    t[0][2] = Math.sin(r);
    t[2][0] = -1 * Math.sin(r);
    t[2][2] = Math.cos(r);
    return t;
}

function rotation_z_rad(r) {
    let t = matrix_clone(identity_matrix);
    t[0][0] = Math.cos(r);
    t[0][2] = -1 * Math.sin(r);
    t[1][0] = Math.sin(r);
    t[1][2] = Math.cos(r);
    return t;
}

module.exports = {
    translation,
    scaling,
    radians_to_degrees,
    rotation_x_rad,
    rotation_y_rad,
    rotation_z_rad
};
