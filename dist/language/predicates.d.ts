/**
 * Given the name of a type as it appears in an API builder schema, returns
 * whether it is a representation of an array type.
 * @example
 * isArrayTypeName("[string]");
 * //=> true
 * isArrayTypeName("string");
 * //=> false
 */
export declare function isArrayTypeName(type: string): boolean;
/**
 * Given the name of a type as it appears in an API builder schema, returns
 * whether it is a representation of a map type.
 * @example
 * isMapTypeName("map[string]");
 * //=> true
 * isMapTypeName("string");
 * //=> false
 */
export declare function isMapTypeName(type: string): boolean;
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
export declare function isPrimitiveTypeName(type: string): boolean;
