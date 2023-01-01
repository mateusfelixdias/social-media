import { verify } from '../jwt';
import { NextFunction, Request, Response } from 'express';

export const checkToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { headers } = request;
    const { authorization } = headers;
    if (!authorization) return response.status(401).end();

    const [, token] = authorization.split(' ');

    const isValid = await verify(token);
    if (!isValid) response.status(401).end();

    request.body = { ...request.body, isValid };
    return next();
  } catch (error) {
    return response.status(401).end();
  }
};
