"use strict";
/* eslint-disable import/no-cycle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseType = exports.isType = exports.isEnclosingType = exports.isUnionType = exports.isPrimitiveType = exports.isModelType = exports.isMapType = exports.isArrayType = exports.isEnumType = void 0;
var definition_1 = require("./definition");
/**
 * Returns whether the specified object is an API Builder enumeration type.
 */
function isEnumType(type) {
    return type instanceof definition_1.ApiBuilderEnum;
}
exports.isEnumType = isEnumType;
/**
 * Returns whether the specified object is an API Builder array type.
 */
function isArrayType(type) {
    return type instanceof definition_1.ApiBuilderArray;
}
exports.isArrayType = isArrayType;
/**
 * Returns whether the specified object is an API Builder map type.
 */
function isMapType(type) {
    return type instanceof definition_1.ApiBuilderMap;
}
exports.isMapType = isMapType;
/**
 * Returns whether the specified object is an API Builder model type.
 */
function isModelType(type) {
    return type instanceof definition_1.ApiBuilderModel;
}
exports.isModelType = isModelType;
/**
 * Returns whether the specified object is an API Builder primitive type.
 */
function isPrimitiveType(type) {
    return type instanceof definition_1.ApiBuilderPrimitiveType;
}
exports.isPrimitiveType = isPrimitiveType;
/**
 * Returns whether the specified object is an API Builder union type.
 */
function isUnionType(type) {
    return type instanceof definition_1.ApiBuilderUnion;
}
exports.isUnionType = isUnionType;
/**
 * Returns whether the specified object is one of the possible
 * API Builder enclosing types.
 */
function isEnclosingType(type) {
    return isArrayType(type) || isMapType(type);
}
exports.isEnclosingType = isEnclosingType;
/**
 * Returns whether the specified object is one of the possible
 * API Builder types.
 */
function isType(type) {
    return isArrayType(type)
        || isMapType(type)
        || isPrimitiveType(type)
        || isModelType(type)
        || isEnumType(type)
        || isUnionType(type);
}
exports.isType = isType;
/**
 * If a given type is an enclosing type, this recursively strips the enclosing
 * wrappers and returns the underlying type.
 */
function getBaseType(type) {
    if (isEnclosingType(type)) {
        return getBaseType(type.ofType);
    }
    return type;
}
exports.getBaseType = getBaseType;
