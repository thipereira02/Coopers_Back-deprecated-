import express from 'express';
import cors from 'cors';

import usersRoutes from './routers/usersRoutes';
import tasksRoutes from './routers/tasksRoutes';
import contactRoutes from './routers/contactRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRoutes);
app.use(tasksRoutes);
app.use(contactRoutes);

export default app;