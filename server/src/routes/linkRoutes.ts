import { Router } from 'express';
import { linkController } from '../controllers/linkController';

const router = Router();

// API endpoints
router.post('/links', (req, res, next) => linkController.createLink(req, res, next));
router.get('/links', (req, res, next) => linkController.listLinks(req, res, next));
router.get('/links/:code', (req, res, next) => linkController.getStats(req, res, next));
router.delete('/links/:code', (req, res, next) => linkController.deleteLink(req, res, next));

export default router;
