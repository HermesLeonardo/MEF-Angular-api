import { db } from '../database/db';

export const findAllFiles = async () => {
  const [rows]: any = await db.query('SELECT * FROM company_files');
  return rows;
};

export const findFileById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM company_files WHERE id = ?', [id]);
  return rows[0];
};

export const findFilesByCompanyId = async (companyId: number) => {
  const [rows]: any = await db.query('SELECT * FROM company_files WHERE company_id = ?', [companyId]);
  return rows;
};

export const createFile = async (file: any) => {
  const {
    company_id,
    file_name,
    file_type,
    file_size,
    file_url,
    status,
    tag_id
  } = file;

  const [result]: any = await db.query(
    `INSERT INTO company_files (company_id, file_name, file_type, file_size, file_url, status, tag_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [company_id, file_name, file_type, file_size, file_url, status || 'active', tag_id]
  );

  return result;
};

export const updateFile = async (id: number, file: any) => {
  const {
    company_id,
    file_name,
    file_type,
    file_size,
    file_url,
    status,
    tag_id
  } = file;

  const [result]: any = await db.query(
    `UPDATE company_files SET company_id = ?, file_name = ?, file_type = ?, file_size = ?, file_url = ?, status = ?, tag_id = ? WHERE id = ?`,
    [company_id, file_name, file_type, file_size, file_url, status, tag_id, id]
  );

  return result;
};

export const deleteFile = async (id: number) => {
  const [result]: any = await db.query('DELETE FROM company_files WHERE id = ?', [id]);
  return result;
};
