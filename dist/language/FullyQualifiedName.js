"use strict";
/* eslint-disable import/no-cycle */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullyQualifiedName = exports.assertFullyQualifiedName = exports.isFullyQualifiedName = exports.getNestedTypeName = exports.getBaseTypeName = void 0;
var invariant_1 = __importDefault(require("invariant"));
var ast_1 = require("./ast");
var constants_1 = require("./constants");
var predicates_1 = require("./predicates");
/**
 * API Builder types can be complex (e.g. array of strings, map of strings,
 * maps of array of strings etc.). By design, all entries in an array or map
 * must be of the same type: this is called the base type.
 * @example
 * getBaseTypeName("map[string]")
 * //=> "string"
 * getBaseTypeName("map[[string]]")
 * //=> "string"
 */
function getBaseTypeName(type) {
    if (typeof type === 'string') {
        return getBaseTypeName((0, ast_1.astFromTypeName)(type));
    }
    if (type.type) {
        return getBaseTypeName(type.type);
    }
    return type.name;
}
exports.getBaseTypeName = getBaseTypeName;
/**
 * Given the name of an enclosing type as it appears in an API builder schema,
 * returns the API builder type name of the underlying type.
 * @example
 * getNestedTypeName("map[string]");
 * //=> "string"
 * getNestedTypeName("map[[string]]");
 * //=> "[string]"
 */
function getNestedTypeName(type) {
    var mapMatch = constants_1.Regex.OBJECTOF.exec(type);
    if (mapMatch) {
        var $1 = mapMatch[1];
        return $1;
    }
    var arrayMatch = constants_1.Regex.ARRAYOF.exec(type);
    if (arrayMatch) {
        var $1 = arrayMatch[1];
        return $1;
    }
    return type;
}
exports.getNestedTypeName = getNestedTypeName;
function isFullyQualifiedName(identifier) {
    return (0, predicates_1.isPrimitiveTypeName)(identifier) || getBaseTypeName(identifier).lastIndexOf('.') >= 0;
}
exports.isFullyQualifiedName = isFullyQualifiedName;
function assertFullyQualifiedName(fullyQualifiedName) {
    (0, invariant_1.default)(isFullyQualifiedName(fullyQualifiedName), "\"".concat(fullyQualifiedName, "\" is not a valid fully qualified name. ")
        + 'A fully qualified name may be the name of a primitive type, '
        + 'or a string consisting of a package name followed by the base '
        + 'short name. (e.g. "com.bryzek.apidoc.common.v0.models.reference").');
}
exports.assertFullyQualifiedName = assertFullyQualifiedName;
var FullyQualifiedName = /** @class */ (function () {
    /**
     * Create a fully qualified type.
     * @example
     * new FullyQualifiedName("string");
     * new FullyQualifiedName("[string]");
     * new FullyQualifiedName("map[string]");
     * new FullyQualifiedName("com.bryzek.apidoc.common.v0.models.reference");
     * new FullyQualifiedName("[com.bryzek.apidoc.common.v0.models.reference]");
     * new FullyQualifiedName("map[com.bryzek.apidoc.common.v0.models.reference]");
     */
    function FullyQualifiedName(fullyQualifiedName) {
        assertFullyQualifiedName(fullyQualifiedName);
        this.fullyQualifiedName = fullyQualifiedName;
    }
    Object.defineProperty(FullyQualifiedName.prototype, "fullName", {
        /**
         * This property holds the fully qualified name of the type,
         * including its namespace.
         */
        get: function () {
            return this.fullyQualifiedName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "baseTypeName", {
        /**
         * This property holds the base name of the type.
         */
        get: function () {
            return getBaseTypeName(this.fullyQualifiedName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "nestedTypeName", {
        /**
         * This property holds the nested type. A nested type is a type defined
         * within the scope of another type, which is called the enclosing type.
         * Only array or map types can enclose another type, which may be any of the
         * supported API builder types, including another array or map.
         */
        get: function () {
            return getNestedTypeName(this.fullyQualifiedName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "shortName", {
        /**
         * This property holds the base short name, that is the type name
         * without its package name.
         */
        get: function () {
            var lastIndex = this.baseTypeName.lastIndexOf('.');
            if (lastIndex === -1) {
                return this.baseTypeName;
            }
            return this.baseTypeName.substring(lastIndex + 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "packageName", {
        /**
         * This property holds the package name.
         */
        get: function () {
            var lastIndex = this.baseTypeName.lastIndexOf('.');
            if (this.isPrimitiveType || lastIndex === -1) {
                return '';
            }
            return this.baseTypeName.substring(0, lastIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "isArrayType", {
        /**
         * This property holds whether this is an array.
         */
        get: function () {
            return (0, predicates_1.isArrayTypeName)(this.fullyQualifiedName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "isMapType", {
        /**
         * This property holds whether this is a map.
         */
        get: function () {
            return (0, predicates_1.isMapTypeName)(this.fullyQualifiedName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "isEnclosingType", {
        /**
         * This property holds whether this type is an enclosing type. An enclosing
         * type is a type that encloses another type, which is called the nested type.
         * Only array or map types can enclose another type, which may be one of the
         * supported API builder types, including another array or map.
         */
        get: function () {
            return this.isArrayType || this.isMapType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullyQualifiedName.prototype, "isPrimitiveType", {
        /**
         * This property holds whether this is a primitive type.
         */
        get: function () {
            return (0, predicates_1.isPrimitiveTypeName)(this.fullName);
        },
        enumerable: false,
        configurable: true
    });
    FullyQualifiedName.prototype.toString = function () {
        return this.fullyQualifiedName;
    };
    return FullyQualifiedName;
}());
exports.FullyQualifiedName = FullyQualifiedName;
