const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    emailId: String,
    amount: Number,
});

module.exports = mongoose.model("order", orderSchema);