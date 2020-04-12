const { trunc, point, tuple_subtract, vector_dotProduct } = require("./tuples.js");

function intersection(t, o) {
    return { t, id: o.id };
}
function list_intersections(arr) {
    //console.log(arr);
    let ret = [...arr].sort(sortByT);
    //console.log(ret);
    return ret;
}

function sortByT(a, b) {
    let comparison = 0;
    if (a.t > b.t) {
        comparison = 1;
    } else if (a.t < b.t) {
        comparison = -1;
    }
    return comparison;
}

function hit(xs) {
    let the_hit = false;
    for (let index = 0; index < xs.length; index++) {
        if (the_hit === false && xs[index].t >= 0) the_hit = xs[index];
    }
    return the_hit;
}

module.exports = {
    intersection,
    list_intersections,
    hit,
};
