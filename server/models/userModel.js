const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const user = new schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
  },
  { timestamps: true }
);

// Hash user's password with salt before saving document to db
user.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// Extend matchPassword function unto the baseUserSchema
user.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("Users", user);

module.exports = User;
