// import { Model } from 'sequelize-typescript';
// import { FindOptions, ScopeOptions } from 'sequelize';

// export type PaginationOptions = {
//   page?: number;
//   pageSize?: number;
//   scopes?: string | ScopeOptions | (string | ScopeOptions)[];
//   pagination?: boolean;
// } & FindOptions;

// export type PaginationResult<I> = {
//   data: I[];
//   meta: {
//     page: number;
//     pageSize: number;
//     total: number;
//     pages: number;
//   };
// };

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export class PaginatedModel<T> extends Model {
//   static async paginate<T extends typeof PaginatedModel, I = InstanceType<T>>(
//     this: T,
//     {
//       page = 1,
//       pageSize = 200,
//       pagination = true,
//       ...params
//     }: PaginationOptions = {
//       page: 1,
//       pageSize: 200,
//       pagination: true
//     }
//   ): Promise<PaginationResult<I>> {
//     const options: any = Object.assign({}, params);
//     if (pagination == false) {
//       const scopes = params?.scopes || [];
//       const rows = await this.scope(scopes).findAll(options);
//       return {
//         meta: {
//           page: 1,
//           pageSize: rows.length,
//           total: rows.length,
//           pages: 1
//         },
//         data: rows as unknown as I[]
//       };
//     } else {
//       const scopes: any = params?.scopes || [];
//       const countOptions = Object.keys(options).reduce((acc: any, key: string) => {
//         if (!['order', 'attributes'].includes(key)) {
//           acc[key] = options[key];
//         }
//         return acc;
//       }, {});

//       options.limit = pageSize;
//       options.offset = pageSize * (page - 1);

//       if (params.limit) {
//         console.warn(
//           `(sequelize-pagination) Warning: limit option is ignored.`
//         );
//       }
//       if (params.offset) {
//         console.warn(
//           `(sequelize-pagination) Warning: offset option is ignored.`
//         );
//       }

//       if (params.order) options.order = params.order;
//       let count: any = 0,
//         rows = [];
//       [count, rows] = await Promise.all([
//         this.scope(scopes).findAll(countOptions),
//         this.scope(scopes).findAll(options)
//       ]);
//       const total =
//         options.group !== undefined ? count['length'] : count?.length;
//       const typedRows = rows as unknown as I[];
//       const pages = Math.ceil(total / pageSize);

//       return {
//         meta: {
//           page,
//           pageSize,
//           total,
//           pages
//         },
//         data: typedRows
//       };
//     }
//   }
// }
