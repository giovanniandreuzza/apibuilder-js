import { FullyQualifiedName } from '../language';
/**
 * Workaround for union without discriminant properties
 * https://github.com/Microsoft/TypeScript/issues/20863#issuecomment-479471546
 */
type Compute<A> = {
    [K in keyof A]: A[K];
} extends infer X ? X : never;
type UnionKeys<T> = T extends unknown ? keyof T : never;
type StrictUnionHelper<T, A> = T extends unknown ? T & Partial<Record<Exclude<UnionKeys<A>, keyof T>, never>> : never;
type StrictUnion<T> = Compute<StrictUnionHelper<T, T>>;
type JSONValue = string | number | boolean | null | readonly JSONValue[] | {
    readonly [key: string]: JSONValue;
};
export interface ApiBuilderAnnotationConfig {
    readonly name: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
}
export interface ApiBuilderApiDocConfig {
    readonly version: string;
}
export interface ApiBuilderApplicationConfig {
    readonly key: string;
}
/**
 * An array is an enclosing type which points to another type.
 * Arrays are often created within the context of defining the fields of
 * a model type.
 */
export declare class ApiBuilderArray {
    ofType: ApiBuilderType;
    constructor(ofType: ApiBuilderType);
    toString(): string;
}
/**
 * Represents an additional attribute that is attached to an object.
 * The main use case is to capture additional metadata that doesn’t necessarily
 * define the API but aids in code generation. Examples would be hints for
 * certain code generators about classes to extend, interfaces to implement,
 * annotations to add, names to assign to certain methods, etc. The specific
 * attributes will be applicable only in the context of the specific code
 * generators usings them.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/0.11.94#model-attribute
 */
