import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class RecipientDto {
  @IsOptional()
  @IsString()
  emailDestination?: string;

  @IsOptional()
  @IsString()
  ccEmailDestination?: string;

  @IsNotEmpty()
  @IsString()
  language!: string;

  @IsOptional()
  @IsString()
  notificationMethod?: string;

  @IsOptional()
  @IsString()
  smsDestination?: string;
}

export class RecipientListDto {
  @IsNotEmpty()
  recipient!: RecipientDto;
}

export class BodyDto {
  @IsNotEmpty()
  @IsString()
  templateType!: string;

  @IsNotEmpty()
  @IsString()
  criticalFlag!: string;

  @IsNotEmpty()
  @IsString()
  acctNumber!: string;

  @IsNotEmpty()
  @IsString()
  adminType!: string;

  @IsOptional()
  @IsString()
  adminId?: string;

  @IsOptional()
  @IsString()
  iomssEventCd?: string;

  @IsNotEmpty()
  @IsArray()
  parameterList?: string[];

  @IsOptional()
  @IsString()
  eventType?: string;

  @IsNotEmpty()
  recipientList!: RecipientListDto;

  @IsOptional()
  @IsString()
  atmCardNumber?: string;

  @IsOptional()
  @IsString()
  deptCd?: string;
}

export class HeaderDto {
  @IsNotEmpty()
  @IsString()
  sender!: string;

  @IsNotEmpty()
  @IsString()
  receiver!: string;

  @IsNotEmpty()
  @IsString()
  timeStamp!: string;
}

export class NotificationDto {
  @IsNotEmpty()
  header!: HeaderDto;

  @IsNotEmpty()
  body!: BodyDto;
}
