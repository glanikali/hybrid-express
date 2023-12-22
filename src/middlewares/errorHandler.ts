import express, { Request, Response, NextFunction } from "express";
import { CustomError } from "../interface";
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: err.statusCode,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export default errorHandler;
