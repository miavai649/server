import { TUserLogin, TUserRegistration } from "./auth.interface";
import { User } from "./auth.model";

const registerNewUser = async (payload: TUserRegistration) => {
  // check if the email is already registered or not
  const user = await User.isUserAlreadyExist(payload.email);

  if (user) {
    throw new Error("User already exists");
  }

  const newUser = await User.create(payload);

  return newUser;
};

const userLogin = async (payload: TUserLogin) => {
  const user = await User.isUserAlreadyExist(payload.email);

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordMatched = await user.comparePassword(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  return {
    name: user.name,
    email: user.email,
    _id: user._id
  };
};

export const AuthService = {
  registerNewUser,
  userLogin
};
