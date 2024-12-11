import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { TABLE } from '../../database.constant';

@Table({
  tableName: TABLE.FN_APPLICATION_STATUS_VIEW, 
  timestamps: false, 
})
export class FinanceApplicationStatusView extends Model<FinanceApplicationStatusView> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false, 
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tenant_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  approved!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pending!: number; 

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rejected!: number;  

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  completed!: number; 
}
