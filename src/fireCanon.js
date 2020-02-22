const { point, vector, color, projectile, environment, tick, tuple_multiply } = require("./tuples.js");

const { pixelCanvas, pixel_write, pixelCanvas_to_ppm } = require("../src/canvas.js");

const fs = require("fs");

function fireCanon() {
    console.log("fireCanon");
    let c = pixelCanvas(500, 500);
    let orange = color(1, 1, 0);
    // velocity is normalized to 1 unit/tick.
    let proj = projectile(point(0, 1, 0), vector(5, 10, 0));

    //gravity -0.1 unit/tick, and wind is -0.01 unit/tick.
    let env = environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));

    let tickCount = 1;
    console.log("Projectile Velocity", proj.velocity);
    console.log("Environment Gravity", env.gravity);
    console.log("Environment Wind", env.wind);
    console.log(" ");

    while (proj.position.y > 0 && c) {
        //console.log("Tick: " + tickCount + ". Projectile Position", proj.position);
        let newC = pixel_write(c, Math.floor(proj.position.x), Math.floor(c.height - proj.position.y), orange);
        c = newC;
        //tickCount++;
        orange.red = orange.red - 0.01;
        orange.green = orange.green - 0.01;
        proj = tick(env, proj);
    }
    let ppm = pixelCanvas_to_ppm(c);

    fs.writeFile("./src/fireCanonImage.ppm", ppm, function(err) {
        // If an error occurred, show it and return
        if (err) return console.error(err);
        console.log("Successfully wrote to the file!");
    });
}

fireCanon();
