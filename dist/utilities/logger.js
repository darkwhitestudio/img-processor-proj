"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    var url = req.path;
    console.log("".concat(url, " is visited"));
    next();
};
exports.default = logger;
