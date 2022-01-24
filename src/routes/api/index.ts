import express from 'express';
const fs = require('fs');
const routes = express.Router();
const imagesP = './images/full/';
const resizedP = './images/thumbs/';
const sharp = require('sharp');

routes.get('/', (req, res) => {
  if (req.query.name && req.query.width && req.query.height) {
    const imageName = req.query.name;
    let imageWidth = req.query.width as unknown as number;
    let imageHeight = req.query.height as unknown as number;
    if (fs.existsSync(`${imagesP}${req.query.name}.jpg`)) {
      const existImg = `${imagesP}${req.query.name}.jpg`;
      sharp(existImg)
        .resize(200, 400, {
          fit: 'fill',
        })
        .toFile(
          `${resizedP}${req.query.name}_${req.query.width}_${req.query.height}.jpg`
        )
        .then(() => {
          const resizedImg = `${resizedP}${req.query.name}_${req.query.width}_${req.query.height}.jpg`;
          res.sendfile(resizedImg);
          // output.png is a 200 pixels wide and 300 pixels high image
          // containing a nearest-neighbour scaled version
          // contained within the north-east corner of a semi-transparent white canvas
        });
    } else {
      res.status(404).send(`File doesn't exist`);
    }
  } else {
    res.status(400).send(`Bad request!`);
  }
});

export default routes;
