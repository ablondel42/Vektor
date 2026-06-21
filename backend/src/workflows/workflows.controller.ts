import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { CreateWorkflowRunDto } from './dto/create-workflow-run.dto';
import { CreateWorkflowStepDto } from './dto/create-workflow-step.dto';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { AuditLog } from './entities/audit-log.entity';
import { WorkflowRun } from './entities/workflow-run.entity';
import { WorkflowStep } from './entities/workflow-step.entity';
import { Workflow } from './entities/workflow.entity';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(@Body() createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll(): Promise<Workflow[]> {
    return this.workflowsService.findAll();
  }

  @Post('runs')
  createRun(@Body() createWorkflowRunDto: CreateWorkflowRunDto): Promise<WorkflowRun> {
    return this.workflowsService.createRun(createWorkflowRunDto);
  }

  @Post('steps')
  createStep(@Body() createWorkflowStepDto: CreateWorkflowStepDto): Promise<WorkflowStep> {
    return this.workflowsService.createStep(createWorkflowStepDto);
  }

  @Post('audit-logs')
  createAuditLog(@Body() createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    return this.workflowsService.createAuditLog(createAuditLogDto);
  }
}