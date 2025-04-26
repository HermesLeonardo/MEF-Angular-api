import { db } from '../database/db';

export const findAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

export const findUserById = async (id: number) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows;
};

export const createUser = async (user: any) => {
  const { name, email, password, role } = user;
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role || 'user']
  );
  return result;
};

export const updateUser = async (id: number, user: any) => {
  const { name, email, password, role } = user;
  const [result] = await db.query(
    'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
    [name, email, password, role, id]
  );
  return result;
};

export const deleteUser = async (id: number) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};
