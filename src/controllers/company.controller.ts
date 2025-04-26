import { Request, Response } from 'express';
import * as companyModel from '../models/company.model';

export const getAllCompanies = async (_: Request, res: Response) => {
  const companies = await companyModel.findAllCompanies();
  res.json(companies);
};

export const getCompanyById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const company = await companyModel.findCompanyById(id);
  res.json(company);
};

export const createCompany = async (req: Request, res: Response) => {
  const result = await companyModel.createCompany(req.body);
  res.status(201).json(result);
};

export const updateCompany = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await companyModel.updateCompany(id, req.body);
  res.json(result);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await companyModel.deleteCompany(id);
  res.json(result);
};
