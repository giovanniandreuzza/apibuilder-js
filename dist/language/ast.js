"use strict";
/* eslint-disable import/no-cycle */
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeFromAst = exports.typeNameFromAst = exports.astFromTypeName = void 0;
var type_1 = require("../type");
var _1 = require(".");
/**
 * Produces an AST given the name of a type as it appears in an API builder schema.
 * Useful to construct concrete types from strings.
 * @example
 * astFromTypeName("string")
 * // => { name: "string" }
 * astFromTypeName("map[[string]]");
 * //=> { name: "map", type: { name: "array", type: { name: "string" } } }
 */
function astFromTypeName(typeName) {
    switch (true) {
        case (0, _1.isMapTypeName)(typeName):
            return {
                name: _1.Kind.MAP,
                type: astFromTypeName((0, _1.getNestedTypeName)(typeName)),
            };
        case (0, _1.isArrayTypeName)(typeName):
            return {
                name: _1.Kind.ARRAY,
                type: astFromTypeName((0, _1.getNestedTypeName)(typeName)),
            };
        default:
            return {
                name: typeName,
            };
    }
}
exports.astFromTypeName = astFromTypeName;
/**
 * Returns the type name for the specified API builder AST.
 * @example
 * typeNameFromAst({ name: "map", type: { name: "string" } });
 * //=> "map[string]"
 */
function typeNameFromAst(ast) {
    if (ast.name === _1.Kind.MAP) {
        return "map[".concat(typeNameFromAst(ast.type), "]");
    }
    if (ast.name === _1.Kind.ARRAY) {
        return "[".concat(typeNameFromAst(ast.type), "]");
    }
    return ast.name;
}
exports.typeNameFromAst = typeNameFromAst;
/**
 * Returns the API builder type from the specified API builder AST.
 * Types are resolved from the provided service unless it is primitive type.
 * When resolving types, internal types will take precedence over external
 * types. That being said, using a type short name to construct the AST is
 * unreliable. For best results, use a fully qualified name to construct the
 * AST instead.
 */
function typeFromAst(ast, service) {
    if (ast.name === _1.Kind.MAP) {
        return new type_1.ApiBuilderMap(typeFromAst(ast.type, service));
    }
    if (ast.name === _1.Kind.ARRAY) {
        return new type_1.ApiBuilderArray(typeFromAst(ast.type, service));
    }
    if ((0, _1.isPrimitiveTypeName)(ast.name)) {
        return new type_1.ApiBuilderPrimitiveType(new _1.FullyQualifiedName(ast.name));
    }
    var type = service.findTypeByName(ast.name);
    if (type == null) {
        throw new Error("".concat(ast.name, " is not a type defined in ").concat(String(service), " service."));
    }
    return type;
}
exports.typeFromAst = typeFromAst;
