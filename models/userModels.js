const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxlength: [50, "Email cannot be more than 50 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      trim: true,
      maxlength: [50, "Contact cannot be more than 50 characters"],
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);