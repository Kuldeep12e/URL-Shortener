import { Request, Response } from 'express';
import { config } from '../config/env';

const startedAt = Date.now();

export function healthCheck(_req: Request, res: Response) {
  const uptimeMs = Date.now() - startedAt;

  res.status(200).json({
    ok: true,
    version: '1.0',
    uptimeMs,
    env: config.nodeEnv
  });
}
