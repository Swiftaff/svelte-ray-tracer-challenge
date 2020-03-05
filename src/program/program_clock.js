const { point, color } = require("../tuples.js");
const { pixelCanvas, pixel_write, pixelCanvas_to_ppm } = require("../canvas.js");
const { transform_chain, translation, rotation_z_rad, scaling, degrees_to_radians } = require("../transformations.js");
const fs = require("fs");

function clock() {
    console.log("clock");
    let c = pixelCanvas(500, 500);
    let orange = color(1, 1, 0);

    let origin = point(0, 1, 0);
    let size = scaling(200, -200, 0);
    let recentre = translation(250, 250, 0);
    let one_hour_angle = degrees_to_radians(-30);

    for (let hour = 0; hour < 12; hour++) {
        process.stdout.write("hour " + hour + "\r");
        let newPoint = transform_chain([rotation_z_rad(one_hour_angle * hour), size, recentre], origin);
        let newC = pixel_write(c, newPoint.x, newPoint.y, orange);
        c = newC;
    }

    let ppm = pixelCanvas_to_ppm(c);

    fs.writeFile("./public/images/clock.ppm", ppm, function(err) {
        // If an error occurred, show it and return
        if (err) return console.error(err);
        process.stdout.write("\r");
        console.log("Successfully wrote to the file!");
    });
}

clock();
