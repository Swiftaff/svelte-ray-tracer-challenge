const {
    color,
    colors_multiply,
    color_scalarMultiply,
    colors_add,
    tuple_subtract,
    vector_normalize,
    vector_dotProduct,
    tuple_multiply,
    reflect
} = require("../src/tuples.js");

function point_light(position, intensity) {
    return { position, intensity };
}

function lighting(material, light, point, eyev, normalv) {
    let black = color(0, 0, 0);
    let diffuse = black;
    let specular = black;
    let reflectv;
    let reflect_dot_eye;

    let effective_color = colors_multiply(material.color, light.intensity);
    let lightv = vector_normalize(tuple_subtract(light.position, point));
    let ambient = color_scalarMultiply(effective_color, material.ambient);
    let light_dot_normal = vector_dotProduct(lightv, normalv);

    if (light_dot_normal >= 0) {
        diffuse = color_scalarMultiply(color_scalarMultiply(effective_color, material.diffuse), light_dot_normal);
        reflectv = reflect(tuple_multiply(lightv, -1), normalv);
        reflect_dot_eye = vector_dotProduct(reflectv, eyev);
        if (reflect_dot_eye > 0) {
            let factor = Math.pow(reflect_dot_eye, material.shininess);

            specular = color_scalarMultiply(light.intensity, material.specular * factor);
        }
    }
    return colors_add(colors_add(ambient, diffuse), specular);
}

module.exports = {
    point_light,
    lighting
};
