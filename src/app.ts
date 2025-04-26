import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import companyRoutes from './routes/company.routes';
import companyFileRoutes from './routes/companyFile.routes';
import fileAccessRoutes from './routes/fileAccessLog.routes';
import tagROutes from './routes/tag.routes';



dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/company-files', companyFileRoutes);
app.use('/file-access', fileAccessRoutes);
app.use('/tags', tagROutes);

export default app;
