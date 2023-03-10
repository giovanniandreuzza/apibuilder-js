"use strict";
/* eslint-disable import/no-cycle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitiveTypeName = exports.isMapTypeName = exports.isArrayTypeName = void 0;
var lodash_1 = require("lodash");
var constants_1 = require("./constants");
var FullyQualifiedName_1 = require("./FullyQualifiedName");
/**
 * Given the name of a type as it appears in an API builder schema, returns
 * whether it is a representation of an array type.
 * @example
 * isArrayTypeName("[string]");
 * //=> true
 * isArrayTypeName("string");
 * //=> false
 */
function isArrayTypeName(type) {
    return constants_1.Regex.ARRAYOF.test(type);
}
exports.isArrayTypeName = isArrayTypeName;
/**
 * Given the name of a type as it appears in an API builder schema, returns
 * whether it is a representation of a map type.
 * @example
 * isMapTypeName("map[string]");
 * //=> true
 * isMapTypeName("string");
 * //=> false
 */
function isMapTypeName(type) {
    return constants_1.Regex.OBJECTOF.test(type);
}
exports.isMapTypeName = isMapTypeName;
/**
 * Given the name of a type as it appears in an API builder schema, returns
 * whether its base type represents a primitive type.
 * @example
 * isPrimitiveTypeName("string");
 * //=> true
 * isPrimitiveTypeName("map[date_time_iso8601]");
 * // => true
 * isPrimitiveTypeName("[com.bryzek.spec.v0.models.reference]");
 * // => false
 */
function isPrimitiveTypeName(type) {
    return (0, lodash_1.includes)([
        constants_1.Kind.BOOLEAN,
        constants_1.Kind.DATE_ISO8601,
        constants_1.Kind.DATE_TIME_ISO8601,
        constants_1.Kind.DECIMAL,
        constants_1.Kind.DOUBLE,
        constants_1.Kind.INTEGER,
        constants_1.Kind.JSON,
        constants_1.Kind.LONG,
        constants_1.Kind.OBJECT,
        constants_1.Kind.STRING,
        constants_1.Kind.UNIT,
        constants_1.Kind.UUID,
    ], (0, FullyQualifiedName_1.getBaseTypeName)(type));
}
exports.isPrimitiveTypeName = isPrimitiveTypeName;
