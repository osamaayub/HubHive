import mongoose from "mongoose";
import { hashPassword, createToken, comparePassword } from "../utils";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
  , password: {
    type: String,
    required: true
  }
  , phoneNumber: {
    type: Number
  },
  address: [
    {
      country: {
        type: String,
        required: true
      }
      , city: {
        type: String,
        required: true
      }
      , homeAddress: {
        type: String,
        required: true
      }
      , zipCode: {
        type: String,
        required: true
      },
      addressType: {
        type: String
      }
    },
  ],
  role: {
    type: String,
    default: "user"
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  resetPasswordToken: String,
  resetPasswordTime: String

}, { timestamps: true });
userSchema.pre("save", async (next) => {

  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashPassword(this.password);

});

userSchema.methods.createToken = function () {
  return createToken({ id: this._id });
}
//compare password with hash password in the document
userSchema.methods.comparePassword = async function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);

}

export const User = mongoose.model("User", userSchema);