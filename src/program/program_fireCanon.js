const { point, vector, color, projectile, environment, tick, tuple_multiply } = require("../tuples.js");

const { pixelCanvas, pixel_write, pixelCanvas_to_ppm } = require("../canvas.js");

const fs = require("fs");

const { performance } = require("perf_hooks");

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

    var t1a = performance.now();
    while (proj.position.y > 0) {
        //console.log("Tick: " + tickCount + ". Projectile Position (" + proj.position.x + "," + proj.position.y + ")\r");
        let newC = pixel_write(c, Math.floor(proj.position.x), Math.floor(c.height - proj.position.y), orange);
        c = newC;
        tickCount++;
        orange.red = orange.red - 0.01;
        orange.green = orange.green - 0.01;
        proj = tick(env, proj);
    }
    var t1b = performance.now();
    console.log("Ticks: " + tickCount + ".  Time to calculate data: " + (t1a - t1b) + " milliseconds.");

    var t2a = performance.now();
    let ppm = pixelCanvas_to_ppm(c);
    var t2b = performance.now();
    console.log("Time to generate file: " + (t2a - t2b) + " milliseconds.");

    var t3a = performance.now();
    fs.writeFile("./public/images/fireCanonImage.ppm", ppm, function(err) {
        // If an error occurred, show it and return
        if (err) return console.error(err);
        process.stdout.write("\r");
        console.log("Successfully wrote to the file!");
    });
    var t3b = performance.now();
    console.log("Time to save file: " + (t3a - t3b) + " milliseconds.");
}

fireCanon();
