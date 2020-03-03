const { color, getBool_tupleIsColor } = require("../src/tuples.js");

function pixelCanvas(width, height, optionalStartColor) {
    if (typeof width === "number" && typeof height === "number") {
        let pixel = optionalStartColor || color(0, 0, 0);
        let data = [];
        data.length = width * height;
        data.fill(pixel);
        return { data, width, height };
    } else {
        console.warn("can't create pixelCanvas");
        return false;
    }
}

function getBool_isPixelCanvas(c) {
    return (
        c.hasOwnProperty("width") &&
        c.hasOwnProperty("height") &&
        c.hasOwnProperty("data") &&
        typeof c.width === "number" &&
        typeof c.height === "number" &&
        typeof Array.isArray(c.data)
    );
}

function clean(a) {
    return JSON.parse(JSON.stringify(a));
}

function pixel_write(c, x, y, col) {
    if (typeof x === "number" && typeof y === "number" && x >= 0 && y >= 0 && x < c.width && y < c.height) {
        let index = Math.floor(c.width) * Math.floor(y) + Math.floor(x);
        if (getBool_isPixelCanvas(c) && getBool_tupleIsColor(col)) {
            let newC = clean(c);
            newC.data[index] = col;
            return newC;
        }
    }
    console.warn("pixel_write: error");
    return c;
}

function pixel_clamp(col) {
    if (col.red < 0) col.red = 0;
    if (col.green < 0) col.green = 0;
    if (col.blue < 0) col.blue = 0;
    if (col.red > 1) col.red = 1;
    if (col.green > 1) col.green = 1;
    if (col.blue > 1) col.blue = 1;
    return col;
}

function getPixel(c, x, y) {
    let index = -1;
    if (typeof x === "number" && typeof y === "number") {
        index = c.width * y + x;
    }
    if (getBool_isPixelCanvas(c) && index >= 0 && index < c.data.length) {
        return c.data[index];
    }
    console.warn("pixel_at: error", c, x, y);
    return false;
}

function pixelCanvas_to_ppm(c) {
    let limit = 255;
    let ppm = "P3\n" + c.width + " " + c.height + "\n" + limit + "\n" + getPixelData(c, 255);
    return ppm;
}

function getPixelData(c, clampLimit) {
    let colorStringArray = [];
    let rowArray = [];
    c.data.map(col => colorStringArray.push(getString_fromColor(col, clampLimit)));
    for (let rowStartIndex = 0; rowStartIndex < c.width * c.height; rowStartIndex += c.width) {
        let thisRow = "";
        for (let colIndex = 0; colIndex < c.width; colIndex++) {
            thisRow += colorStringArray[rowStartIndex + colIndex];
        }
        if (thisRow.length > 70) {
            let lastSpaceIndex = thisRow.substring(0, 70);
            if (thisRow.charAt(70) !== " ") {
                lastSpaceIndex = thisRow.substring(0, 70).lastIndexOf(" ");
            }
            let nextRowOverflow = thisRow.substring(lastSpaceIndex + 1);
            thisRow = thisRow.substring(0, lastSpaceIndex);
            rowArray.push(getString_removeTrailingSpace(thisRow));

            rowArray.push(getString_removeTrailingSpace(nextRowOverflow));
        } else {
            rowArray.push(getString_removeTrailingSpace(thisRow));
        }
    }
    return rowArray.join("\n") + "\n";
}

function getString_fromColor(col, clampLimit) {
    let colorClampedToZeroToOne = pixel_clamp(col);
    return (
        Math.floor(colorClampedToZeroToOne.red * clampLimit) +
        " " +
        Math.floor(colorClampedToZeroToOne.green * clampLimit) +
        " " +
        Math.floor(colorClampedToZeroToOne.blue * clampLimit) +
        " "
    );
}

function getString_removeTrailingSpace(str) {
    if (str.length && str[str.length - 1] === " ") {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

module.exports = {
    pixelCanvas,
    getBool_isPixelCanvas,
    clean,
    pixel_write,
    pixel_clamp,
    getPixel,
    pixelCanvas_to_ppm,
    getPixelData,
    getString_fromColor,
    getString_removeTrailingSpace
};
