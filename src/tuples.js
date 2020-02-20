function getTupleObj_fromTupleArr(tupleArr) {
    let a = {};
    a.x = tupleArr[0];
    a.y = tupleArr[1];
    a.z = tupleArr[2];
    a.w = tupleArr[3];
    return a;
}

function getBool_tupleObjIsPoint(tupleObj) {
    return tupleObj.w === 1;
}

function getBool_tupleObjIsVector(tupleObj) {
    return tupleObj.w === 0;
}

module.exports = { getTupleObj_fromTupleArr, getBool_tupleObjIsPoint, getBool_tupleObjIsVector };
