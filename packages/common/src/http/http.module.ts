import { Module, DynamicModule, Global, Provider, ModuleMetadata, Type } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from './http.service';

export type HttpModuleOptions = AxiosRequestConfig;

export const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
export const HTTP_MODULE_ID = 'HTTP_MODULE_ID';
export const HTTP_MODULE_OPTIONS = 'HTTP_MODULE_OPTIONS';

export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HttpModuleOptionsFactory>;
  useClass?: Type<HttpModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpModuleOptions> | HttpModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

@Global()
@Module({})
export class HttpModule {

  static register(name: string, config: HttpModuleOptions): DynamicModule {
    const instance = new HttpService(name, config);
    return {
      module: HttpModule,
      providers: [
        {
          provide: name,
          useValue: instance,
        },
      ],
      exports: [{
        provide: name,
        useValue: instance,
      }]

    };
  }

  static registerAsync(name: string, options: HttpModuleAsyncOptions): DynamicModule {
    const data = [
      ...this.createAsyncProviders(options),
      {
        provide: name,
        useFactory: (config: HttpModuleOptions) => new HttpService(name, config),
        inject: [HTTP_MODULE_OPTIONS],
      },
      ...(options.extraProviders || []),
    ]
    return {
      module: HttpModule,
      imports: options.imports,
      providers: data,
      exports: data
    };
  }

  private static createAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ] as any;
  }

  private static createAsyncOptionsProvider(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject: [options.useExisting || options.useClass],
    } as any;
  }
}
