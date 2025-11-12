import { Model } from "mongoose";

export type TUserRegistration = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface IAuthService extends Model<TUserRegistration> {
  isUserAlreadyExist(email: string): Promise<TUserRegistration | null>;
}
