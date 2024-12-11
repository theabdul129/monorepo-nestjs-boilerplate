import { TableOptions as SequelizeTableOptions } from 'sequelize-typescript';

export const TableOptions = (
  tableName: string,
  options: SequelizeTableOptions = {}
): SequelizeTableOptions => {
  const { paranoid } = options;
  const _options = {
    tableName: tableName,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    underscored: true,
    timestamps: true,
    ...options
  };
  if (paranoid) {
    return {
      ..._options,
      deletedAt: 'deleted_on'
    };
  }
  return _options;
};

export const registerSequelizeProvider = <T>(tableName: string | T, entity: T): { provide: string | T, useValue: T } => {
  return {
    provide: tableName,
    useValue: entity,
  };
};
