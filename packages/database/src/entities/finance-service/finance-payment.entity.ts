import {
    Table,
    Column,
    DataType,
    DefaultScope,
    Model,
    ForeignKey
  } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { TABLE } from '../../database.constant';
  import { TableOptions } from '../../database.util';
  import { FinanceInstallmentPlanEntity } from './finance-installment-plan.entity';
  
  @DefaultScope(() => ({
    attributes: FNInstallmentPaymentEntity.attributes()
  }))
  @Table(TableOptions(TABLE.FN_PAYMENT, { paranoid: true }))
  export class FNInstallmentPaymentEntity extends Model<FNInstallmentPaymentEntity> {
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the installment payment.'
    })
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the tenant.'
    })
    @Column({ type: DataType.INTEGER, allowNull: false })
    tenant_id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the installment.'
    })
    @ForeignKey(() => FinanceInstallmentPlanEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    installment_id!: number;
  
    @ApiProperty({
      example: 'EXT12345',
      description: 'The external reference identifier for the payment.'
    })
    @Column({ type: DataType.STRING, allowNull: false })
    external_reference_id!: string;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the payment was made.'
    })
    @Column({ type: DataType.DATE, allowNull: false })
    payment_date!: Date;
  
    @ApiProperty({
      example: 500.00,
      description: 'The amount paid for the installment.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: false })
    amount_paid!: number;
  
    @ApiProperty({
      example: 'Bank Transfer',
      description: 'The method of payment (e.g., Bank Transfer, Credit Card, Webhook).'
    })
    @Column({ type: DataType.STRING, allowNull: false })
    payment_method!: string;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the record was created.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    created_on?: Date;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the record was last updated.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    updated_on?: Date;

    @ApiProperty({
      example: new Date(),
      description: 'The deletion date of the finance application.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    deleted_on?: Date;
  
    static attributes(): string[] {
      return [
        'id',
        'tenant_id',
        'installment_id',
        'external_reference_id',
        'payment_date',
        'amount_paid',
        'payment_method',
        'created_on',
        'updated_on'
      ];
    }
  }
  