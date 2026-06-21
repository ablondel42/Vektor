import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { CreateWorkflowRunDto } from './dto/create-workflow-run.dto';
import { CreateWorkflowStepDto } from './dto/create-workflow-step.dto';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { AuditLog } from './entities/audit-log.entity';
import { WorkflowRun } from './entities/workflow-run.entity';
import { WorkflowStep } from './entities/workflow-step.entity';
import { Workflow } from './entities/workflow.entity';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { WorkflowRepository } from './repositories/workflow.repository';
import { WorkflowRunRepository } from './repositories/workflow-run.repository';
import { WorkflowStepRepository } from './repositories/workflow-step.repository';

@Injectable()
export class WorkflowsService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly workflowRunRepository: WorkflowRunRepository,
    private readonly workflowStepRepository: WorkflowStepRepository,
    private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    return this.workflowRepository.createOne(createWorkflowDto);
  }

  async findAll(): Promise<Workflow[]> {
    return this.workflowRepository.findAll();
  }

  async createRun(createWorkflowRunDto: CreateWorkflowRunDto): Promise<WorkflowRun> {
    const workflow: Workflow | null = await this.workflowRepository.findOneById(
      createWorkflowRunDto.workflowId,
    );

    if (workflow === null) {
      throw new NotFoundException('Workflow not found');
    }

    return this.workflowRunRepository.createOne(createWorkflowRunDto);
  }

  async createStep(createWorkflowStepDto: CreateWorkflowStepDto): Promise<WorkflowStep> {
    const workflowRun: WorkflowRun | null = await this.workflowRunRepository.findOneById(
      createWorkflowStepDto.workflowRunId,
    );

    if (workflowRun === null) {
      throw new NotFoundException('Workflow run not found');
    }

    return this.workflowStepRepository.createOne(createWorkflowStepDto);
  }

  async createAuditLog(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const workflowRun: WorkflowRun | null = await this.workflowRunRepository.findOneById(
      createAuditLogDto.workflowRunId,
    );

    if (workflowRun === null) {
      throw new NotFoundException('Workflow run not found');
    }

    return this.auditLogRepository.createOne(createAuditLogDto);
  }
}