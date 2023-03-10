import { AstNode } from './ast';
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
export declare function getBaseTypeName(type: string | AstNode): string;
/**
 * Given the name of an enclosing type as it appears in an API builder schema,
 * returns the API builder type name of the underlying type.
 * @example
 * getNestedTypeName("map[string]");
 * //=> "string"
 * getNestedTypeName("map[[string]]");
 * //=> "[string]"
 */
export declare function getNestedTypeName(type: string): string;
export declare function isFullyQualifiedName(identifier: string): boolean;
export declare function assertFullyQualifiedName(fullyQualifiedName: string): void;
export declare class FullyQualifiedName {
    /**
     * The fully qualified name of the type, including its package name.
     */
    fullyQualifiedName: string;
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
    constructor(fullyQualifiedName: string);
    /**
     * This property holds the fully qualified name of the type,
     * including its namespace.
     */
    get fullName(): string;
    /**
     * This property holds the base name of the type.
     */
    get baseTypeName(): string;
    /**
     * This property holds the nested type. A nested type is a type defined
     * within the scope of another type, which is called the enclosing type.
     * Only array or map types can enclose another type, which may be any of the
     * supported API builder types, including another array or map.
     */
    get nestedTypeName(): string;
    /**
     * This property holds the base short name, that is the type name
     * without its package name.
     */
    get shortName(): string;
    /**
     * This property holds the package name.
     */
    get packageName(): string;
    /**
     * This property holds whether this is an array.
     */
    get isArrayType(): boolean;
    /**
     * This property holds whether this is a map.
     */
    get isMapType(): boolean;
    /**
     * This property holds whether this type is an enclosing type. An enclosing
     * type is a type that encloses another type, which is called the nested type.
     * Only array or map types can enclose another type, which may be one of the
     * supported API builder types, including another array or map.
     */
    get isEnclosingType(): boolean;
    /**
     * This property holds whether this is a primitive type.
     */
    get isPrimitiveType(): boolean;
    toString(): string;
}
