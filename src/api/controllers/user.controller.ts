import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../database/models/User";

/**
 * UserController: responsável por lidar com as requisições relacionadas ao usuário, como criação, autenticação e atualização de dados.
 * @param req 
 * @param res 
 * @returns 
 */

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Usuário já existe" });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 12);

    // Cria um novo usuário
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário existe no banco de dados
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // Verifica se a senha do usuário está correta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Cria um token de autenticação
    const token = jwt.sign(
      { username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { newPassword } = req.body;

    // Verifica se o usuário existe no banco de dados
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Hash da nova senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualiza a senha do usuário
    await User.updateOne(
      { username },
      { password: hashedPassword },
      { runValidators: true }
    );

    res.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export { createUser, loginUser, updateUser };
