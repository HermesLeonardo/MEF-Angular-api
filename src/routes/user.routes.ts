import { Router } from 'express';
import { Request, Response } from 'express';

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  uploadUserPhoto,
  getUserPhoto,
  getProfile,
  updateProfile,
  updatePassword,
  deleteProfile
} from '../controllers/user.controller';
import { upload } from '../config/upload-config';

const router = Router();

// CRUD padrão
router.get('/', getAllUsers);
router.get('/:id', getUserById as any);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Rotas para a tela de perfil (usuário logado)
router.get('/me/profile', getProfile);
router.put('/me/profile', updateProfile);
router.put('/me/password', updatePassword);
router.delete('/me', deleteProfile);

// Login
router.post('/login', loginUser);

// Foto de perfil
router.post('/:id/photo', upload.single('photo'), uploadUserPhoto);
router.get('/:id/photo', getUserPhoto);

export default router;
