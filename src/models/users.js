const { date } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id : { type: String, required: true },
    name: { type: String, default: null },
    username: { type: String, unique: true },
    password: { type: String },
    lastLoginDate: { type: Date },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    roles: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);