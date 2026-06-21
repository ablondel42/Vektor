import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { AuditLogLevel } from '../types/workflow.enums';
import type { JsonObject } from '../types/workflow.types';

export class CreateAuditLogDto {
  @IsUUID('4')
  readonly workflowRunId!: string;

  @IsEnum(AuditLogLevel)
  readonly level!: AuditLogLevel;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  readonly message!: string;

  @IsOptional()
  @IsObject()
  readonly metadata?: JsonObject;
}