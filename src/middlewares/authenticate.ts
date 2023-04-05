import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import jwtconfig from '../../config/jwt';
/**
 * authenticate.ts: middleware responsável por realizar a autenticação dos usuários, 
 * verificando se o token de autenticação está presente nos cabeçalhos da requisição e se ele é válido.
 */
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) throw new Error('Token not found');

    const decoded = jwt.verify(token, jwtconfig.secret);

    // adiciona o id do usuário na requisição
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;
