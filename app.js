const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imgRoutes = require("./routes/img");
const xlsRoutes = require("./routes/xls");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://revathy-ravichandran:meenuswathi@cluster0.wnu1h.mongodb.net/project-int?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/img", imgRoutes);
app.use("/api/xls", xlsRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
