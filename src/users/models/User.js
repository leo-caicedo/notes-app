const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// encrypt password
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(6);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.validatePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = model("User", userSchema);