export interface ApiBuilderAttributeConfig {
    readonly name: string;
    readonly value: JSONValue;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-body
 */
export interface ApiBuilderBodyConfig {
    readonly type: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderBody {
    private config;
    private service;
    constructor(config: ApiBuilderBodyConfig, service: ApiBuilderService);
    get type(): ApiBuilderType;
    get description(): string | undefined;
    get isDeprecated(): boolean;
}
/**
 * Describes the primary contact for this service
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-contact
 */
export interface ApiBuilderContactConfig {
    readonly name?: string;
    readonly url?: string;
    readonly email?: string;
}
/**
 * Indicates that this particular element is considered deprecated in the API.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/0.11.94#model-deprecation
 */
export interface ApiBuilderDeprecationConfig {
    readonly description?: string;
}
export interface ApiBuilderEnumConfig {
    readonly name: string;
    readonly plural: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly values: ReadonlyArray<ApiBuilderEnumValueConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
/**
 * An object representing an API builder enum definition.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-enum
 */
export declare class ApiBuilderEnum {
    private config;
    private fullyQualifiedName;
    private service;
    /**
     * Returns the ApiBuilderEnum corresponding to the specified enum definition.
     */
    static fromConfig(config: ApiBuilderEnumConfig, service: ApiBuilderService, namespace?: string): ApiBuilderEnum;
    constructor(fullyQualifiedName: FullyQualifiedName, config: ApiBuilderEnumConfig, service: ApiBuilderService);
    get fullName(): string;
    get baseTypeName(): string;
    get shortName(): string;
    get packageName(): string;
    get name(): string;
    /**
     * A string used to identify this enumeration. Useful for naming the variable
     * corresponding to this enumeration in code generators.
     */
    get nickname(): string;
    get plural(): string;
    get description(): string | undefined;
    get values(): readonly ApiBuilderEnumValue[];
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    get isDeprecated(): boolean;
    get deprecationReason(): string | undefined;
    /**
     * Returns a list of unions where this type is present as a union type.
     */
    get unions(): ApiBuilderUnion[];
    /**
     * Returns name for the type discriminator field when this type is present
     * as a union type for one or more unions.
     */
    get discriminator(): string | undefined;
    /**
     * Returns the string to use in the discriminator field to identify this type
     * when present as a union type for one more unions.
     */
    get discriminatorValue(): string | undefined;
    isSame(type: ApiBuilderType): boolean;
    toString(): string;
}
export interface ApiBuilderEnumValueConfig {
    readonly name: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly attributes?: ReadonlyArray<ApiBuilderAttributeConfig>;
    readonly value?: string;
}
/**
 * An object representing an API builder enum value definition.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-enum_value
 */
export declare class ApiBuilderEnumValue {
    private config;
    constructor(config: ApiBuilderEnumValueConfig);
    /**
     * This property holds the name of the enum value.
     */
    get name(): string;
    /**
     * This property holds the value of the enum value.
     */
    get value(): string;
    /**
     * A string used to identify this enumeration value. Useful for naming the
     * variable corresponding to this enumeration value in code generators.
     */
    get nickname(): string;
    /**
     * This property holds an optional description for what
     * this enum value provides.
     */
    get description(): string | undefined;
    /**
     * This property holds additional meta data about enum value.
     */
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    /**
     * This property holds whether this enum value is deprecated.
     */
    get isDeprecated(): boolean;
    /**
     * This property holds an optional message indicating the reason this
     * enum value is deprecated.
     */
    get deprecationReason(): string | undefined;
    toString(): string;
}
export interface ApiBuilderFieldConfig {
    readonly name: string;
    readonly type: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly default?: string;
    readonly required: boolean;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly example?: string;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
    readonly annotations?: ReadonlyArray<string>;
}
export declare class ApiBuilderField {
    private config;
    private service;
    constructor(config: ApiBuilderFieldConfig, service: ApiBuilderService);
    get name(): string;
    get type(): ApiBuilderType;
    get description(): string | undefined;
    get isRequired(): boolean;
    get default(): string | undefined;
    get example(): string | undefined;
    get minimum(): number | undefined;
    get maximum(): number | undefined;
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    get isDeprecated(): boolean;
    get deprecationReason(): string | undefined;
    toString(): string;
}
export type ApiBuilderFileFlag = 'scaffolding';
export interface ApiBuilderFileConfig {
    readonly name: string;
    readonly dir: string;
    readonly contents: string;
    readonly flags?: ApiBuilderFileFlag;
}
/**
 * Class representing a generated source file.
 * @see https://app.apibuilder.io/bryzek/apidoc-generator/latest#model-file
 */
export declare class ApiBuilderFile {
    name: string;
    dir: string;
    contents: string;
    flags: ApiBuilderFileFlag | undefined;
    /**
     * Create a source file.
     * @param basename The recommended name for the file, including the file extension.
     * @param dirname The recommended directory path for the file where appropriate.
     * @param contents The actual source code.
     */
    constructor(basename: string, dirname: string, contents: string, flags?: ApiBuilderFileFlag);
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-header
 */
export interface ApiBuilderHeaderConfig {
    readonly name: string;
    readonly type: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly required: boolean;
    readonly default?: string;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export interface ApiBuilderImportConfig {
    readonly uri: string;
    readonly namespace: string;
    readonly organization: ApiBuilderOrganizationConfig;
    readonly application: ApiBuilderApplicationConfig;
    readonly version: string;
    readonly enums: readonly string[];
    readonly unions: readonly string[];
    readonly models: readonly string[];
    readonly annotations?: readonly ApiBuilderAnnotationConfig[];
}
export declare class ApiBuilderImport {
    private config;
    private service;
    constructor(config: ApiBuilderImportConfig, service: ApiBuilderService);
    get annotations(): readonly ApiBuilderAnnotationConfig[] | undefined;
    get namespace(): string;
    get organizationKey(): string;
    get applicationKey(): string;
    get version(): string;
    get enums(): readonly ApiBuilderEnum[];
    get models(): readonly ApiBuilderModel[];
    get unions(): readonly ApiBuilderUnion[];
    findEnumByName(name: string): ApiBuilderEnum | undefined;
    findModelByName(name: string): ApiBuilderModel | undefined;
    findUnionByName(name: string): ApiBuilderUnion | undefined;
    toString(): string;
}
/**
 * General metadata about this service
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-info
 */
export interface ApiBuilderInfoConfig {
    readonly license?: ApiBuilderLicenseConfig;
    readonly contact?: ApiBuilderContactConfig;
}
interface ApiBuilderGeneratorAttributes {
    readonly name: string;
    readonly value: string;
}
export interface ApiBuilderInvocationFormConfig {
    service: ApiBuilderServiceConfig;
    attributes: readonly ApiBuilderGeneratorAttributes[];
    user_agent?: string;
    imported_services?: readonly ApiBuilderServiceConfig[];
}
export declare class ApiBuilderInvocationForm {
    config: ApiBuilderInvocationFormConfig;
    constructor(config: ApiBuilderInvocationFormConfig);
    get attributes(): ReadonlyArray<ApiBuilderGeneratorAttributes>;
    get service(): ApiBuilderService;
    get importedServices(): readonly ApiBuilderService[];
    get userAgent(): string | undefined;
}
/**
 * Describes the software license contact for this service
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-license
 */
export interface ApiBuilderLicenseConfig {
    readonly name: string;
    readonly url?: string;
}
/**
 * A map is an enclosing type which points to another type.
 * Maps are often created within the context of defining the fields of
 * a model type.
 */
export declare class ApiBuilderMap {
    ofType: ApiBuilderType;
    constructor(ofType: ApiBuilderType);
    toString(): string;
}
export interface ApiBuilderModelConfig {
    readonly name: string;
    readonly plural: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly fields: ReadonlyArray<ApiBuilderFieldConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderModel {
    private config;
    private fullyQualifiedName;
    private service;
    /**
     * Returns the ApiBuilderModel corresponding to the specified API builder
     * model definition.
     */
    static fromConfig(config: ApiBuilderModelConfig, service: ApiBuilderService, namespace?: string): ApiBuilderModel;
    constructor(fullyQualifiedName: FullyQualifiedName, config: ApiBuilderModelConfig, service: ApiBuilderService);
    get fullName(): string;
    get baseTypeName(): string;
    get shortName(): string;
    get packageName(): string;
    get isDeprecated(): boolean;
    /**
     * Returns a list of unions where this type is present as a union type.
     */
    get unions(): readonly ApiBuilderUnion[];
    /**
     * Returns name for the type discriminator field when this type is present
     * as a union type for one or more unions.
     */
    get discriminator(): string | undefined;
    /**
     * Returns the string to use in the discriminator field to identify this type
     * when present as a union type for one more unions.
     */
    get discriminatorValue(): string | undefined;
    get description(): string | undefined;
    get fields(): readonly ApiBuilderField[];
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    /**
     * Returns whether the specified type is the same as this model type.
     */
    isSame(type: ApiBuilderType): boolean;
    toString(): string;
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#enum-method
 */
export type ApiBuilderMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE';
export interface ApiBuilderOperationConfig {
    readonly method: ApiBuilderMethod;
    readonly path: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly body?: ApiBuilderBodyConfig;
    readonly parameters: ReadonlyArray<ApiBuilderParameterConfig>;
    readonly responses: ReadonlyArray<ApiBuilderResponseConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderOperation {
    private config;
    resource: ApiBuilderResource;
    private service;
    constructor(config: ApiBuilderOperationConfig, resource: ApiBuilderResource, service: ApiBuilderService);
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    get body(): ApiBuilderBody | undefined;
    get method(): ApiBuilderMethod;
    get isDeprecated(): boolean;
    get deprecationReason(): string | undefined;
    get description(): string | undefined;
    /**
     * A string used to identify this operation. Useful for naming the method
     * corresponding to this operation in code generators.
     */
    get nickname(): string;
    get url(): string;
    get path(): string;
    get parameters(): readonly ApiBuilderParameter[];
    get responses(): readonly ApiBuilderResponse[];
    /**
     * Returns the response object matching the specified response code.
     * @param responseCode
     * @param useDefault
     * Indicates whether to fallback to the default response object for all
     * HTTP codes that are not covered individually by the specification.
     */
    getResponseByCode(responseCode: number, useDefault?: boolean): ApiBuilderResponse | undefined;
    /**
     * Returns the type for the response matching the specified response code.
     * @param responseCode
     * @param useDefault
     * Indicates whether to fallback to the default response object for all
     * HTTP codes that are not covered individually by the specification.
     */
    getResponseTypeByCode(responseCode: number, useDefault?: boolean): ApiBuilderType | undefined;
}
export interface ApiBuilderOrganizationConfig {
    readonly key: string;
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#enum-parameter_location
 */
export type ApiBuilderParameterLocation = 'Path' | 'Query' | 'Form' | 'Header';
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-parameter
 */
export interface ApiBuilderParameterConfig {
    readonly name: string;
    readonly type: string;
    readonly location: ApiBuilderParameterLocation;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly required: boolean;
    readonly default?: string;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly example?: string;
    readonly attributes?: readonly ApiBuilderAttributeConfig[];
}
export declare class ApiBuilderParameter {
    private config;
    private service;
    constructor(config: ApiBuilderParameterConfig, service: ApiBuilderService);
    get name(): string;
    get type(): ApiBuilderType;
    get defaultValue(): string | undefined;
    get deprecation(): ApiBuilderDeprecationConfig | undefined;
    get description(): string | undefined;
    get location(): ApiBuilderParameterLocation;
    get isRequired(): boolean;
}
export declare class ApiBuilderPrimitiveType {
    private fullyQualifiedName;
    constructor(fullyQualifiedName: FullyQualifiedName);
    get fullName(): string;
    get baseTypeName(): string;
    get shortName(): string;
    get packageName(): string;
    get typeName(): string;
    toString(): string;
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/0.11.94#model-resource
 */
export interface ApiBuilderResourceConfig {
    readonly type: string;
    readonly plural: string;
    readonly path?: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly operations: ReadonlyArray<ApiBuilderOperationConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderResource {
    private config;
    private service;
    constructor(config: ApiBuilderResourceConfig, service: ApiBuilderService);
    get operations(): readonly ApiBuilderOperation[];
    get type(): ApiBuilderType;
    get typeName(): string;
    get plural(): string;
    get namespace(): string;
    get path(): string | undefined;
}
interface PrimitiveUnionType<T> {
    value: T;
}
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#enum-response_code_option
 */
export type ApiBuilderResponseCodeOption = 'Default';
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#union-response_code
 */
export type ApiBuilderResponseCode = StrictUnion<{
    integer: PrimitiveUnionType<number>;
} | {
    response_code_option: ApiBuilderResponseCodeOption;
} | {
    discriminator: 'integer';
    value: number;
} | {
    discriminator: 'response_code_option';
    value: ApiBuilderResponseCodeOption;
}>;
/**
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-response
 */
export interface ApiBuilderResponseConfig {
    readonly code: ApiBuilderResponseCode;
    readonly type: string;
    readonly headers?: ReadonlyArray<ApiBuilderHeaderConfig>;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly attributes?: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderResponse {
    private config;
    private service;
    constructor(config: ApiBuilderResponseConfig, service: ApiBuilderService);
    get code(): number | undefined;
    /**
     * Indicates this is the default response object for all HTTP codes that are
     * not covered individually by the specification.
     */
    get isDefault(): boolean;
    get type(): ApiBuilderType;
    get headers(): ReadonlyArray<ApiBuilderHeaderConfig>;
    get description(): string | undefined;
    get isDeprecated(): boolean;
    get deprecationReason(): string | undefined;
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
}
export interface ApiBuilderServiceConfig {
    readonly apidoc: ApiBuilderApiDocConfig;
    readonly name: string;
    readonly organization: ApiBuilderOrganizationConfig;
    readonly application: ApiBuilderApplicationConfig;
    readonly namespace: string;
    readonly version: string;
    readonly base_url?: string;
    readonly description?: string;
    readonly info: ApiBuilderInfoConfig;
    readonly headers: ReadonlyArray<ApiBuilderHeaderConfig>;
    readonly imports: ReadonlyArray<ApiBuilderImportConfig>;
    readonly enums: ReadonlyArray<ApiBuilderEnumConfig>;
    readonly unions: ReadonlyArray<ApiBuilderUnionConfig>;
    readonly models: ReadonlyArray<ApiBuilderModelConfig>;
    readonly resources: ReadonlyArray<ApiBuilderResourceConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
    readonly annotations: ReadonlyArray<ApiBuilderAnnotationConfig>;
}
/**
 * Wraps an apibuilder service definition and provides utilities for
 * interacting with it.
 */
export declare class ApiBuilderService {
    private config;
    constructor(config: ApiBuilderServiceConfig);
    get name(): string;
    get namespace(): string;
    get version(): string;
    get description(): string | undefined;
    get info(): ApiBuilderInfoConfig;
    get applicationKey(): string;
    get organizationKey(): string;
    get imports(): readonly ApiBuilderImport[];
    get enums(): readonly ApiBuilderEnum[];
    get models(): readonly ApiBuilderModel[];
    get unions(): readonly ApiBuilderUnion[];
    get typesByFullName(): Record<string, ApiBuilderEnum | ApiBuilderModel | ApiBuilderUnion>;
    get typesByShortName(): Record<string, ApiBuilderEnum | ApiBuilderModel | ApiBuilderUnion>;
    get resources(): readonly ApiBuilderResource[];
    get baseUrl(): string | undefined;
    /**
     * Returns the type matching the specified identifier, or `undefined` otherwise.
     * @param typeName
     */
    findTypeByName(typeName: string): ApiBuilderEnum | ApiBuilderModel | ApiBuilderUnion | undefined;
    toString(): string;
}
export interface ApiBuilderUnionConfig {
    readonly name: string;
    readonly plural: string;
    readonly discriminator?: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly types: ReadonlyArray<ApiBuilderUnionTypeConfig>;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
}
export declare class ApiBuilderUnion {
    private config;
    private fullyQualifiedName;
    private service;
    /**
     * Returns the ApiBuilderUnion corresponding to the specified API Builder
     * union definition.
     */
    static fromConfig(config: ApiBuilderUnionConfig, service: ApiBuilderService, namespace?: string): ApiBuilderUnion;
    constructor(fullyQualifiedName: FullyQualifiedName, config: ApiBuilderUnionConfig, service: ApiBuilderService);
    get fullName(): string;
    get baseTypeName(): string;
    get shortName(): string;
    get packageName(): string;
    get name(): string;
    get plural(): string;
    get discriminator(): string;
    get description(): string | undefined;
    get deprecation(): ApiBuilderDeprecationConfig | undefined;
    get types(): readonly ApiBuilderUnionType[];
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    toString(): string;
}
/**
 * An object representing an API builder union type definition.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-union_type
 */
export interface ApiBuilderUnionTypeConfig {
    readonly type: string;
    readonly description?: string;
    readonly deprecation?: ApiBuilderDeprecationConfig;
    readonly attributes: ReadonlyArray<ApiBuilderAttributeConfig>;
    readonly default?: boolean;
    readonly discriminator_value?: string;
}
/**
 * An object representing an API builder union definition
 * * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-union
 */
export declare class ApiBuilderUnionType {
    private config;
    private service;
    constructor(config: ApiBuilderUnionTypeConfig, service: ApiBuilderService);
    get type(): ApiBuilderType;
    get typeName(): string;
    get description(): string | undefined;
    get deprecation(): ApiBuilderDeprecationConfig | undefined;
    get attributes(): ReadonlyArray<ApiBuilderAttributeConfig>;
    get default(): boolean;
    get discriminatorValue(): string;
    toString(): string;
}
export type ApiBuilderEnclosingType = ApiBuilderArray | ApiBuilderMap;
export type ApiBuilderType = ApiBuilderPrimitiveType | ApiBuilderArray | ApiBuilderMap | ApiBuilderModel | ApiBuilderEnum | ApiBuilderUnion;
export {};
