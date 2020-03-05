const { point, color, vector_normalize, tuple_subtract, tuple_multiply } = require("../tuples.js");
const { pixelCanvas, pixel_write, pixelCanvas_to_ppm } = require("../canvas.js");
const { scaling, rotation_z_rad, shearing } = require("../transformations.js");
const { matrix_multiply } = require("../matrices.js");
const { hit } = require("../intersections.js");
const { ray, position } = require("../rays.js");
const { point_light, lighting } = require("../lights.js");
const { material } = require("../materials.js");
const { sphere, intersect, set_transform, set_material, normal_at } = require("../spheres.js");
const fs = require("fs");

function sphere_lighting() {
    console.log("sphere_lighting");
    let canvas_pixels = 50;
    let c = pixelCanvas(canvas_pixels, canvas_pixels);
    let red = color(1, 0, 0);
    let ray_origin = point(0, 0, -5);
    let wall_z = 10;
    let wall_size = 7;
    let pixel_size = wall_size / canvas_pixels;
    let half = wall_size / 2;
    let shape = sphere();
    let mat = material();
    mat.color = color(1, 0.2, 1);
    shape = set_material(shape, mat);

    let light_position = point(-10, 10, -10);
    let light_color = color(1, 1, 1);
    let light = point_light(light_position, light_color);

    //let m1 = scaling(0.5, 1, 1);
    //let m2 = rotation_z_rad(Math.PI / 4);
    //let m3 = shearing(1, 0, 0, 0, 0, 0);
    //let m = matrix_multiply(m1, m2);
    //console.log("m1", m1, "m2", m2, "m", m);
    //shape = set_transform(shape, m);
    //console.log("st", shape.transform);

    for (let y = 0; y < canvas_pixels; y++) {
        let world_y = half - pixel_size * y;
        for (let x = 0; x < canvas_pixels; x++) {
            process.stdout.write("(y:" + y + " x:" + x + ")\r");
            let world_x = -half + pixel_size * x;
            let pos = point(world_x, world_y, wall_z);
            let r = ray(ray_origin, vector_normalize(tuple_subtract(pos, ray_origin)));
            let xs = intersect(shape, r);
            let h = hit(xs);
            if (h) {
                let pnt = position(r, h.t);
                let nrm = normal_at(shape, pnt); //cheating for now - need a global list of objects and change h.id to get object based on id
                let eye = tuple_multiply(r.direction, -1);
                let col = lighting(shape.material, light, pnt, eye, nrm);
                let newC = pixel_write(c, x, y, col);
                c = newC;
            }
        }
    }

    let ppm = pixelCanvas_to_ppm(c);

    fs.writeFile("./public/images/sphere_lighting2.ppm", ppm, function(err) {
        // If an error occurred, show it and return
        if (err) return console.error(err);
        console.log("Successfully wrote to the file!");
    });
}

sphere_lighting();
