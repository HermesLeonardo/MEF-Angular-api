import { Request, Response } from 'express';
import * as fileModel from '../models/companyFile.model';

export const getAllFiles = async (_: Request, res: Response) => {
  const files = await fileModel.findAllFiles();
  res.json(files);
};

export const getFileById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const file = await fileModel.findFileById(id);
  res.json(file);
};

export const getFilesByCompany = async (req: Request, res: Response) => {
  const companyId = Number(req.params.companyId);
  const files = await fileModel.findFilesByCompanyId(companyId);
  res.json(files);
};

export const createFile = async (req: Request, res: Response) => {
  const result = await fileModel.createFile(req.body);
  res.status(201).json(result);
};

export const updateFile = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await fileModel.updateFile(id, req.body);
  res.json(result);
};

export const deleteFile = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await fileModel.deleteFile(id);
  res.json(result);
};
