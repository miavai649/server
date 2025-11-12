import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerNewUser = catchAsync(async (req, res) => {
  const user = await AuthService.registerNewUser(req.body);

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Created Successfully",
    data: user
  });
});

const userLogin = catchAsync(async (req, res) => {
  const user = await AuthService.userLogin(req.body);

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Logged In Successfully",
    data: user
  });
});

export const AuthController = {
  registerNewUser,
  userLogin
};
