const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userid: { type: String, required: true }, // Link transaction to user
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, enum: ['online', 'offline'], default: 'offline' }, // Payment method
  reference: { type: String },
  description: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("transactions", transactionSchema);