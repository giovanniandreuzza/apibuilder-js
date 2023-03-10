"use strict";
/* eslint-disable max-classes-per-file, import/no-cycle, @typescript-eslint/no-use-before-define */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiBuilderUnionType = exports.ApiBuilderUnion = exports.ApiBuilderService = exports.ApiBuilderResponse = exports.ApiBuilderResource = exports.ApiBuilderPrimitiveType = exports.ApiBuilderParameter = exports.ApiBuilderOperation = exports.ApiBuilderModel = exports.ApiBuilderMap = exports.ApiBuilderInvocationForm = exports.ApiBuilderImport = exports.ApiBuilderFile = exports.ApiBuilderField = exports.ApiBuilderEnumValue = exports.ApiBuilderEnum = exports.ApiBuilderBody = exports.ApiBuilderArray = void 0;
var lodash_1 = require("lodash");
var invariant_1 = __importDefault(require("invariant"));
var pluralize_1 = __importDefault(require("pluralize"));
var language_1 = require("../language");
var predicates_1 = require("./predicates");
var constantCase_1 = __importDefault(require("../utilities/constantCase"));
var pascalCase_1 = __importDefault(require("../utilities/pascalCase"));
var findTypeByName_1 = __importDefault(require("../utilities/findTypeByName"));
/**
 * An array is an enclosing type which points to another type.
 * Arrays are often created within the context of defining the fields of
 * a model type.
 */
