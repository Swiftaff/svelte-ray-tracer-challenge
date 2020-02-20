var assert = require("assert");

var { getTupleObj_fromTupleArr, getBool_tupleObjIsPoint, getBool_tupleObjIsVector } = require("../src/tuples.js");

describe("Tuples", function() {
    it("A tuple with w=1.0 is a point", function() {
        let a = getTupleObj_fromTupleArr([4.3, -4.2, 3.1, 1.0]);
        //assert.equal(a.x, 4.3);
        //assert.equal(a.y, -4.2);
        //assert.equal(a.z, 3.1);
        //assert.equal(a.w, 1.0);
        assert.equal(getBool_tupleObjIsPoint(a), false);
        //assert.equal(getBool_tupleObjIsVector(a), false);
    });
});
