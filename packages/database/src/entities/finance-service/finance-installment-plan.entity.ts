import {
    Table,
    Column,
    DataType,
    DefaultScope,
    Model,
    ForeignKey,
  } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { TABLE } from '../../database.constant';
  import { TableOptions } from '../../database.util';
  import { FinanceApplicationEntity } from './finance-application.entity';
  import { formatCurrency } from '@packages/common';

  @DefaultScope(() => ({
    attributes: FinanceInstallmentPlanEntity.attributes()
  }))
  @Table(TableOptions(TABLE.FN_INSTALLMENT_PLAN, { paranoid: true }))
  export class FinanceInstallmentPlanEntity extends Model<FinanceInstallmentPlanEntity> {
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the installment plan.'
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
      description: 'The unique identifier for the finance application.'
    })
    @ForeignKey(() => FinanceApplicationEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    application_id!: number;

    // @ApiProperty({
    //   example: 1,
    //   description: 'The unique identifier for the approval.'
    // })
    // @ForeignKey(() => FinanceApplicationApprovalsEntity)
    // @Column({ type: DataType.INTEGER, allowNull: false })
    // approval_id!: number;

    // @BelongsTo(() => FinanceApplicationApprovalsEntity)
    // approval!: FinanceApplicationApprovalsEntity;
  
    @ApiProperty({
      example: 1,
      description: 'The installment number.'
    })
    @Column({ type: DataType.INTEGER, allowNull: false })
    installment_number!: number;
  
    @ApiProperty({
      example: '2024-08-06',
      description: 'The due date for the installment.'
    })
    @Column({ type: DataType.DATE, allowNull: false })
    due_date!: Date;
  
    @ApiProperty({
      example: 1000.00,
      description: 'The amount due for the installment.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: false })
    amount_due!: number;

    @ApiProperty({
      example: '5000.00 SAR',
      description: 'The formatted emi amount.'
    })
    @Column({ 
      type: DataType.VIRTUAL,
      allowNull: true,
      get() {
        const amount = this.getDataValue('amount_due') || 0.0;
        const currency = this.getDataValue('currency');
        return formatCurrency(amount, currency)
      }
    })
    formatted_amount_due?: string;
  
    @ApiProperty({
      example: 500.00,
      description: 'The amount paid for the installment.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: true })
    amount_paid?: number;

    @ApiProperty({
      example: '5000.00 SAR',
      description: 'The formatted emi amount.'
    })
    @Column({ 
      type: DataType.VIRTUAL,
      allowNull: true,
      get() {
        const amount = +this.getDataValue('amount_paid') || 0.0;
        const currency = this.getDataValue('currency');
        return formatCurrency(amount, currency);
      }
    })
    formatted_amount_paid?: string;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the payment was made.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    payment_date?: Date;

    @ApiProperty({
      example: 'SAR'
    })
    @Column({ type: DataType.STRING, allowNull: true })
    currency?: string;

    @ApiProperty({
      example: 'PENDING',
      description: 'The status of the installment (PENDING, PAID, OVERDUE).'
    })
    @Column({ 
      type: DataType.VIRTUAL,
      get() {
        const status = this.getDataValue('status');
        if(status == 'PAID') return 'PAID';
        const currentDate = new Date();
        const due_date = new Date(this.getDataValue('due_date'));
        if(due_date > currentDate) {
          return 'UPCOMING';
        } else if(due_date < currentDate) {
          return 'OVREDUE';
        }
        return 'TODAY';
      }
    })
    processing_status!: string;
  
    @ApiProperty({
      example: 'PENDING',
      description: 'The status of the installment (PENDING, PAID, OVERDUE).'
    })
    @Column({ type: DataType.STRING, allowNull: false })
    status!: string;
  
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
      description: 'The deletion date of the application installment plan'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    deleted_on?: Date;
  
    static attributes(): string[] {
      return [
        'id',
        'tenant_id',
        'currency',
        'installment_number',
        'due_date',
        'amount_due',
        'amount_paid',
        'payment_date',
        'processing_status',
        'formatted_amount_paid',
        'formatted_amount_due',
        'status',
        'created_on',
        'updated_on'
      ];
    }
  }
  