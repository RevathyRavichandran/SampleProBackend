const express = require("express");
const router = express.Router();
const multer = require("multer");
const Img = require("../models/img");
const fs = require('fs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    if (!fs.existsSync("./img/" + file.originalname)) {
      cb(null, file.originalname);
    } else {
      return cb('File with this name already exists.');
    }
  },
});

var upload = multer({ storage: storage });

router.get("/list", (req, res, next) => {
  Img.find()
    .then((out) => {
      res.status(200).json(out);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/upload", upload.single("uri"), (req, res, next) => {
  const img = new Img({
    name: req.file.originalname,
  });
  img
    .save()
    .then((out) => {
      res.status(200).json({ output: "Img uploaded successfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
