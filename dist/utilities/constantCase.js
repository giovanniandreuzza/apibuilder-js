"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function constantCase(string) {
    return (0, lodash_1.toUpper)((0, lodash_1.snakeCase)(string));
}
exports.default = constantCase;
