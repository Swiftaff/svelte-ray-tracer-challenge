const { identity_matrix, matrix_clone, matrix_multiply } = require("./matrices.js");
const { trunc } = require("./tuples.js");

function radians_to_degrees(r) {
    return (r * 180) / Math.PI;
}

function degrees_to_radians(d) {
    return (d / 180) * Math.PI;
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
    t[1][1] = trunc(Math.cos(r));
    t[1][2] = trunc(-1 * Math.sin(r));
    t[2][1] = trunc(Math.sin(r));
    t[2][2] = trunc(Math.cos(r));
    return t;
}

function rotation_y_rad(r) {
    let t = matrix_clone(identity_matrix);
    t[0][0] = trunc(Math.cos(r));
    t[0][2] = trunc(Math.sin(r));
    t[2][0] = trunc(-1 * Math.sin(r));
    t[2][2] = trunc(Math.cos(r));
    return t;
}

function rotation_z_rad(r) {
    let t = matrix_clone(identity_matrix);
    t[0][0] = trunc(Math.cos(r));
    t[0][1] = trunc(-1 * Math.sin(r));
    t[1][0] = trunc(Math.sin(r));
    t[1][1] = trunc(Math.cos(r));
    return t;
}

function shearing(xy, xz, yx, yz, zx, zy) {
    let t = matrix_clone(identity_matrix);
    t[0][1] = xy;
    t[0][2] = xz;
    t[1][0] = yx;
    t[1][2] = yz;
    t[2][0] = zx;
    t[2][1] = zy;
    return t;
}

function transform_chain(arr, tuple) {
    //applied in order provided in array
    let newTuple = { ...tuple };
    arr.map(t => (newTuple = { ...matrix_multiply(t, newTuple) }));
    return newTuple;
}

module.exports = {
    translation,
    scaling,
    radians_to_degrees,
    degrees_to_radians,
    rotation_x_rad,
    rotation_y_rad,
    rotation_z_rad,
    shearing,
    transform_chain
};
