import { Request, Response } from 'express';
import * as tagModel from '../models/tag.model';

export const getAllTags = async (_: Request, res: Response) => {
  const tags = await tagModel.findAllTags();
  res.json(tags);
};

export const getTagById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tag = await tagModel.findTagById(id);
  res.json(tag);
};

export const createTag = async (req: Request, res: Response) => {
  const result = await tagModel.createTag(req.body);
  res.status(201).json(result);
};

export const updateTag = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await tagModel.updateTag(id, req.body);
  res.json(result);
};

export const deleteTag = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await tagModel.deleteTag(id);
  res.json(result);
};
