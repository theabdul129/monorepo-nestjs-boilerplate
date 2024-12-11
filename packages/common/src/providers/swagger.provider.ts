// import { ConfigService } from '@packages/config';
// import { INestApplication } from '@nestjs/common';

// export class Swagger {
//   // #app: INestApplication;
//   // #config: ConfigService;

//   constructor(app: INestApplication, config: ConfigService) {
//     // this.#app = app;
//     // this.#config = config;
//   }

//   // private document(): OpenAPIObject {
//   //   const builder = new DocumentBuilder()
//   //     .setTitle(
//   //       this.#config.get('TITLE') || this.#config.get('npm_package_name')
//   //     )
//   //     .setDescription(this.#config.get('npm_package_description'))
//   //     .setVersion(this.#config.get('npm_package_version'))
//   //     .addBearerAuth(
//   //       {
//   //         type: 'http',
//   //         scheme: 'bearer',
//   //         bearerFormat: 'JWT',
//   //         name: 'JWT',
//   //         description: 'Enter Access token to authenticate the user',
//   //         in: 'header'
//   //       },
//   //       X_ACCESS_TOKEN
//   //     )
//   //     .addServer('http://127.0.0.1:4000', 'Back Office')
//   //     .build();
//   //   const document = SwaggerModule.createDocument(this.#app, builder);
//   //   // Customize Swagger configuration to exclude endpoints marked with @SkipSwaggerDocs
//   //   document.paths = Object.entries(document.paths).reduce(
//   //     (acc, [path, pathItemObject]) => {
//   //       const shouldInclude = !Object.values(pathItemObject).some(
//   //         (operationObject) =>
//   //           operationObject?.[0]?.['x-meta']?.['skipSwaggerDocs']
//   //       );
//   //       if (shouldInclude) {
//   //         acc[path] = pathItemObject;
//   //       }
//   //       return acc;
//   //     },
//   //     {}
//   //   );
//   //   return document;
//   // }

//   // private setup(): void {
//   //   const documentation: OpenAPIObject = this.document();
//   //   SwaggerModule.setup('/', this.#app, documentation, {
//   //     explorer: true,
//   //     swaggerOptions: {
//   //       docExpansion: 'list',
//   //       filter: true,
//   //       showRequestDuration: true,
//   //       defaultModelsExpandDepth: -1
//   //     }
//   //   });
//   // }

//   static register(app: INestApplication, config: ConfigService): void {
//     new Swagger(app, config)
//     //.setup();
//   }
// }
