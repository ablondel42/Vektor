import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;
}