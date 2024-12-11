import {
  Table,
  Column,
  DataType,
  DefaultScope,
  HasMany,
  HasOne,
  Scopes
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { FinanceApplicationApprovalsEntity } from './finance-application-approval.entity';
import { FinanceInstallmentPlanEntity } from './finance-installment-plan.entity';
import { formatCurrency } from '@packages/common';
import { PaginatedModel } from '../../pagination.model';

@DefaultScope(() => ({
  attributes: FinanceApplicationEntity.attributes()
}))
@Scopes(() => FinanceApplicationEntity.scopes())
@Table(TableOptions(TABLE.FN_APPLICATION, { paranoid: true }))
export class FinanceApplicationEntity extends PaginatedModel<FinanceApplicationEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the application.'
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
    description: 'The unique identifier for the company.'
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  company_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the customer.'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  customer_id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the request.'
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  request_id!: number;

  @ApiProperty({
    example: 'WF12345',
    description: 'The unique identifier for the workflow.'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  workflow_id!: string;

  @ApiProperty({
    example: '21',
    description: 'Workflow Version'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  workflow_version?: string;

  @ApiProperty({
    example: 'Tarabut',
    description: 'The name of the company'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  company_name?: string;

  @ApiProperty({
    example: '278346823764',
    description: 'The cr of the company'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  company_cr_no?: string;

  @ApiProperty({
    example: '50',
    description: 'Progress of the finance aaplication'
  })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 0.0 })
  progress?: number;

  @Column({ type: DataType.JSONB, allowNull: true })
  eligibility_criteria?: any;

  @ApiProperty({
    example: 60,
    description: 'The maximum finance term in months.'
  })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 0 })
  max_finance_term?: number;

  @ApiProperty({
    example: '12 Months',
    description: 'The formatted finance term.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const max_finance_amount = +this.getDataValue('max_finance_term') || 0;
      return `${max_finance_amount} Months`
    }
  })
  formatted_max_finance_term?: string;

  @ApiProperty({
    example: 50000.00,
    description: 'The maximum finance amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  max_finance_amount?: number;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted maximum finance amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const max_finance_amount = +this.getDataValue('max_finance_amount') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(max_finance_amount, currency);
    }
  })
  formatted_max_finance_amount?: string;

  @ApiProperty({
    example: 30000.00,
    description: 'The finance amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  finance_amount?: number;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted finance amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const finance_amount = +this.getDataValue('finance_amount') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(finance_amount, currency)
    }
  })
  formatted_finance_amount?: string;

  @ApiProperty({
    example: 109.00,
    description: 'The emi amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  emi_amount?: number;

  @ApiProperty({
    example: 60,
    description: 'The brokerage fee amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  brokerage_fee?: number;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted emi amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const amount = +this.getDataValue('brokerage_fee') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(amount, currency);
    }
  })
  formatted_brokerage_fee?: string;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted emi amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const amount = +this.getDataValue('emi_amount') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(amount, currency);
    }
  })
  formatted_emi_amount?: string;

  @ApiProperty({
    example: 10009.00,
    description: 'The total payable amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  total_amount?: number;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted emi amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const amount = +this.getDataValue('total_amount') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(amount, currency);
    }
  })
  formatted_total_amount?: string;

  @ApiProperty({
    example: 3.5,
    description: 'The processing fee amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  processing_fee?: number;

  @ApiProperty({
    example: '12 Months',
    description: 'The formatted processing fee.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const processing_fee = +this.getDataValue('processing_fee') || 0;
      const processing_fee_type = this.getDataValue('processing_fee_type') || 0;
      if (processing_fee_type === 'PERCENTAGE') {
        return `${processing_fee}%`;
      }
      const currency = this.getDataValue('currency') || 0;
      return formatCurrency(processing_fee, currency);
    }
  })
  formatted_processing_fee?: string;

  @ApiProperty({
    example: '2000 SAR',
    description: 'The formatted processing fee amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const processing_fee = +this.getDataValue('processing_fee') || 0;
      const processing_fee_type = this.getDataValue('processing_fee_type') || 0;
      const currency = this.getDataValue('currency') || 0;
      if (processing_fee_type === 'PERCENTAGE') {
        const finance_amount = this.getDataValue('finance_amount') || 0;
        const amount = (finance_amount * processing_fee) / 100;
        return formatCurrency(amount, currency);
      }
      return formatCurrency(processing_fee, currency);
    }
  })
  formatted_processing_fee_amount?: string;

  @ApiProperty({
    example: 2000.00,
    description: 'The processing fee amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const processing_fee = +this.getDataValue('processing_fee') || 0;
      const processing_fee_type = this.getDataValue('processing_fee_type') || 0;
      if (processing_fee_type === 'PERCENTAGE') {
        const finance_amount = this.getDataValue('finance_amount') || 0;
        const amount = (finance_amount * processing_fee) / 100;
        return amount;
      }
      return processing_fee;
    }
  })
  processing_fee_amount?: string;


  @ApiProperty({
    example: 3.5,
    description: 'Total paid amount.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0.0 })
  total_paid_amount?: number;

  @ApiProperty({
    example: 3,
    description: 'Total number of paid installment.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true, defaultValue: 0 })
  paid_installments_count?: number;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted total paid amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const amount = +this.getDataValue('total_paid_amount') || 0.0;
      const currency = this.getDataValue('currency');
      return formatCurrency(amount, currency)
    }
  })
  formatted_total_paid_amount?: string;

  @ApiProperty({
    example: '5000.00 SAR',
    description: 'The formatted total paid amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const paidAmount = this.getDataValue('total_paid_amount') || 0.0;
      const totalAmount = this.getDataValue('total_amount') || 0.0;
      const amount = totalAmount - paidAmount;
      const currency = this.getDataValue('currency');
      return formatCurrency(amount, currency);
    }
  })
  formatted_remaining_amount?: string;

  @ApiProperty({
    example: '50',
    description: 'The formatted total paid amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const max_finance_amount = +this.getDataValue('max_finance_amount') || 0.0;
      const finance_amount = +this.getDataValue('finance_amount') || 0.0;
      if (!finance_amount || !max_finance_amount) return 0;
      const utilization = (finance_amount / max_finance_amount) * 100;
      return Math.round(utilization)
    }
  })
  loan_utilization?: number;

  @ApiProperty({
    example: '50',
    description: 'The formatted total paid amount.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const paid_installments_count = +this.getDataValue('paid_installments_count') || 0;
      const finance_term = +this.getDataValue('finance_term') || 0;
      if (!paid_installments_count || !finance_term) return 0;
      const completion = (paid_installments_count / finance_term) * 100;
      return Math.round(completion)
    }
  })
  loan_completion?: number;

  @ApiProperty({
    example: 'fixed',
    description: 'The type of finance rate (fixed, percentage).'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  processing_fee_type?: string;

  @ApiProperty({
    example: 24,
    description: 'The finance term in months.'
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  finance_term?: number;

  @ApiProperty({
    example: '12 Months',
    description: 'The formatted finance term.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const finance_term = +this.getDataValue('finance_term') || 0;
      return `${finance_term} Months`
    }
  })
  formatted_finance_term?: string;

  @ApiProperty({
    example: 5.5,
    description: 'The finance rate as an annual percentage rate.'
  })
  @Column({ type: DataType.DECIMAL, allowNull: true })
  finance_rate?: number;

  @ApiProperty({
    example: '12 Months',
    description: 'The formatted finance term.'
  })
  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      const finance_rate = +this.getDataValue('finance_rate') || 0;
      const finance_rate_type = this.getDataValue('finance_rate_type') || 0;
      if (finance_rate_type === 'PERCENTAGE') {
        return `${finance_rate}%`;
      }
      const currency = this.getDataValue('currency') || 0;
      return formatCurrency(finance_rate, currency);
    }
  })
  formatted_finance_rate?: string;

  @ApiProperty({
    example: 'fixed',
    description: 'The type of finance rate (fixed, percentage).'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  finance_rate_type?: string;

  @ApiProperty({
    example: new Date(),
    description: 'The date the application was created.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  application_date?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the application was approved.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  approval_date?: Date;

  @ApiProperty({
    example: 'PENDING',
    description: 'The processing status of the application.'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  processing_status?: string;

  @ApiProperty({
    example: 'SAR'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  currency?: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'The status of the application.(PENDING, APPROVED, REJECTED)'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  status?: string;

  @ApiProperty({
    example: 'Insufficient documentation',
    description: 'The reason for rejection of the application.'
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  rejection_reason?: string;

  @ApiProperty({
    example: {},
    description: 'Additional details about the application.'
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  application_details?: any;

  @ApiProperty({
    example: 'Working Capital',
    description: 'Purpose of Finace.'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  finance_purpose?: string;

  @ApiProperty({
    example: 'Purchase of Inventory',
    description: 'Utilization of Finace.'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  finance_utilization?: string;

  @ApiProperty({
    example: 'POS Finance',
    description: 'Financing Product Name'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  product_name?: string;

  @ApiProperty({
    example: new Date(),
    description: 'The date the application was created.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the application was last updated.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the application.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @HasOne(() => FinanceApplicationApprovalsEntity)
  approval!: FinanceApplicationApprovalsEntity;

  @HasMany(() => FinanceInstallmentPlanEntity)
  installments!: FinanceInstallmentPlanEntity[];

  static scopes(scope: string | null = null) {
    const scopes: any = {
      full360: {
        attributes: FinanceApplicationEntity.attributes(),
        include: [
          {
            model: FinanceInstallmentPlanEntity,
            as: 'installments',
            required: false
          }
        ]
      }
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'company_id',
      'customer_id',
      'workflow_id',
      'request_id',
      'max_finance_term',
      'max_finance_amount',
      'finance_amount',
      'finance_term',
      'finance_rate',
      'finance_rate_type',
      'application_date',
      'approval_date',
      'currency',
      'processing_status',
      'processing_fee',
      'processing_fee_type',
      'emi_amount',
      'total_amount',
      'total_paid_amount',
      'brokerage_fee',
      'status',
      'formatted_finance_rate',
      'formatted_max_finance_amount',
      'formatted_finance_amount',
      'formatted_emi_amount',
      'formatted_total_amount',
      'formatted_total_paid_amount',
      'formatted_remaining_amount',
      'formatted_brokerage_fee',
      'formatted_max_finance_term',
      'formatted_finance_term',
      'formatted_processing_fee',
      'formatted_processing_fee_amount',
      'processing_fee_amount',
      'loan_utilization',
      'loan_completion',
      'paid_installments_count',
      'rejection_reason',
      'application_details',
      'eligibility_criteria',
      'product_name',
      'company_name',
      'company_cr_no',
      'workflow_version',
      'finance_utilization',
      'finance_purpose',
      'progress',
      'created_on',
      'updated_on'
    ];
  }
}
