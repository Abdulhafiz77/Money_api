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
            CREATE OR REPLACE FUNCTION update_money_balance()
            RETURNS TRIGGER AS
            $$
            BEGIN
                IF NEW.type = 'income' THEN
                    UPDATE moneys
                    SET value = value + NEW.value
                    WHERE id = NEW.moneys_id;
                ELSIF NEW.type = 'expense' THEN
                    UPDATE moneys
                    SET value = value - NEW.value
                    WHERE id = NEW.moneys_id;
                END IF;
  
                RETURN NEW;
            END;
            $$
            LANGUAGE plpgsql;
  
            CREATE TRIGGER update_money_balance_after_insert_history
            AFTER INSERT ON history
            FOR EACH ROW
            EXECUTE FUNCTION update_money_balance();
`, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
          DROP TRIGGER IF EXISTS update_money_balance_after_insert_income ON income;
          DROP TRIGGER IF EXISTS update_money_balance_after_insert_expense ON expense;
          DROP FUNCTION IF EXISTS update_money_balance;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};
