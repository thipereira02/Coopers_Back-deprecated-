import express from 'express';
import cors from 'cors';

import usersRoutes from './routers/usersRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRoutes)

//POST SIGNUP
//POST SIGNIN
//POST TASKS/:ID
//GET TASKS/:ID
//LOGOUT

export default app;