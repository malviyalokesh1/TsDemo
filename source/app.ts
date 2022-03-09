/** source/server.ts */
import express, { Express } from 'express';
import routes from './routes/user';

const app: Express = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

/** Routes */
app.use('/', routes);

export default app;