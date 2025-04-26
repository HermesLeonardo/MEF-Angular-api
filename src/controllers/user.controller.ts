import { Request, Response } from 'express';
import * as userModel from '../models/user.model';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userModel.findAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userModel.findUserById(id);
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const result = await userModel.createUser(req.body);
  res.status(201).json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userModel.updateUser(id, req.body);
  res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userModel.deleteUser(id);
  res.json(result);
};
