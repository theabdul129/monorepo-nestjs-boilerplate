import { Logger } from '@nestjs/common';
import Axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';

export class HttpService {
  private logger: Logger;
  private instance: AxiosInstance;

  constructor(name: string, config: AxiosRequestConfig) {
    this.logger = new Logger(name);
    this.instance = Axios.create(config);
     // Add request interceptor for logging
    this.instance.interceptors.request.use(
      (config: any) => {
        this.logger.log(
          `Request [${name}]: ${config.method?.toUpperCase()} ${config.url}`,
          'RequestInterceptor',
        );
        return config;
      },
      (error: any) => {
        this.logger.error(
          `Request error [${name}]: ${error.message}`,
          'RequestInterceptor',
        );
        return Promise.reject(error);
      },
    );

    // Add response interceptor for logging
    this.instance.interceptors.response.use(
      (response: any) => {
        this.logger.log(
          `Response [${name}]: ${response.status} ${response.statusText}`,
          'ResponseInterceptor',
        );
        return response;
      },
      (error: any) => {
        if (error.response) {
          this.logger.error(
            `Response error [${name}]: ${error.response.status} ${error.response.statusText}`,
            'ResponseInterceptor',
          );
        } else {
          this.logger.error(
            `Response error [${name}]: ${error.message}`,
            'ResponseInterceptor',
          );
        }
        return Promise.reject(error);
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.request, config);
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.get, url, config);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.delete, url, config);
  }

  head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.head, url, config);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.post, url, data, config);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.put, url, data, config);
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.patch, url, data, config);
  }

  get axiosRef(): AxiosInstance {
    return this.instance;
  }

  protected async makeRequest<T>(
    axios: (...args: any[]) => AxiosPromise<T>,
    ...args: any[]
  ): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = { ...(args[args.length - 1] || {}) };
  
    let cancelSource: CancelTokenSource | null = null;
  
    try {
      // Set up cancel token if not provided
      if (!config.cancelToken) {
        cancelSource = Axios.CancelToken.source();
        config.cancelToken = cancelSource.token;
      }
  
      // Perform the axios request and return the response
      const response = await axios(...args);
      return response;
    } catch (error: any) {
      // Handle cancellation or other errors and rethrow
      if (Axios.isCancel(error)) {
        console.error('Request was cancelled:', error.message);
      } else {
        console.error('Error during request:', error.message);
      }
      throw error; // Rethrow the error for the calling code to handle
    } finally {
      // Optionally handle cleanup or additional logic here
      if (config.responseType !== 'stream' && cancelSource) {
        cancelSource.cancel();
      }
    }
  }
}
