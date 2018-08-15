const url = require("url");

module.exports = (req, res, next) => {
  if (typeof req.query.id != "undefined") {
    next();
  } else {
    res.redirect(url.format({
      pathname:"/general",
      query: {
        "city":"Manila, Metropolitan Manila, Philippines",
        "id": 4722
      }
    }));
  }
};
