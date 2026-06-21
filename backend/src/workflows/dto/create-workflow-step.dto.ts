import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import type { JsonObject } from '../types/workflow.types';
import { WorkflowStepStatus } from '../types/workflow.types';

export class CreateWorkflowStepDto {
  @IsUUID('4')
  readonly workflowRunId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  readonly name!: string;

  @IsOptional()
  @IsEnum(WorkflowStepStatus)
  readonly status?: WorkflowStepStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly stepOrder?: number;

  @IsOptional()
  @IsObject()
  readonly inputPayload?: JsonObject;

  @IsOptional()
  @IsObject()
  readonly outputPayload?: JsonObject;
}