import { ApiBuilderArray, ApiBuilderEnclosingType, ApiBuilderEnum, ApiBuilderMap, ApiBuilderModel, ApiBuilderPrimitiveType, ApiBuilderType, ApiBuilderUnion } from './definition';
/**
 * Returns whether the specified object is an API Builder enumeration type.
 */
export declare function isEnumType(type: unknown): type is ApiBuilderEnum;
/**
 * Returns whether the specified object is an API Builder array type.
 */
export declare function isArrayType(type: unknown): type is ApiBuilderArray;
/**
 * Returns whether the specified object is an API Builder map type.
 */
export declare function isMapType(type: unknown): type is ApiBuilderMap;
/**
 * Returns whether the specified object is an API Builder model type.
 */
export declare function isModelType(type: unknown): type is ApiBuilderModel;
/**
 * Returns whether the specified object is an API Builder primitive type.
 */
export declare function isPrimitiveType(type: unknown): type is ApiBuilderPrimitiveType;
/**
 * Returns whether the specified object is an API Builder union type.
 */
export declare function isUnionType(type: unknown): type is ApiBuilderUnion;
/**
 * Returns whether the specified object is one of the possible
 * API Builder enclosing types.
 */
export declare function isEnclosingType(type: unknown): type is ApiBuilderEnclosingType;
/**
 * Returns whether the specified object is one of the possible
 * API Builder types.
 */
export declare function isType(type: unknown): type is ApiBuilderType;
/**
 * If a given type is an enclosing type, this recursively strips the enclosing
 * wrappers and returns the underlying type.
 */
export declare function getBaseType(type: ApiBuilderType): Exclude<ApiBuilderType, ApiBuilderEnclosingType>;
