const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = require("../config/secretKey");
const verifyToken = require("../middleware/verifyToken");

function accountRouter(app, connection) {
  //login
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const account = result[0];

        bcrypt.compare(password, account.password, (err, isMatch) => {
          if (err) {
            console.error("Password comparison error:", err);
            return res
              .status(500)
              .json({ message: "Password comparison error" });
          }

          if (isMatch) {
            const token = jwt.sign(
              { id: account.account_id },
              secretKey.secret,
              {
                expiresIn: "3h",
              }
            );
            res.json({ message: "Login successful", token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        });
      }
    );
  });

  // Read all account records
  app.get("/accounts", (req, res) => {
    connection.query("SELECT * FROM accounts", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.get("/account", verifyToken, (req, res) => {
    const userId = req.userId;

    connection.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      [userId],
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.post("/accounts", (req, res) => {
    const { account_id, name, address, username, password, balance } = req.body;

    // Check if the provided account_id already exists
    connection.query(
      "SELECT COUNT(*) AS count FROM accounts WHERE account_id = ?",
      [account_id],
      (err, result) => {
        if (err) throw err;

        if (result[0].count > 0) {
          res.status(400).json({
            message: "Account with the provided account_id already exists",
          });
          return;
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) throw err;

          const account = {
            account_id,
            name,
            address,
            username,
            password: hashedPassword,
            balance,
          };

          connection.query(
            "INSERT INTO accounts SET ?",
            account,
            (err, result) => {
              if (err) throw err;
              res.status(201).json({
                message: "Account created successfully",
              });
            }
          );
        });
      }
    );
  });
}

module.exports = accountRouter;
