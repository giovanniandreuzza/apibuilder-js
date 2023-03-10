"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kind = exports.Regex = void 0;
exports.Regex = {
    ARRAYOF: /^\[(.+)\]$/,
    OBJECTOF: /^map\[(.+)\]$/,
};
exports.Kind = {
    ARRAY: 'array',
    BOOLEAN: 'boolean',
    DATE_ISO8601: 'date-iso8601',
    DATE_TIME_ISO8601: 'date-time-iso8601',
    DECIMAL: 'decimal',
    DOUBLE: 'double',
    INTEGER: 'integer',
    JSON: 'json',
    LONG: 'long',
    MAP: 'map',
    OBJECT: 'object',
    STRING: 'string',
    UNIT: 'unit',
    UUID: 'uuid',
};
