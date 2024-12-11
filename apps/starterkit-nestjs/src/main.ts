import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Server, Cluster } from '@packages/core';

async function bootstrap(): Promise<void> {
  const server: Server = await Server.create(AppModule);
  server.start();
  return;
}

// Start the application in clustering mode.
(async (): Promise<void> => {
  Cluster.register(bootstrap);
})().catch((error: Error) => {
  Logger.error(`Nest application bootstrap error: ${error.message}`);
});
