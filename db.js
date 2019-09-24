const conf = require("config");
const debug = require("debug")("app:db");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: conf.get("db.host"),
    user: conf.get("db.user"),
    password: conf.get("db.password"),
    database: conf.get("db.database")
  }
});

debug(`Connecting to ${conf.get("db.database")} at ${conf.get("db.host")}`);

module.exports = knex;
