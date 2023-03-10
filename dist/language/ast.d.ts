import { ApiBuilderService, ApiBuilderType } from '../type';
export interface Node {
    name: string;
}
export interface EnclosingTypeNode {
    name: string;
    type: Node | EnclosingTypeNode;
}
export type AstNode = Node | EnclosingTypeNode;
/**
 * Produces an AST given the name of a type as it appears in an API builder schema.
 * Useful to construct concrete types from strings.
 * @example
 * astFromTypeName("string")
 * // => { name: "string" }
 * astFromTypeName("map[[string]]");
 * //=> { name: "map", type: { name: "array", type: { name: "string" } } }
 */
export declare function astFromTypeName(typeName: string): AstNode;
/**
 * Returns the type name for the specified API builder AST.
 * @example
 * typeNameFromAst({ name: "map", type: { name: "string" } });
 * //=> "map[string]"
 */
export declare function typeNameFromAst(ast: AstNode): string;
/**
 * Returns the API builder type from the specified API builder AST.
 * Types are resolved from the provided service unless it is primitive type.
 * When resolving types, internal types will take precedence over external
 * types. That being said, using a type short name to construct the AST is
 * unreliable. For best results, use a fully qualified name to construct the
 * AST instead.
 */
export declare function typeFromAst(ast: AstNode, service: ApiBuilderService): ApiBuilderType;
