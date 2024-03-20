'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`
    CREATE TABLE IF NOT EXISTS public.users (
      id                SERIAL PRIMARY KEY,
      first_name        VARCHAR(50) NOT NULL,
      last_name         VARCHAR(50) NOT NULL,
      middle_name       VARCHAR(50) DEFAULT NULL,
      email             VARCHAR(50) NOT NULL,
      password          VARCHAR(255) NOT NULL,
      phone             VARCHAR(50) NOT NULL,
      status            INTEGER DEFAULT 10,
      created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_users_phone UNIQUE (phone)
  );
  CREATE TABLE IF NOT EXISTS public.moneys (
    id                SERIAL PRIMARY KEY,
    type_of           VARCHAR(50) NOT NULL,
    users_id          INTEGER NOT NULL,
    CONSTRAINT users_id FOREIGN KEY (users_id) REFERENCES public.users (id),
    value             INTEGER NOT NULL,
    status            INTEGER DEFAULT 10,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS public.expense (
  id                SERIAL PRIMARY KEY,
  spend             INTEGER NOT NULL,
  moneys_id         INTEGER NOT NULL,
  CONSTRAINT moneys_expense_id FOREIGN KEY (moneys_id) REFERENCES public.moneys (id),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status            INTEGER DEFAULT 10
);
CREATE TABLE IF NOT EXISTS public.income (
  id                SERIAL PRIMARY KEY,
  save              INTEGER NOT NULL,
  moneys_id         INTEGER NOT NULL,
  CONSTRAINT moneys_income_id FOREIGN KEY (moneys_id) REFERENCES public.moneys (id),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status            INTEGER DEFAULT 10
);
`, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS moneys;
          DROP TABLE IF EXISTS expense;
          DROP TABLE IF EXISTS income;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};
