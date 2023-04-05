/**
 * errorHandler.ts: middleware responsável por capturar erros lançados pela 
 * aplicação e formatá-los adequadamente antes de enviá-los como resposta para o cliente.
 */
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') console.error(err);

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
