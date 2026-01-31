const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const transactionModel = require("./models/transactionModel");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://spend-io.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// 1. Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense_tracker_pro";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected to Atlas"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// 2. Auth Routes
// Register
app.post("/api/users/register", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send("User Registered Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).json("Login Failed");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Google OAuth Login/Register
app.post("/api/users/google-auth", async (req, res) => {
  try {
    const { email, name, googleId } = req.body;
    
    // Check if user already exists
    let user = await userModel.findOne({ email });
    
    if (user) {
      // User exists, update googleId if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      res.status(200).send(user);
    } else {
      // Create new user with Google credentials
      const newUser = new userModel({
        name,
        email,
        googleId,
        password: "" // No password for Google users
      });
      await newUser.save();
      res.status(201).send(newUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// 3. Transaction Routes
// Add Transaction
app.post("/api/transactions/add-transaction", async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Transactions (User Specific)
app.post("/api/transactions/get-transaction", async (req, res) => {
  try {
    const transactions = await transactionModel.find({ userid: req.body.userid });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Edit Transaction
app.post("/api/transactions/edit-transaction", async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Transaction Updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Transaction
app.post("/api/transactions/delete-transaction", async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});