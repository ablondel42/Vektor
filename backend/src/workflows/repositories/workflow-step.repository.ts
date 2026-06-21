import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowStepDto } from '../dto/create-workflow-step.dto';
import { WorkflowStep } from '../entities/workflow-step.entity';
import { WorkflowStepStatus } from '../types/workflow.types';

@Injectable()
export class WorkflowStepRepository {
  constructor(
    @InjectRepository(WorkflowStep)
    private readonly repository: Repository<WorkflowStep>,
  ) {}

  async createOne(createWorkflowStepDto: CreateWorkflowStepDto): Promise<WorkflowStep> {
    const workflowStep: WorkflowStep = this.repository.create({
      workflowRunId: createWorkflowStepDto.workflowRunId,
      name: createWorkflowStepDto.name,
      status: createWorkflowStepDto.status ?? WorkflowStepStatus.PENDING,
      stepOrder: createWorkflowStepDto.stepOrder ?? 0,
      inputPayload: createWorkflowStepDto.inputPayload ?? null,
      outputPayload: createWorkflowStepDto.outputPayload ?? null,
      startedAt: null,
      finishedAt: null,
    });

    return this.repository.save(workflowStep);
  }

  async findByWorkflowRunId(workflowRunId: string): Promise<WorkflowStep[]> {
    return this.repository.find({
      where: { workflowRunId },
      order: {
        stepOrder: 'ASC',
        createdAt: 'ASC',
      },
    });
  }
}