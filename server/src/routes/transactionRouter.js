const verifyToken = require("../middleware/verifyToken");

function transactionRouter(app, connection) {

  app.get("/transactions", verifyToken, (req, res) => {
    const userId = req.userId;

    connection.query(
      "SELECT * FROM transactions WHERE account_id = ?",
      userId,
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  });
  // Deposit route with token verification
  app.post("/deposit", verifyToken, (req, res) => {
    const userId = req.userId;
    const { amount } = req.body;

    connection.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      userId,
      (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        const newBalance = user.balance + parseFloat(amount);

        // Insert deposit transaction into the transactions table
        const depositTransaction = {
          account_id: user.account_id,
          transaction_type: "Deposit",
          amount: parseFloat(amount),
        };

        // Update balance in accounts table
        connection.query(
          "UPDATE accounts SET balance = ? WHERE account_id = ?",
          [newBalance, user.account_id],
          (err, result) => {
            if (err) throw err;

            // Insert transaction record
            connection.query(
              "INSERT INTO transactions SET ?",
              depositTransaction,
              (err, result) => {
                if (err) throw err;
                res.json({ message: "Deposit successful", newBalance });
              }
            );
          }
        );
      }
    );
  });

  app.post("/withdrawal", verifyToken, (req, res) => {
    const userId = req.userId;
    const { amount } = req.body;

    connection.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      userId,
      (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        if (user.balance < parseFloat(amount)) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        const newBalance = user.balance - parseFloat(amount);

        // Insert withdrawal transaction into the transactions table
        const withdrawalTransaction = {
          account_id: user.account_id,
          transaction_type: "Withdrawal",
          amount: parseFloat(amount),
        };

        // Update balance in accounts table
        connection.query(
          "UPDATE accounts SET balance = ? WHERE account_id = ?",
          [newBalance, user.account_id],
          (err, result) => {
            if (err) throw err;

            // Insert transaction record
            connection.query(
              "INSERT INTO transactions SET ?",
              withdrawalTransaction,
              (err, result) => {
                if (err) throw err;
                res.json({ message: "Withdrawal successful", newBalance });
              }
            );
          }
        );
      }
    );
  });
}

module.exports = transactionRouter;
