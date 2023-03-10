"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function pascalCase(string) {
    return (0, lodash_1.upperFirst)((0, lodash_1.camelCase)(string));
}
exports.default = pascalCase;
