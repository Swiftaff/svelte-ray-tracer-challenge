const uuidv4 = require("uuid").v4;

const { trunc, point, vector_normalize, tuple_subtract, vector_dotProduct } = require("./tuples.js");
const { intersection, list_intersections } = require("./intersections.js");
const { identity_matrix, inverse, matrix_multiply, matrix_transpose } = require("./matrices.js");
const { transform } = require("../src/rays.js");

function sphere(suppliedOrigin) {
    let origin = suppliedOrigin || point(0, 0, 0);
    let t = identity_matrix;
    return { id: "sphere-" + uuidv4(), origin, transform: t };
}

function set_transform(s, t) {
    return { ...s, transform: t };
}

function discriminant(s, r) {
    let v_sphere_to_ray = tuple_subtract(r.origin, s.origin);
    let a = vector_dotProduct(r.direction, r.direction);
    let b = vector_dotProduct(r.direction, v_sphere_to_ray) * 2;
    let c = vector_dotProduct(v_sphere_to_ray, v_sphere_to_ray) - 1;
    let d = trunc(b * b - 4 * a * c);
    return { a, b, c, d };
}

function intersect(s, r) {
    let r2 = transform(r, inverse(s.transform));
    let xs = [];
    let { a, b, d } = discriminant(s, r2);
    if (d < 0) {
        //misses
    } else {
        //hits
        let t1 = trunc((-b - Math.sqrt(d)) / (2 * a));
        let t2 = trunc((-b + Math.sqrt(d)) / (2 * a));
        let i1 = intersection(t1 < t2 ? t1 : t2, s);
        let i2 = intersection(t1 < t2 ? t2 : t1, s);
        xs = list_intersections([i1, i2]);
    }
    return xs;
}

function normal_at(s, world_point) {
    let object_point = matrix_multiply(inverse(s.transform), world_point);
    let object_normal = tuple_subtract(object_point, s.origin);
    let world_normal = matrix_multiply(matrix_transpose(inverse(s.transform)), object_normal);
    world_normal.w = 0;
    let v = vector_normalize(world_normal);
    return v;
}

module.exports = {
    sphere,
    intersect,
    set_transform,
    normal_at
};
