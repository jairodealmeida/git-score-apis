import { Request, Response, NextFunction } from 'express';
/**
 * authorize.ts: middleware responsável por autorizar o acesso a determinadas rotas 
 * com base no tipo de usuário. 
 * Recebe como parâmetro um array com as permissões necessárias para acessar a rota.
 * @param permissions 
 * @returns 
 */
const authorize = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = req.userType;

    if (!permissions.includes(userType)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  };
};

export default authorize;
