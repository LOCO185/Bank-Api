const express = require("express");
const app = express();
const cors = require("cors");

const {
  addUser,
  deposit,
  updateCredit,
  withdrawMoney,
  transferring,
  readUser,
  dataAllUsers,
  filteredUsers,
} = require("./utils.js");

app.use(express.json());
app.use(cors());

app.get("/bankData/", (req, res) => {
  try {
    if (req.query.sorted) {
      const data = filteredUsers();
      console.log(req.query.sorted);
      res.status(200).send(data);
    } else {
      const bankData = dataAllUsers();
      res.status(200).send(bankData);
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get("/bankData/:userId", (req, res) => {
  try {
    const user = readUser(req.params.userId);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/bankData/", (req, res) => {
  try {
    addUser(req.body);
    res.status(200).send(req.body);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/bankData/deposit", (req, res) => {
  try {
    const updatedAccount = deposit(req.body.amount, req.body.id);
    res.status(200).send(updatedAccount);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/bankData/updateCredit", (req, res) => {
  try {
    const updatedAccount = updateCredit(req.body.amount, req.body.id);
    res.status(200).send(updatedAccount);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/bankData/withdraw", (req, res) => {
  try {
    const updatedAccount = withdrawMoney(req.body.amount, req.body.id);
    res.status(200).send(updatedAccount);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/bankData/transferring", (req, res) => {
  try {
    const updatedAccounts = transferring(
      req.body.transferId,
      req.body.receiverId,
      req.body.amount
    );
    res.status(200).send(updatedAccounts);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("listening..");
});
