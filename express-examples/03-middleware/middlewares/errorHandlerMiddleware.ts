import { Request, Response, NextFunction } from "express";
export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({ message: error.message });
}
