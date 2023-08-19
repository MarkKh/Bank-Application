const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = require("../config/secretKey");

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
                expiresIn: "1h",
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

  app.post("/auth", (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey.secret);
      res.json({ message: "Authentication successful", decoded });
    } catch (err) {
      res
        .status(401)
        .json({ message: "Authentication failed", error: err.message });
    }
  });
  // Read all account records
  app.get("/accounts", (req, res) => {
    connection.query("SELECT * FROM accounts", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single account record
  app.get("/account/:account_id", (req, res) => {
    const accountID = req.params.account_id;

    connection.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      accountID,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "account not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new account record
  app.post("/accounts", (req, res) => {
    const { account_id, name, address, username, password, balance } = req.body;

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

      connection.query("INSERT INTO accounts SET ?", account, (err, result) => {
        if (err) throw err;
        res.status(201).json({
          message: "Account created successfully",
        });
      });
    });
  });

  
}

module.exports = accountRouter;
