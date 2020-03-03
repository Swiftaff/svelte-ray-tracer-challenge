const { tuple_add, tuple_multiply } = require("./tuples.js");

function ray(origin, direction) {
    return { origin, direction };
}

function position(ray, t) {
    return tuple_add(ray.origin, tuple_multiply(ray.direction, t));
}

module.exports = {
    ray,
    position
};
