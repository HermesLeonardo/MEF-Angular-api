import { Request, Response } from 'express';
import * as userModel from '../models/user.model';

// Lista todos os usuários
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userModel.findAllUsers();
  res.json(users);
};

// Busca usuário por ID
export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const user = await userModel.findUserById(id);
  res.json(user);
};

// Cria novo usuário
export const createUser = async (req: Request, res: Response) => {
  const result = await userModel.createUser(req.body);
  const { password, ...userWithoutPassword } = req.body;
  res.status(201).json(userWithoutPassword);
};

// Atualiza um usuário (admin ou uso geral)
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userModel.updateUser(id, req.body);
  res.json(result);
};

// Deleta usuário (admin ou uso geral)
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userModel.deleteUser(id);
  res.json(result);
};

// Login do usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    return;
  }

  try {
    const user = await userModel.findUserByEmailAndPassword(email, password);

    if (!user) {
      res.status(401).json({ message: 'Credenciais inválidas.' });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao tentar fazer login.' });
  }
};

// Upload da foto de perfil
export const uploadUserPhoto = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const photo = req.file?.buffer;

  if (!photo) {
    res.status(400).json({ message: 'Imagem não enviada.' });
    return;
  }

  try {
    await userModel.saveUserPhoto(id, photo);
    res.status(200).json({ message: 'Foto atualizada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar foto.' });
  }
};

// Busca foto do usuário
export const getUserPhoto = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const photo = await userModel.findUserPhoto(id);
    if (!photo) {
      res.status(404).send('Foto não encontrada.');
      return;
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(photo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar foto.' });
  }
};

// =========================
// PERFIL DO USUÁRIO LOGADO
// =========================

// Simula ID do usuário autenticado com header 'x-user-id'
const getUserIdFromRequest = (req: Request): number => {
  return Number(req.headers['x-user-id']);
};

// Retorna os dados do perfil do usuário logado
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const id = getUserIdFromRequest(req);

  try {
    const user = await userModel.findUserById(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }


    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch {
    res.status(500).json({ message: 'Erro ao obter perfil' });
  }
};

// Atualiza os dados de perfil (exceto senha)
export const updateProfile = async (req: Request, res: Response) => {
  const id = getUserIdFromRequest(req);
  const dados = req.body;

  try {
    await userModel.updateUserProfile(id, dados);
    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};

// Atualiza a senha do usuário logado
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const id = getUserIdFromRequest(req);
  const { senhaAtual, novaSenha } = req.body;

  if (!senhaAtual || !novaSenha) {
    res.status(400).json({ message: 'Dados inválidos' });
    return;
  }

  try {
    const success = await userModel.updateUserPassword(id, senhaAtual, novaSenha);
    if (!success) {
      res.status(401).json({ message: 'Senha atual incorreta' });
      return;
    }
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar senha' });
  }
};

// Exclui a conta do usuário logado
export const deleteProfile = async (req: Request, res: Response) => {
  const id = getUserIdFromRequest(req);

  try {
    await userModel.deleteUser(id);
    res.json({ message: 'Conta excluída com sucesso' });
  } catch {
    res.status(500).json({ message: 'Erro ao excluir conta' });
  }
};
