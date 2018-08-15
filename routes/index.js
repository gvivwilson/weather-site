/*jshint esversion: 6*/

const general = require("./general");

module.exports = (app) => {
  app.get("/", (req, res) => {
      res.send("Under construction");
  });

  app.use("/general", general);

  // app.get("/*", (req, res) => res.status(404).send("Page not found"));
};
