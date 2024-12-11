import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/**
 * BaseProducer provides a generic implementation for sending messages to a message broker.
 */
export class BaseProducer {
  constructor(private readonly clientProxy: ClientProxy) {}

  /**
   * Sends data to a message broker using the specified pattern.
   * @param pattern The pattern or routing key for the message.
   * @param data The payload to send.
   * @returns An Observable of the response.
   */
  emit<TResult, TInput>(pattern: string, data: TInput): Observable<TResult> {
    return this.clientProxy.emit<TResult, TInput>(pattern, data);
  }

  send<TResult, TInput>(pattern: string, data: TInput): Observable<TResult> {
    return this.clientProxy.send<TResult, TInput>(pattern, data);
  }
}