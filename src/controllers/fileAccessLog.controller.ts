import { Request, Response } from 'express';
import * as logModel from '../models/fileAccessLog.model';

export const getAllLogs = async (_: Request, res: Response) => {
  const logs = await logModel.findAllLogs();
  res.json(logs);
};

export const getLogById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const log = await logModel.findLogById(id);
  res.json(log);
};

export const getLogsByFile = async (req: Request, res: Response) => {
  const fileId = Number(req.params.fileId);
  const logs = await logModel.findLogsByFile(fileId);
  res.json(logs);
};

export const createLog = async (req: Request, res: Response) => {
  const result = await logModel.createLog(req.body);
  res.status(201).json(result);
};

export const deleteLog = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await logModel.deleteLog(id);
  res.json(result);
};
