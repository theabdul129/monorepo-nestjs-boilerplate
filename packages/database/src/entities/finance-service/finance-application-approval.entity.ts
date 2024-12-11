import {
    Table,
    Column,
    DataType,
    DefaultScope,
    Model,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { TABLE } from '../../database.constant';
  import { TableOptions } from '../../database.util';
  import { FinanceApplicationEntity } from './finance-application.entity';
  
  @DefaultScope(() => ({
    attributes: FinanceApplicationApprovalsEntity.attributes()
  }))
  @Table(TableOptions(TABLE.FN_APPLICATION_APPROVALS, { paranoid: true }))
  export class FinanceApplicationApprovalsEntity extends Model<FinanceApplicationApprovalsEntity> {
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the application approval.'
    })
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the application.'
    })
    @ForeignKey(() => FinanceApplicationEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    application_id!: number;

    @BelongsTo(() => FinanceApplicationEntity)
    application!: FinanceApplicationEntity;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the tenant.'
    })
    @Column({ type: DataType.INTEGER, allowNull: false })
    tenant_id!: number;
  
    @ApiProperty({
      example: 50000.00,
      description: 'The approved amount.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: true })
    approved_amount?: number;
  
    @ApiProperty({
      example: 24,
      description: 'The approved term in months.'
    })
    @Column({ type: DataType.INTEGER, allowNull: true })
    approved_term?: number;
  
    @ApiProperty({
      example: 5.5,
      description: 'The approved finance rate as an annual percentage rate.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: true })
    approved_finance_rate?: number;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the approval was made.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    approval_date?: Date;
  
    @ApiProperty({
      example: new Date(),
      description: 'The date the funds were disbursed.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    disbursement_date?: Date;
  
    @ApiProperty({
      example: 20000.00,
      description: 'The total amount paid.'
    })
    @Column({ type: DataType.DECIMAL, allowNull: true })
    total_paid_amount?: number;
  
    @ApiProperty({
      example: 'John Doe',
      description: 'The name of the person who approved the application.'
    })
    @Column({ type: DataType.STRING, allowNull: true })
    approved_by?: string;
  
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
      description: 'The deletion date of the application approval.'
    })
    @Column({ type: DataType.DATE, allowNull: true })
    deleted_on?: Date;

    // @HasMany(() => FinanceInstallmentPlanEntity)
    // installments!: FinanceInstallmentPlanEntity[];
  
    static attributes(): string[] {
      return [
        'id',
        'application_id',
        'tenant_id',
        'approved_amount',
        'approved_term',
        'approved_finance_rate',
        'approval_date',
        'disbursement_date',
        'total_paid_amount',
        'approved_by',
        'created_on',
        'updated_on'
      ];
    }
  }
  