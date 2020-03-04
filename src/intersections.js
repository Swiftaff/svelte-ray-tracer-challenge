const { trunc, point, tuple_subtract, vector_dotProduct } = require("./tuples.js");

function intersection(t, o) {
    return { t, id: o.id };
}
function intersections(i1, i2) {
    return [i1, i2];
}

module.exports = {
    intersection,
    intersections
};
