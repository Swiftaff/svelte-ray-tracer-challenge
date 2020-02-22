const { point, vector, color, getBool_tupleIsColor, getBool_colorsAreEqual } = require("../src/tuples.js");

const {
    pixelCanvas,
    pixel_write,
    getPixel,
    pixelCanvas_to_ppm,
    getString_fromColor,
    getString_removeTrailingSpace
} = require("../src/canvas.js");

test("Creating a pixelCanvas", function() {
    let c = pixelCanvas(10, 20);
    expect(c.width).toBe(10);
    expect(c.height).toBe(20);
    expect(
        c.data.filter(can => getBool_tupleIsColor(can) && getBool_colorsAreEqual(can, color(0, 0, 0))).length ===
            c.data.length
    ).toBe(true);
});

test("Fail to create a pixelCanvas when width, height are not numbers = false (and console error)", function() {
    let c = pixelCanvas("invalid value", vector(1, 2, 3));
    expect(c).toBe(false);
});

test("Writing a pixel to pixelCanvas", function() {
    let c = pixelCanvas(10, 20);
    let red = color(1, 0, 0);
    c = pixel_write(c, 2, 3, red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(true);
});

test("Fail to write a pixel to pixelCanvas when not canvas = false (and console error)", function() {
    let c = vector(1, 2, 3);
    let red = color(1, 0, 0);
    c = pixel_write(c, 2, 3, red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(false);
});

test("Fail to write a pixel to pixelCanvas when not a color = false (and console error)", function() {
    let c = pixelCanvas(10, 20);
    let red = point(1, 2, 3);
    c = pixel_write(c, 2, 3, red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(false);
});

test("Fail to write a pixel to pixelCanvas when not valid coordinates = false (and console error)", function() {
    let c = pixelCanvas(10, 20);
    let red = color(1, 0, 0);
    c = pixel_write(c, "invalid value", vector(1, 2, 3), red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(false);
});

test("Fail to write a pixel to pixelCanvas when out of bounds coordinates = false (and console error)", function() {
    let c = pixelCanvas(10, 20);
    let red = color(1, 0, 0);
    c = pixel_write(c, -1, 1, red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(false);
});

test("Fail to write a pixel to pixelCanvas when out of bounds coordinates = false (and console error)", function() {
    let c = pixelCanvas(10, 20);
    let red = color(1, 0, 0);
    c = pixel_write(c, 1, 10000000, red);
    expect(getBool_colorsAreEqual(getPixel(c, 2, 3), red)).toBe(false);
});

// note substrings below are hard-coded dependent on P3 headers!

test("Constructing the PPM header", function() {
    let c = pixelCanvas(5, 3);
    let ppm = pixelCanvas_to_ppm(c);
    expect(ppm.substring(0, 10)).toBe("P3\n5 3\n255");
});

test("Constructing the PPM pixel data", function() {
    //note we get 127 for 0.5, not 128

    let c = pixelCanvas(5, 3);
    let c1 = color(1.5, 0, 0);
    let c2 = color(0, 0.5, 0);
    let c3 = color(-0.5, 0, 1);
    c = pixel_write(c, 0, 0, c1);
    c = pixel_write(c, 2, 1, c2);
    c = pixel_write(c, 4, 2, c3);
    let ppm = pixelCanvas_to_ppm(c);
    expect(ppm.substring(11)).toBe(
        "255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 127 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n"
    );
});

test("Splitting long lines in PPM files", function() {
    let c = pixelCanvas(10, 2, color(1, 0.8, 0.6));
    let ppm = pixelCanvas_to_ppm(c);
    expect(ppm.substring(12)).toBe(`255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
153 255 204 153 255 204 153 255 204 153 255 204 153
255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
153 255 204 153 255 204 153 255 204 153 255 204 153\n`);
});

test("getString_removeTrailingSpace - removes space if there is one", function() {
    let str1 = "This is a test ";
    let str2 = "This is a test";
    expect(getString_removeTrailingSpace(str1)).toBe(str2);
});

test("getString_removeTrailingSpace - returns same string if no trailing space", function() {
    let str1 = "This is a test";
    expect(getString_removeTrailingSpace(str1)).toBe(str1);
});

test("getString_fromColor - returns clamped color string of 3 numbers, separated and ending with a space", function() {
    let c1 = color(1.5, 0, 0);
    let c2 = color(0, 0.5, 0);
    let c3 = color(-0.5, 0, 1);
    expect(getString_fromColor(c1, 255)).toBe("255 0 0 ");
    expect(getString_fromColor(c2, 255)).toBe("0 127 0 ");
    expect(getString_fromColor(c3, 255)).toBe("0 0 255 ");
});

test("PPM files are terminated by a newline character", function() {
    let c = pixelCanvas(5, 3);
    let ppm = pixelCanvas_to_ppm(c);
    expect(ppm.substring(ppm.length - 1)).toBe("\n");
});
