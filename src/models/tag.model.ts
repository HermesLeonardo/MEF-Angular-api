import { db } from '../database/db';

export const findAllTags = async () => {
  const [rows]: any = await db.query('SELECT * FROM tags');
  return rows;
};

export const findTagById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM tags WHERE id = ?', [id]);
  return rows[0];
};

export const createTag = async (tag: any) => {
  const { name, color } = tag;

  const [result]: any = await db.query(
    `INSERT INTO tags (name, color) VALUES (?, ?)`,
    [name, color]
  );

  return result;
};

export const updateTag = async (id: number, tag: any) => {
  const { name, color } = tag;

  const [result]: any = await db.query(
    `UPDATE tags SET name = ?, color = ? WHERE id = ?`,
    [name, color, id]
  );

  return result;
};

export const deleteTag = async (id: number) => {
  const [result]: any = await db.query('DELETE FROM tags WHERE id = ?', [id]);
  return result;
};
