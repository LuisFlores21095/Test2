const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res, next) => {
  sql =
    "select cid, DATE_FORMAT(date_added, '%d-%b-%y %H:%m:%s') as date_added, project_title, username  FROM ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id =ilance_users.user_id;";

  db.query(sql, function (err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

module.exports = router;
