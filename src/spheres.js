const uuidv4 = require("uuid").v4;

const { trunc, point, tuple_subtract, vector_dotProduct } = require("./tuples.js");
const { intersection, intersections } = require("./intersections.js");

function sphere(suppliedOrigin) {
    let origin = suppliedOrigin || point(0, 0, 0);
    return { id: "sphere-" + uuidv4(), origin };
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
    let xs = [];
    let { a, b, d } = discriminant(s, r);
    if (d < 0) {
        //misses
    } else {
        //hits
        let t1 = trunc((-b - Math.sqrt(d)) / (2 * a));
        let t2 = trunc((-b + Math.sqrt(d)) / (2 * a));
        let i1 = { id: s.id, t: t1 < t2 ? t1 : t2 };
        let i2 = { id: s.id, t: t1 < t2 ? t2 : t1 };
        xs = intersections(i1, i2);
    }
    return xs;
}

module.exports = {
    sphere,
    intersect
};
