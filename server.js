const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { animals } = require("./data/animals");
//instantiated the server - allows us to chain chain methods to the Express.js server
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static("public"));
//parse incoming string to array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//app.listen() returns an http.Server object
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
