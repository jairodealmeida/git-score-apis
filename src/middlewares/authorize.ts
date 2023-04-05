import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user.roles; // Supondo que as roles do usuário autenticado estão no objeto req.user.roles

    const authorized = roles.some(role => userRoles.includes(role));

    if (!authorized) {
      return res.status(401).json({ message: 'Usuário não autorizado.' });
    }

    next();
  };
};
