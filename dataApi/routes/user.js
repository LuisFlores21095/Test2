const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/", (req, res, next) => {
  let sql =
    "SELECT EXISTS( SELECT * FROM ilance_users WHERE username='" +
    req.body.username +
    "') as truth;";
  db.query(sql, function (err, result) {
    if (err) {
      return next(err);
    }

    if (result[0].truth) {
      next();
    } else {
      err = new Error("Email not found");
      err.status = 400;
      return next(err);
    }
  });
});
router.post("/", (req, res, next) => {
  var crypto = require("crypto");
  var hash = crypto.createHash("md5").update(req.body.password).digest("hex");
  let sql =
    "SELECT EXISTS( SELECT * FROM ilance_users WHERE username='" +
    req.body.username +
    "'and ilance_users.password='" +
    hash +
    "') as truth;";
  booleanUser = db.query(sql, function (err, result) {
    if (err) {
      return next(err);
    }

    if (result[0].truth) {
      res.status(200).send("Successful login");
    } else {
      err = new Error("Wrong Password");
      err.status = 400;
      return next(err);
    }
  });
});

module.exports = router;
