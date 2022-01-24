"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = require('fs');
var routes = express_1.default.Router();
var imagesP = './images/full/';
var resizedP = './images/thumbs/';
var sharp = require('sharp');
routes.get('/', function (req, res) {
    if (req.query.name && req.query.width && req.query.height) {
        var imageName = req.query.name;
        var imageWidth = req.query.width;
        var imageHeight = req.query.height;
        if (fs.existsSync("".concat(imagesP).concat(req.query.name, ".jpg"))) {
            var existImg = "".concat(imagesP).concat(req.query.name, ".jpg");
            sharp(existImg)
                .resize(200, 400, {
                fit: 'fill',
            })
                .toFile("".concat(resizedP).concat(req.query.name, "_").concat(req.query.width, "_").concat(req.query.height, ".jpg"))
                .then(function () {
                var resizedImg = "".concat(resizedP).concat(req.query.name, "_").concat(req.query.width, "_").concat(req.query.height, ".jpg");
                res.sendfile(resizedImg);
                // output.png is a 200 pixels wide and 300 pixels high image
                // containing a nearest-neighbour scaled version
                // contained within the north-east corner of a semi-transparent white canvas
            });
        }
        else {
            res.status(404).send("File doesn't exist");
        }
    }
    else {
        res.status(400).send("Bad request!");
    }
});
exports.default = routes;
