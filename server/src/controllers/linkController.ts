import { Request, Response, NextFunction } from 'express';
import { linkService } from '../services/linkService';

export class LinkController {
  async createLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { targetUrl, code } = req.body;
      const link = await linkService.createLink({ targetUrl, code });
      res.status(201).json(link);
    } catch (err) {
      next(err);
    }
  }

  async listLinks(_req: Request, res: Response, next: NextFunction) {
    try {
      const links = await linkService.listLinks();
      res.json(links);
    } catch (err) {
      next(err);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const link = await linkService.getLinkStats(code);
      res.json(link);
    } catch (err) {
      next(err);
    }
  }

  async deleteLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      await linkService.deleteLink(code);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const link = await linkService.redirect(code);
      // HTTP 302 redirect
      res.redirect(302, link.targetUrl);
    } catch (err) {
      next(err);
    }
  }
}

export const linkController = new LinkController();
