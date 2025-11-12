import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { AuthRoutes } from "./modules/auth/auth.route";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers 👋!!!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
