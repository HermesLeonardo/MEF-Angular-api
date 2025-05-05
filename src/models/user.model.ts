import { db } from '../database/db';

// Busca todos os usuários
export const findAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

// Busca usuário por ID
export const findUserById = async (id: number) => {
  const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Cria um novo usuário
export const createUser = async (user: any) => {
  const { name, email, password, role, telefone, cpf } = user;
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role, telefone, cpf) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, password, role || 'user', telefone || null, cpf || null]
  );
  return result;
};

// Atualiza um usuário
export const updateUser = async (id: number, user: any) => {
  const { name, email, password, role, telefone, cpf } = user;
  const [result] = await db.query(
    'UPDATE users SET name = ?, email = ?, password = ?, role = ?, telefone = ?, cpf = ? WHERE id = ?',
    [name, email, password, role, telefone, cpf, id]
  );
  return result;
};

// Deleta usuário
export const deleteUser = async (id: number) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};

// Login
export const findUserByEmailAndPassword = async (email: string, password: string) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
  const users = rows as any[];
  return users[0];
};

// Salvar foto de perfil
export const saveUserPhoto = async (id: number, photo: Buffer) => {
  await db.query('UPDATE users SET photo = ? WHERE id = ?', [photo, id]);
};

// Buscar foto do usuário
export const findUserPhoto = async (id: number): Promise<Buffer | null> => {
  const [rows]: any = await db.query('SELECT photo FROM users WHERE id = ?', [id]);
  if (rows.length > 0 && rows[0].photo) {
    return rows[0].photo;
  }
  return null;
};

// Atualiza perfil (sem senha)
export const updateUserProfile = async (id: number, dados: any) => {
  const { name, email, telefone, cpf } = dados;
  const [result] = await db.query(
    'UPDATE users SET name = ?, email = ?, telefone = ?, cpf = ? WHERE id = ?',
    [name, email, telefone, cpf, id]
  );
  return result;
};

// Atualiza senha
export const updateUserPassword = async (
  id: number,
  senhaAtual: string,
  novaSenha: string
): Promise<boolean> => {
  const [rows]: any = await db.query('SELECT password FROM users WHERE id = ?', [id]);

  if (!rows.length || rows[0].password !== senhaAtual) {
    return false;
  }

  await db.query('UPDATE users SET password = ? WHERE id = ?', [novaSenha, id]);
  return true;
};
