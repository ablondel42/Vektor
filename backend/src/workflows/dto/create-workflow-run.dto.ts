import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WorkflowRunStatus } from '../types/workflow.types';

export class CreateWorkflowRunDto {
  @IsUUID('4')
  readonly workflowId!: string;

  @IsOptional()
  @IsEnum(WorkflowRunStatus)
  readonly status?: WorkflowRunStatus;
}