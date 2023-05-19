import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './router/auth.js';
import placeRouter from './router/c_place.js';
import { sequelize } from './db/database.js';
import { config } from './config.js'
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/place', placeRouter)

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  const server =app.listen(config.host.port);
})