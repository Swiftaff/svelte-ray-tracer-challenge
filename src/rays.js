const uuidv4 = require("uuid").v4;

const { trunc, point, tuple_add, tuple_subtract, tuple_multiply, vector_dotProduct } = require("./tuples.js");

function ray(origin, direction) {
    return { origin, direction };
}

function position(ray, t) {
    return tuple_add(ray.origin, tuple_multiply(ray.direction, t));
}

function sphere(suppliedOrigin) {
    let origin = suppliedOrigin || point(0, 0, 0);
    return { id: uuidv4(), origin };
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
    let t = [];
    let { a, b, d } = discriminant(s, r);
    if (d < 0) {
        //misses
    } else {
        //hits
        let t1 = trunc((-b - Math.sqrt(d)) / (2 * a));
        let t2 = trunc((-b + Math.sqrt(d)) / (2 * a));
        t.length = 2;
        t[0] = t1 < t2 ? t1 : t2;
        t[1] = t1 < t2 ? t2 : t1;
    }
    return t;
}

module.exports = {
    ray,
    position,
    sphere,
    intersect
};
