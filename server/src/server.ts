import app from './app';
import { config } from './config/env';
import { initDb } from './config/db';

async function start() {
  try {
    await initDb();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
