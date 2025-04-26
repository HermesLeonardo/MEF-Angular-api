import { Router } from 'express';
import * as fileController from '../controllers/companyFile.controller';

const router = Router();

router.get('/', fileController.getAllFiles);
router.get('/:id', fileController.getFileById);
router.get('/company/:companyId', fileController.getFilesByCompany);
router.post('/', fileController.createFile);
router.put('/:id', fileController.updateFile);
router.delete('/:id', fileController.deleteFile);

export default router;
