const express     = require("express"),
      app         = express(),
      mountRoutes = require("./routes");

app.use(express.static("public"));
app.set("view engine", "ejs");

mountRoutes(app);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Oops, something went wrong!");
});

app.listen(8080, function() {
    console.log("Server is running... Listening at port 8080");
});
