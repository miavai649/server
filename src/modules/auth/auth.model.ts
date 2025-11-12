import { model, Schema } from "mongoose";
import { IAuthService, TUserRegistration } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUserRegistration>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// hashing password before saving the user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

// after saving the user sending empty password field
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserAlreadyExist = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.methods.comparePassword = async function (plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUserRegistration, IAuthService>("User", userSchema);
