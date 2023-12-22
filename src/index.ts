import express, { Request, Response, Application, NextFunction } from "express";
import errorHandler from "./middlewares/errorHandler";
import notFoundhandler from "./middlewares/notFoundHandler";
import dotenv from "dotenv";
import { CustomError } from "./interface";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3005;

app.use(cors());
app.use(express.json());

//auth check here

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "this works" });
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("test different error type") as CustomError;
  error.statusCode = 400;
  next(error);
});

//routes

// error handling
app.use(notFoundhandler);
app.use(errorHandler);

app
  .listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  })
  .on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });

export default app;
