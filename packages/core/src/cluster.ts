import { Injectable, Logger } from '@nestjs/common';
import * as _cluster from 'cluster';
const cluster: any = _cluster as unknown as _cluster.Cluster; // typings fix
import * as os from 'os';

const numCPUs = os.cpus().length;

@Injectable()
export class Cluster {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static register(callback: Function): void {
    if (cluster.isPrimary && process.env.NODE_ENV != 'development') {
      Logger.log(`Master server started on ${process.pid}`);

      //ensure workers exit cleanly
      process.on('SIGINT', () => {
        Logger.log('Cluster shutting down...');
        for (const id in cluster.workers) {
          cluster.workers[id].kill();
        }
        // exit the master process
        process.exit(0);
      });

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cluster.on('exit', (worker: any) => {
        Logger.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      Logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
