import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { errorHandler } from './errors/errorHandler';
import apiRoutes from './routes/linkRoutes';
import healthRoutes from './routes/healthRoutes';
import { linkController } from './controllers/linkController';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health
app.use('/', healthRoutes);

// API base
app.use('/api', apiRoutes);

// Redirect route: /:code
// IMPORTANT: Keep this AFTER /healthz and /api so they don't get captured.
app.get('/:code', (req, res, next) =>
  linkController.redirect(req, res, next)
);

// Error handler
app.use(errorHandler);

export default app;
