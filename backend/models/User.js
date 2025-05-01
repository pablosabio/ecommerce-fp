import { Schema, model } from "mongoose";
import { addressSchema } from "./addressSchema.js";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide your first name!"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide your last name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address!"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profile_avatar: {
      type: String,
      default() {
        return `https://robohash.org/${this.last_name}`;
      },
    },
    address: {
      type: addressSchema,
      required: false,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const UsersModel = model("User", userSchema);
export default UsersModel;
