import { Router } from 'express';
import * as logController from '../controllers/fileAccessLog.controller';

const router = Router();

router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLogById);
router.get('/file/:fileId', logController.getLogsByFile);
router.post('/', logController.createLog);
router.delete('/:id', logController.deleteLog);

export default router;
