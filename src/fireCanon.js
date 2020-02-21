const {
    tuple,
    point,
    vector,
    projectile,
    environment,
    tick,
    getBool_tupleIsPoint,
    getBool_tupleIsVector,
    getBool_tuplesAreEqual,
    getBool_isProjectile,
    getBool_isEnvironment,
    getBool_numbersAreEqual,
    tuple_add,
    tuple_subtract,
    vector_negate,
    tuple_multiply,
    tuple_divide,
    vector_magnitude,
    vector_normalize,
    vector_dotProduct,
    vector_crossProduct
} = require("./tuples.js");

function fireCanon() {
    console.log("fireCanon");
    // velocity is normalized to 1 unit/tick.
    let proj = projectile(point(0, 1, 0), tuple_multiply(vector(1, 1, 0), 30));

    //gravity -0.1 unit/tick, and wind is -0.01 unit/tick.
    let env = environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));

    let tickCount = 1;
    console.log("Projectile Velocity", proj.velocity);
    console.log("Environment Gravity", env.gravity);
    console.log("Environment Wind", env.wind);
    console.log(" ");

    while (proj.position.y > 0) {
        console.log("Tick: " + tickCount + ". Projectile Position", proj.position);
        tickCount++;
        proj = tick(env, proj);
    }
}

fireCanon();
