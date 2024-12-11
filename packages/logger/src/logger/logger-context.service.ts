import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface RequestContext {
  userId?: string;
  requestId?: string;
}

@Injectable()
export class LoggerContextService {
  private readonly asyncLocalStorage: AsyncLocalStorage<RequestContext>;

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
  }

  run(context: RequestContext, callback: () => void): void {
    this.asyncLocalStorage.run(context, callback);
  }

  getContext(): RequestContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  setContext(context: RequestContext): void {
    const store = this.asyncLocalStorage.getStore() || {};
    Object.assign(store, context);
  }
}
