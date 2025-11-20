import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}
