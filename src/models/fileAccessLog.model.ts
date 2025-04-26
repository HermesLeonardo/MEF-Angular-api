import { db } from '../database/db';

export const findAllLogs = async () => {
  const [rows]: any = await db.query('SELECT * FROM file_access_logs');
  return rows;
};

export const findLogById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM file_access_logs WHERE id = ?', [id]);
  return rows[0];
};

export const findLogsByFile = async (fileId: number) => {
  const [rows]: any = await db.query('SELECT * FROM file_access_logs WHERE file_id = ?', [fileId]);
  return rows;
};

export const createLog = async (log: any) => {
  const { file_id, user_id, access_type } = log;

  const [result]: any = await db.query(
    `INSERT INTO file_access_logs (file_id, user_id, access_type) VALUES (?, ?, ?)`,
    [file_id, user_id, access_type]
  );

  return result;
};

export const deleteLog = async (id: number) => {
  const [result]: any = await db.query('DELETE FROM file_access_logs WHERE id = ?', [id]);
  return result;
};
