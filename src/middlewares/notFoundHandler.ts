import express, { Request, Response, NextFunction } from "express";
import { CustomError } from "../interface";

const notFoundhandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`not found - ${req.originalUrl}`) as CustomError;
  error.statusCode = 404;
  next(error);
};

export default notFoundhandler;
