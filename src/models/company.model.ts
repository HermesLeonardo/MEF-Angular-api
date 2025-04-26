import { db } from '../database/db';

export const findAllCompanies = async () => {
  const [rows] = await db.query('SELECT * FROM companies');
  return rows;
};

export const findCompanyById = async (id: number) => {
    const [rows]: [any[], any] = await db.query('SELECT * FROM companies WHERE id = ?', [id]);
  return rows[0];
};

export const createCompany = async (company: any) => {
  const {
    name,
    cnpj,
    email,
    phone,
    responsible_name,
    address,
    ativo,
    funci_quanti
  } = company;

  const [result] = await db.query(
    `INSERT INTO companies (name, cnpj, email, phone, responsible_name, address, ativo, funci_quanti) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, cnpj, email, phone, responsible_name, address, ativo, funci_quanti]
  );

  return result;
};

export const updateCompany = async (id: number, company: any) => {
  const {
    name,
    cnpj,
    email,
    phone,
    responsible_name,
    address,
    ativo,
    funci_quanti
  } = company;

  const [result] = await db.query(
    `UPDATE companies SET name = ?, cnpj = ?, email = ?, phone = ?, responsible_name = ?, address = ?, ativo = ?, funci_quanti = ? WHERE id = ?`,
    [name, cnpj, email, phone, responsible_name, address, ativo, funci_quanti, id]
  );

  return result;
};

export const deleteCompany = async (id: number) => {
  const [result] = await db.query('DELETE FROM companies WHERE id = ?', [id]);
  return result;
};
