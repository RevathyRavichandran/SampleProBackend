const express = require("express");
const router = express.Router();
const multer = require("multer");
const Xls = require("../models/xls");
const fs = require('fs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "xls");
  },
  filename: (req, file, cb) => {
    if (!fs.existsSync("./xls/" + file.originalname)) {
      cb(null, file.originalname);
    } else {
      return cb('File with this name already exists.');
    }
  },
});

var upload = multer({ storage: storage });

router.get("/list", (req, res, next) => {
  Xls.find()
    .then((out) => {
      res.status(200).json(out);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/upload", upload.single("uri"), (req, res, next) => {
  const xls = new Xls({
	name: req.file.originalname
  });
  xls
    .save()
    .then((out) => {
      res.status(200).json({ output: "Xls uploaded successfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
