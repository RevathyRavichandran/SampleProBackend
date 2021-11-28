const express = require("express");
const router = express.Router();
const multer = require("multer");
const Xls = require("../models/xls");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "xls");
  },
  filename: (req, file, cb) => {
    cb(null, req.name + '.xlsx');
  },
});

var upload = multer({ storage: storage });

router.get("/list", (req, res, next) => {
	Xls.find().then((out) => {
		res.status(200).json(out);
	}).catch((err) => {
		res.status(400).json(err);
	})
})

router.post("/upload", upload.single("uri"), (req, res, next) => {
	const xls = new Xls(req.body);
	xls.save().then((out) => {
		res.status(200).json({ "output": "Xls uploaded successfully." });
	}).catch((err) => {
		res.status(400).json(err);
	})
});

module.exports = router;