var ApiBuilderArray = /** @class */ (function () {
    function ApiBuilderArray(ofType) {
        this.ofType = ofType;
    }
    ApiBuilderArray.prototype.toString = function () {
        return "[".concat(String(this.ofType), "]");
    };
    return ApiBuilderArray;
}());
exports.ApiBuilderArray = ApiBuilderArray;
var ApiBuilderBody = /** @class */ (function () {
    function ApiBuilderBody(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderBody.prototype, "type", {
        get: function () {
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(this.config.type), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderBody.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderBody.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    return ApiBuilderBody;
}());
exports.ApiBuilderBody = ApiBuilderBody;
/**
 * An object representing an API builder enum definition.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-enum
 */
var ApiBuilderEnum = /** @class */ (function () {
    function ApiBuilderEnum(fullyQualifiedName, config, service) {
        (0, invariant_1.default)(!fullyQualifiedName.isEnclosingType, "".concat(String(fullyQualifiedName), " is the name of a collection type. ")
            + 'You cannot create an enumeration from a collection type.');
        (0, invariant_1.default)(!fullyQualifiedName.isPrimitiveType, "".concat(String(fullyQualifiedName), " is the name of a primitive type. ")
            + 'You cannot create an enumeration from a primitive type.');
        this.config = config;
        this.fullyQualifiedName = fullyQualifiedName;
        this.service = service;
    }
    /**
     * Returns the ApiBuilderEnum corresponding to the specified enum definition.
     */
    ApiBuilderEnum.fromConfig = function (config, service, namespace) {
        if (namespace === void 0) { namespace = service.namespace; }
        var fullyQualifiedName = new language_1.FullyQualifiedName("".concat(namespace, ".enums.").concat(config.name));
        return new ApiBuilderEnum(fullyQualifiedName, config, service);
    };
    Object.defineProperty(ApiBuilderEnum.prototype, "fullName", {
        get: function () {
            return this.fullyQualifiedName.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "baseTypeName", {
        get: function () {
            return this.fullyQualifiedName.baseTypeName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "shortName", {
        get: function () {
            return this.fullyQualifiedName.shortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "packageName", {
        get: function () {
            return this.fullyQualifiedName.packageName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "nickname", {
        /**
         * A string used to identify this enumeration. Useful for naming the variable
         * corresponding to this enumeration in code generators.
         */
        get: function () {
            return (0, pascalCase_1.default)(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "plural", {
        get: function () {
            return this.config.plural;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "values", {
        get: function () {
            return this.config.values.map(function (value) { return new ApiBuilderEnumValue(value); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "deprecationReason", {
        get: function () {
            if (this.config.deprecation != null) {
                return this.config.deprecation.description;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "unions", {
        /**
         * Returns a list of unions where this type is present as a union type.
         */
        get: function () {
            var _this = this;
            return this.service.unions
                .filter(function (union) { return union.types.some(function (unionType) { return _this.isSame(unionType.type); }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "discriminator", {
        /**
         * Returns name for the type discriminator field when this type is present
         * as a union type for one or more unions.
         */
        get: function () {
            var discriminators = this.unions
                .map(function (union) { return union.discriminator; })
                .filter(function (discriminator, index, self) { return self.indexOf(discriminator) === index; });
            if (discriminators.length > 1) {
                throw new Error('Name for the type discriminator field must be the same across all unions');
            }
            return discriminators.length ? discriminators[0] : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnum.prototype, "discriminatorValue", {
        /**
         * Returns the string to use in the discriminator field to identify this type
         * when present as a union type for one more unions.
         */
        get: function () {
            var _this = this;
            var discriminatorValues = this.unions
                .reduce(function (self, union) { return self.concat(union.types
                .filter(function (unionType) { return _this.isSame(unionType.type); })
                .map(function (unionType) { return unionType.discriminatorValue; })); }, [])
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            if (discriminatorValues.length > 1) {
                throw new Error('Discriminator value must the same across all union types');
            }
            return discriminatorValues.length ? discriminatorValues[0] : undefined;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderEnum.prototype.isSame = function (type) {
        return (0, predicates_1.isEnumType)(type) && type.fullName === this.fullName;
    };
    ApiBuilderEnum.prototype.toString = function () {
        return this.fullName;
    };
    return ApiBuilderEnum;
}());
exports.ApiBuilderEnum = ApiBuilderEnum;
/**
 * An object representing an API builder enum value definition.
 * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-enum_value
 */
var ApiBuilderEnumValue = /** @class */ (function () {
    function ApiBuilderEnumValue(config) {
        this.config = config;
    }
    Object.defineProperty(ApiBuilderEnumValue.prototype, "name", {
        /**
         * This property holds the name of the enum value.
         */
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "value", {
        /**
         * This property holds the value of the enum value.
         */
        get: function () {
            return this.config.value || this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "nickname", {
        /**
         * A string used to identify this enumeration value. Useful for naming the
         * variable corresponding to this enumeration value in code generators.
         */
        get: function () {
            return (0, constantCase_1.default)(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "description", {
        /**
         * This property holds an optional description for what
         * this enum value provides.
         */
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "attributes", {
        /**
         * This property holds additional meta data about enum value.
         */
        get: function () {
            return this.config.attributes != null ? this.config.attributes : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "isDeprecated", {
        /**
         * This property holds whether this enum value is deprecated.
         */
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderEnumValue.prototype, "deprecationReason", {
        /**
         * This property holds an optional message indicating the reason this
         * enum value is deprecated.
         */
        get: function () {
            if (this.config.deprecation != null) {
                return this.config.deprecation.description;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderEnumValue.prototype.toString = function () {
        return this.name;
    };
    return ApiBuilderEnumValue;
}());
exports.ApiBuilderEnumValue = ApiBuilderEnumValue;
var ApiBuilderField = /** @class */ (function () {
    function ApiBuilderField(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderField.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "type", {
        get: function () {
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(this.config.type), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "isRequired", {
        get: function () {
            return this.config.required;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "default", {
        get: function () {
            return this.config.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "example", {
        get: function () {
            return this.config.example;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "minimum", {
        get: function () {
            return this.config.minimum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "maximum", {
        get: function () {
            return this.config.maximum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderField.prototype, "deprecationReason", {
        get: function () {
            if (this.config.deprecation != null) {
                return this.config.deprecation.description;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderField.prototype.toString = function () {
        return this.name;
    };
    return ApiBuilderField;
}());
exports.ApiBuilderField = ApiBuilderField;
/**
 * Class representing a generated source file.
 * @see https://app.apibuilder.io/bryzek/apidoc-generator/latest#model-file
 */
var ApiBuilderFile = /** @class */ (function () {
    /**
     * Create a source file.
     * @param basename The recommended name for the file, including the file extension.
     * @param dirname The recommended directory path for the file where appropriate.
     * @param contents The actual source code.
     */
    function ApiBuilderFile(basename, dirname, contents, flags) {
        this.name = basename;
        this.dir = dirname;
        this.contents = contents;
        this.flags = flags;
    }
    return ApiBuilderFile;
}());
exports.ApiBuilderFile = ApiBuilderFile;
var ApiBuilderImport = /** @class */ (function () {
    function ApiBuilderImport(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderImport.prototype, "annotations", {
        get: function () {
            return this.config.annotations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "namespace", {
        get: function () {
            return this.config.namespace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "organizationKey", {
        get: function () {
            return this.config.organization.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "applicationKey", {
        get: function () {
            return this.config.application.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "version", {
        get: function () {
            return this.config.version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "enums", {
        get: function () {
            var _this = this;
            var enums = this.config.enums.map(function (enumeration) {
                var config = {
                    name: enumeration,
                    plural: (0, pluralize_1.default)(enumeration),
                    values: [],
                    attributes: [],
                };
                return ApiBuilderEnum.fromConfig(config, _this.service, _this.namespace);
            });
            Object.defineProperty(this, 'enums', { value: enums });
            return enums;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "models", {
        get: function () {
            var _this = this;
            var models = this.config.models.map(function (model) {
                var config = {
                    name: model,
                    plural: (0, pluralize_1.default)(model),
                    fields: [],
                    attributes: [],
                };
                return ApiBuilderModel.fromConfig(config, _this.service, _this.namespace);
            });
            Object.defineProperty(this, 'models', { value: models });
            return models;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderImport.prototype, "unions", {
        get: function () {
            var _this = this;
            var unions = this.config.unions.map(function (union) {
                var config = {
                    name: union,
                    plural: (0, pluralize_1.default)(union),
                    types: [],
                    attributes: [],
                };
                return ApiBuilderUnion.fromConfig(config, _this.service, _this.namespace);
            });
            Object.defineProperty(this, 'unions', { value: unions });
            return unions;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderImport.prototype.findEnumByName = function (name) {
        return (0, findTypeByName_1.default)(this.enums, name);
    };
    ApiBuilderImport.prototype.findModelByName = function (name) {
        return (0, findTypeByName_1.default)(this.models, name);
    };
    ApiBuilderImport.prototype.findUnionByName = function (name) {
        return (0, findTypeByName_1.default)(this.unions, name);
    };
    ApiBuilderImport.prototype.toString = function () {
        return "".concat(this.applicationKey, "@").concat(this.version);
    };
    return ApiBuilderImport;
}());
exports.ApiBuilderImport = ApiBuilderImport;
var ApiBuilderInvocationForm = /** @class */ (function () {
    function ApiBuilderInvocationForm(config) {
        this.config = config;
    }
    Object.defineProperty(ApiBuilderInvocationForm.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderInvocationForm.prototype, "service", {
        get: function () {
            return new ApiBuilderService(this.config.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderInvocationForm.prototype, "importedServices", {
        get: function () {
            return (this.config.imported_services || []).map(function (importedService) { return (new ApiBuilderService(importedService)); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderInvocationForm.prototype, "userAgent", {
        get: function () {
            return this.config.user_agent;
        },
        enumerable: false,
        configurable: true
    });
    return ApiBuilderInvocationForm;
}());
exports.ApiBuilderInvocationForm = ApiBuilderInvocationForm;
/**
 * A map is an enclosing type which points to another type.
 * Maps are often created within the context of defining the fields of
 * a model type.
 */
var ApiBuilderMap = /** @class */ (function () {
    function ApiBuilderMap(ofType) {
        this.ofType = ofType;
    }
    ApiBuilderMap.prototype.toString = function () {
        return "map[".concat(String(this.ofType), "]");
    };
    return ApiBuilderMap;
}());
exports.ApiBuilderMap = ApiBuilderMap;
var ApiBuilderModel = /** @class */ (function () {
    function ApiBuilderModel(fullyQualifiedName, config, service) {
        (0, invariant_1.default)(!fullyQualifiedName.isEnclosingType, "".concat(String(fullyQualifiedName), " is the name of an enclosing type. ")
            + 'You cannot create a model from an enclosing type.');
        (0, invariant_1.default)(!fullyQualifiedName.isPrimitiveType, "".concat(String(fullyQualifiedName), " is the name of a primitive type. ")
            + 'You cannot create an model from a primitive type.');
        this.config = config;
        this.fullyQualifiedName = fullyQualifiedName;
        this.service = service;
    }
    /**
     * Returns the ApiBuilderModel corresponding to the specified API builder
     * model definition.
     */
    ApiBuilderModel.fromConfig = function (config, service, namespace) {
        if (namespace === void 0) { namespace = service.namespace; }
        var fullyQualifiedName = new language_1.FullyQualifiedName("".concat(namespace, ".models.").concat(config.name));
        return new ApiBuilderModel(fullyQualifiedName, config, service);
    };
    Object.defineProperty(ApiBuilderModel.prototype, "fullName", {
        get: function () {
            return this.fullyQualifiedName.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "baseTypeName", {
        get: function () {
            return this.fullyQualifiedName.baseTypeName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "shortName", {
        get: function () {
            return this.fullyQualifiedName.shortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "packageName", {
        get: function () {
            return this.fullyQualifiedName.packageName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "unions", {
        /**
         * Returns a list of unions where this type is present as a union type.
         */
        get: function () {
            var _this = this;
            return this.service.unions
                .filter(function (union) { return union.types.some(function (unionType) { return _this.isSame(unionType.type); }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "discriminator", {
        /**
         * Returns name for the type discriminator field when this type is present
         * as a union type for one or more unions.
         */
        get: function () {
            var discriminators = this.unions
                .map(function (union) { return union.discriminator; })
                .filter(function (discriminator, index, self) { return self.indexOf(discriminator) === index; });
            if (discriminators.length > 1) {
                throw new Error('Name for the type discriminator field must be the same across all unions');
            }
            return discriminators.length ? discriminators[0] : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "discriminatorValue", {
        /**
         * Returns the string to use in the discriminator field to identify this type
         * when present as a union type for one more unions.
         */
        get: function () {
            var _this = this;
            var discriminatorValues = this.unions
                .reduce(function (self, union) { return self.concat(union.types
                .filter(function (unionType) { return _this.isSame(unionType.type); })
                .map(function (unionType) { return unionType.discriminatorValue; })); }, [])
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            if (discriminatorValues.length > 1) {
                throw new Error('Discriminator value must the same across all union types');
            }
            return discriminatorValues.length ? discriminatorValues[0] : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "fields", {
        get: function () {
            var _this = this;
            return this.config.fields.map(function (field) { return new ApiBuilderField(field, _this.service); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderModel.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns whether the specified type is the same as this model type.
     */
    ApiBuilderModel.prototype.isSame = function (type) {
        return (0, predicates_1.isModelType)(type) && type.fullName === this.fullName;
    };
    ApiBuilderModel.prototype.toString = function () {
        return this.fullName;
    };
    return ApiBuilderModel;
}());
exports.ApiBuilderModel = ApiBuilderModel;
var ApiBuilderOperation = /** @class */ (function () {
    function ApiBuilderOperation(config, resource, service) {
        this.config = config;
        this.service = service;
        this.resource = resource;
    }
    Object.defineProperty(ApiBuilderOperation.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "body", {
        get: function () {
            if (this.config.body != null) {
                return new ApiBuilderBody(this.config.body, this.service);
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "method", {
        get: function () {
            return this.config.method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "deprecationReason", {
        get: function () {
            if (this.config.deprecation != null) {
                return this.config.deprecation.description;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "nickname", {
        /**
         * A string used to identify this operation. Useful for naming the method
         * corresponding to this operation in code generators.
         */
        get: function () {
            var path = this.config.path;
            if (this.resource.path != null) {
                path = path.replace(this.resource.path, '');
            }
            if (path.startsWith('/')) {
                path = path.slice(1);
            }
            var parts = path.split('/');
            var dynamicParts = parts.filter(function (part) { return part.startsWith(':'); }).map(function (part, index) {
                var prefix = index === 0 ? 'By' : 'And';
                return prefix + (0, pascalCase_1.default)(part);
            });
            var staticParts = parts.filter(function (part) { return !part.startsWith(':'); }).map(function (part, index) {
                var prefix = index === 0 ? '' : 'And';
                return prefix + (0, pascalCase_1.default)(part);
            });
            return this.method.toLowerCase() + staticParts.concat(dynamicParts).join('');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "url", {
        get: function () {
            if (this.service.baseUrl != null) {
                return "".concat(this.service.baseUrl).concat(this.config.path);
            }
            return this.config.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "path", {
        get: function () {
            return this.config.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "parameters", {
        get: function () {
            var _this = this;
            return this.config.parameters.map((function (parameter) { return new ApiBuilderParameter(parameter, _this.service); }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderOperation.prototype, "responses", {
        get: function () {
            var _this = this;
            return this.config.responses.map(function (response) { return new ApiBuilderResponse(response, _this.service); });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the response object matching the specified response code.
     * @param responseCode
     * @param useDefault
     * Indicates whether to fallback to the default response object for all
     * HTTP codes that are not covered individually by the specification.
     */
    ApiBuilderOperation.prototype.getResponseByCode = function (responseCode, useDefault) {
        if (useDefault === void 0) { useDefault = false; }
        var response = this.responses.find(function (_) { return _.code === responseCode; });
        if (response != null) {
            return response;
        }
        if (useDefault) {
            return this.responses.find(function (_) { return _.isDefault; });
        }
        return undefined;
    };
    /**
     * Returns the type for the response matching the specified response code.
     * @param responseCode
     * @param useDefault
     * Indicates whether to fallback to the default response object for all
     * HTTP codes that are not covered individually by the specification.
     */
    ApiBuilderOperation.prototype.getResponseTypeByCode = function (responseCode, useDefault) {
        var response = this.getResponseByCode(responseCode, useDefault);
        return response != null ? response.type : undefined;
    };
    return ApiBuilderOperation;
}());
exports.ApiBuilderOperation = ApiBuilderOperation;
var ApiBuilderParameter = /** @class */ (function () {
    function ApiBuilderParameter(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderParameter.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "type", {
        get: function () {
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(this.config.type), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "defaultValue", {
        get: function () {
            return this.config.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "deprecation", {
        get: function () {
            return this.config.deprecation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "location", {
        get: function () {
            return this.config.location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderParameter.prototype, "isRequired", {
        get: function () {
            return this.config.required;
        },
        enumerable: false,
        configurable: true
    });
    return ApiBuilderParameter;
}());
exports.ApiBuilderParameter = ApiBuilderParameter;
var ApiBuilderPrimitiveType = /** @class */ (function () {
    function ApiBuilderPrimitiveType(fullyQualifiedName) {
        (0, invariant_1.default)(fullyQualifiedName.isPrimitiveType, "".concat(String(fullyQualifiedName), " is not an API builder primitive type."));
        this.fullyQualifiedName = fullyQualifiedName;
    }
    Object.defineProperty(ApiBuilderPrimitiveType.prototype, "fullName", {
        get: function () {
            return this.fullyQualifiedName.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderPrimitiveType.prototype, "baseTypeName", {
        get: function () {
            return this.fullyQualifiedName.baseTypeName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderPrimitiveType.prototype, "shortName", {
        get: function () {
            return this.fullyQualifiedName.shortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderPrimitiveType.prototype, "packageName", {
        get: function () {
            return this.fullyQualifiedName.packageName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderPrimitiveType.prototype, "typeName", {
        get: function () {
            return this.fullyQualifiedName.fullName;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderPrimitiveType.prototype.toString = function () {
        return this.baseTypeName;
    };
    return ApiBuilderPrimitiveType;
}());
exports.ApiBuilderPrimitiveType = ApiBuilderPrimitiveType;
var ApiBuilderResource = /** @class */ (function () {
    function ApiBuilderResource(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderResource.prototype, "operations", {
        get: function () {
            var _this = this;
            return this.config.operations.map((function (operation) { return new ApiBuilderOperation(operation, _this, _this.service); }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResource.prototype, "type", {
        get: function () {
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(this.config.type), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResource.prototype, "typeName", {
        get: function () {
            return this.config.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResource.prototype, "plural", {
        get: function () {
            return this.config.plural;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResource.prototype, "namespace", {
        get: function () {
            return this.service.namespace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResource.prototype, "path", {
        get: function () {
            return this.config.path;
        },
        enumerable: false,
        configurable: true
    });
    return ApiBuilderResource;
}());
exports.ApiBuilderResource = ApiBuilderResource;
var ApiBuilderResponse = /** @class */ (function () {
    function ApiBuilderResponse(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderResponse.prototype, "code", {
        get: function () {
            if (this.config.code.integer != null) {
                return this.config.code.integer.value;
            }
            if (this.config.code.discriminator === 'integer') {
                return this.config.code.value;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "isDefault", {
        /**
         * Indicates this is the default response object for all HTTP codes that are
         * not covered individually by the specification.
         */
        get: function () {
            if (this.config.code.response_code_option != null) {
                return this.config.code.response_code_option === 'Default';
            }
            if (this.config.code.discriminator === 'response_code_option') {
                return this.config.code.value === 'Default';
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "type", {
        get: function () {
            var typeName = this.config.type != null ? this.config.type : 'unit';
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(typeName), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "headers", {
        get: function () {
            return this.config.headers != null ? this.config.headers : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "isDeprecated", {
        get: function () {
            return this.config.deprecation != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "deprecationReason", {
        get: function () {
            if (this.config.deprecation != null) {
                return this.config.deprecation.description;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderResponse.prototype, "attributes", {
        get: function () {
            return this.config.attributes != null ? this.config.attributes : [];
        },
        enumerable: false,
        configurable: true
    });
    return ApiBuilderResponse;
}());
exports.ApiBuilderResponse = ApiBuilderResponse;
/**
 * Wraps an apibuilder service definition and provides utilities for
 * interacting with it.
 */
var ApiBuilderService = /** @class */ (function () {
    function ApiBuilderService(config) {
        this.config = config;
    }
    Object.defineProperty(ApiBuilderService.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "namespace", {
        get: function () {
            return this.config.namespace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "version", {
        get: function () {
            return this.config.version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "info", {
        get: function () {
            return this.config.info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "applicationKey", {
        get: function () {
            return this.config.application.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "organizationKey", {
        get: function () {
            return this.config.organization.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "imports", {
        get: function () {
            var _this = this;
            var imports = this.config.imports.map(function (config) { return new ApiBuilderImport(config, _this); });
            Object.defineProperty(this, 'imports', { value: imports });
            return imports;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "enums", {
        get: function () {
            var _this = this;
            var enums = this.config.enums.map(function (config) { return ApiBuilderEnum.fromConfig(config, _this); });
            Object.defineProperty(this, 'enums', { value: enums });
            return enums;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "models", {
        get: function () {
            var _this = this;
            var models = this.config.models.map(function (config) { return ApiBuilderModel.fromConfig(config, _this); });
            Object.defineProperty(this, 'models', { value: models });
            return models;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "unions", {
        get: function () {
            var _this = this;
            var unions = this.config.unions.map(function (config) { return ApiBuilderUnion.fromConfig(config, _this); });
            Object.defineProperty(this, 'unions', { value: unions });
            return unions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "typesByFullName", {
        get: function () {
            var typesByFullName = {};
            this.enums.forEach(function (enumeration) {
                typesByFullName[enumeration.fullName] = enumeration;
            });
            this.models.forEach(function (model) {
                typesByFullName[model.fullName] = model;
            });
            this.unions.forEach(function (union) {
                typesByFullName[union.fullName] = union;
            });
            Object.defineProperty(this, 'typesByFullName', {
                value: typesByFullName,
            });
            return typesByFullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "typesByShortName", {
        get: function () {
            var typesByShortName = {};
            this.enums.forEach(function (enumeration) {
                typesByShortName[enumeration.shortName] = enumeration;
            });
            this.models.forEach(function (model) {
                typesByShortName[model.shortName] = model;
            });
            this.unions.forEach(function (union) {
                typesByShortName[union.shortName] = union;
            });
            Object.defineProperty(this, 'typesByShortName', {
                value: typesByShortName,
            });
            return typesByShortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "resources", {
        get: function () {
            var _this = this;
            var resources = this.config.resources
                .map(function (resource) { return new ApiBuilderResource(resource, _this); });
            Object.defineProperty(this, 'resources', { value: resources });
            return resources;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderService.prototype, "baseUrl", {
        get: function () {
            return this.config.base_url;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the type matching the specified identifier, or `undefined` otherwise.
     * @param typeName
     */
    ApiBuilderService.prototype.findTypeByName = function (typeName) {
        if (this.typesByFullName[typeName] != null) {
            return this.typesByFullName[typeName];
        }
        if (this.typesByShortName[typeName] != null) {
            return this.typesByShortName[typeName];
        }
        return ((0, findTypeByName_1.default)((0, lodash_1.flatMap)(this.imports, function (_) { return _.enums; }), typeName)
            || (0, findTypeByName_1.default)((0, lodash_1.flatMap)(this.imports, function (_) { return _.models; }), typeName)
            || (0, findTypeByName_1.default)((0, lodash_1.flatMap)(this.imports, function (_) { return _.unions; }), typeName));
    };
    ApiBuilderService.prototype.toString = function () {
        return "".concat(this.applicationKey, "@").concat(this.version);
    };
    return ApiBuilderService;
}());
exports.ApiBuilderService = ApiBuilderService;
var ApiBuilderUnion = /** @class */ (function () {
    function ApiBuilderUnion(fullyQualifiedName, config, service) {
        (0, invariant_1.default)(!fullyQualifiedName.isEnclosingType, "".concat(String(fullyQualifiedName), " is a collection type. ")
            + 'You cannot create an union from a collection type.');
        (0, invariant_1.default)(!fullyQualifiedName.isPrimitiveType, "".concat(String(fullyQualifiedName), " is a primitive type. ")
            + 'You cannot create an union from a primitive type.');
        this.config = config;
        this.fullyQualifiedName = fullyQualifiedName;
        this.service = service;
    }
    /**
     * Returns the ApiBuilderUnion corresponding to the specified API Builder
     * union definition.
     */
    ApiBuilderUnion.fromConfig = function (config, service, namespace) {
        if (namespace === void 0) { namespace = service.namespace; }
        var fullyQualifiedName = new language_1.FullyQualifiedName("".concat(namespace, ".unions.").concat(config.name));
        return new ApiBuilderUnion(fullyQualifiedName, config, service);
    };
    Object.defineProperty(ApiBuilderUnion.prototype, "fullName", {
        get: function () {
            return this.fullyQualifiedName.fullName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "baseTypeName", {
        get: function () {
            return this.fullyQualifiedName.baseTypeName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "shortName", {
        get: function () {
            return this.fullyQualifiedName.shortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "packageName", {
        get: function () {
            return this.fullyQualifiedName.packageName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "plural", {
        get: function () {
            return this.config.plural;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "discriminator", {
        get: function () {
            return this.config.discriminator || 'discriminator';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "deprecation", {
        get: function () {
            return this.config.deprecation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "types", {
        get: function () {
            var _this = this;
            return this.config.types.map(function (type) { return new ApiBuilderUnionType(type, _this.service); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnion.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderUnion.prototype.toString = function () {
        return this.fullName;
    };
    return ApiBuilderUnion;
}());
exports.ApiBuilderUnion = ApiBuilderUnion;
/**
 * An object representing an API builder union definition
 * * @see https://app.apibuilder.io/bryzek/apidoc-spec/latest#model-union
 */
var ApiBuilderUnionType = /** @class */ (function () {
    function ApiBuilderUnionType(config, service) {
        this.config = config;
        this.service = service;
    }
    Object.defineProperty(ApiBuilderUnionType.prototype, "type", {
        get: function () {
            return (0, language_1.typeFromAst)((0, language_1.astFromTypeName)(this.config.type), this.service);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "typeName", {
        get: function () {
            return this.config.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "description", {
        get: function () {
            return this.config.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "deprecation", {
        get: function () {
            return this.config.deprecation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "attributes", {
        get: function () {
            return this.config.attributes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "default", {
        get: function () {
            return this.config.default != null ? this.config.default : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiBuilderUnionType.prototype, "discriminatorValue", {
        get: function () {
            return this.config.discriminator_value || this.config.type;
        },
        enumerable: false,
        configurable: true
    });
    ApiBuilderUnionType.prototype.toString = function () {
        return this.config.type;
    };
    return ApiBuilderUnionType;
}());
exports.ApiBuilderUnionType = ApiBuilderUnionType;
