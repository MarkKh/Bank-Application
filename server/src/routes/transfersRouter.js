const verifyToken = require("../middleware/verifyToken");

function transfersRouter(app, connection) {
  // Get all transfers with sender and receiver names
  app.get("/transfers", verifyToken, (req, res) => {
    const userId = req.userId; // Assume you extract user id from token

    connection.query(
      "SELECT t.*, s.name AS sender_name, r.name AS receiver_name FROM transfers t " +
        "JOIN accounts s ON t.sender_account_id = s.account_id " +
        "JOIN accounts r ON t.receiver_account_id = r.account_id " +
        "WHERE t.sender_account_id = ? OR t.receiver_account_id = ?",
      [userId, userId],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.json(results);
      }
    );
  });

  app.post("/transfer", verifyToken, (req, res) => {
    const senderId = req.userId;
    const { receiver_account_id, amount } = req.body;

    connection.query(
      "SELECT balance FROM accounts WHERE account_id = ?",
      senderId,
      (err, senderResult) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        const senderBalance = senderResult[0].balance;

        if (senderBalance < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        // Calculate sender_remain
        const sender_remain = senderBalance - amount;

        connection.query(
          "SELECT balance FROM accounts WHERE account_id = ?",
          receiver_account_id,
          (receiverErr, receiverResult) => {
            if (receiverErr) {
              console.error("Database error:", receiverErr);
              return res.status(500).json({ message: "Database error" });
            }

            const receiverBalance = receiverResult[0].balance;

            // Calculate receiver_remain
            const receiver_remain = receiverBalance + amount;

            connection.query(
              "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
              [amount, senderId],
              (updateErr) => {
                if (updateErr) {
                  console.error("Update error:", updateErr);
                  return res.status(500).json({ message: "Update error" });
                }

                connection.query(
                  "UPDATE accounts SET balance = balance + ? WHERE account_id = ?",
                  [amount, receiver_account_id],
                  (receiverUpdateErr) => {
                    if (receiverUpdateErr) {
                      console.error(
                        "Receiver update error:",
                        receiverUpdateErr
                      );
                      return res
                        .status(500)
                        .json({ message: "Receiver update error" });
                    }

                    const transferRecord = {
                      sender_account_id: senderId,
                      receiver_account_id,
                      amount,
                      sender_remain,
                      receiver_remain,
                      timestamp: new Date(),
                    };

                    connection.query(
                      "INSERT INTO transfers SET ?",
                      transferRecord,
                      (transferErr) => {
                        if (transferErr) {
                          console.error("Transfer error:", transferErr);
                          return res
                            .status(500)
                            .json({ message: "Transfer error" });
                        }

                        res.json({ message: "Transfer successful" });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
}

module.exports = transfersRouter;
