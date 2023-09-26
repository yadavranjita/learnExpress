const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    name: {
      type: String,
      // required: [true, "Email is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
   
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxlength: [50, "Email cannot be more than 50 characters"],
    },
   
    password:{
       type: String,
    },
    fname:{
      type: String,
   },
  
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
   
    contact: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    }
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);