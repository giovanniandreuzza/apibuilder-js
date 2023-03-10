"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function findTypeByName(types, name) {
    return types.find((0, lodash_1.overSome)([
        (0, lodash_1.matchesProperty)('shortName', name),
        (0, lodash_1.matchesProperty)('baseTypeName', name),
    ]));
}
exports.default = findTypeByName;
