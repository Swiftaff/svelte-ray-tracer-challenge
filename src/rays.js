const { tuple_add, tuple_multiply } = require("./tuples.js");
const { transform_tuple_with_chain } = require("../src/transformations.js");

function ray(origin, direction) {
    return { origin, direction };
}

function position(ray, t) {
    return tuple_add(ray.origin, tuple_multiply(ray.direction, t));
}

function transform(r, m) {
    let o = r.origin;
    let d = r.direction;
    let origin = transform_tuple_with_chain([m], o);
    let direction = transform_tuple_with_chain([m], d);
    return ray(origin, direction);
}

module.exports = {
    ray,
    position,
    transform
};
