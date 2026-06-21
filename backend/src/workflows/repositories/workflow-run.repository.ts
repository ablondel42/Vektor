import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowRunDto } from '../dto/create-workflow-run.dto';
import { WorkflowRun } from '../entities/workflow-run.entity';
import { WorkflowRunStatus } from '../types/workflow.enums';

@Injectable()
export class WorkflowRunRepository {
  constructor(
    @InjectRepository(WorkflowRun)
    private readonly repository: Repository<WorkflowRun>,
  ) {}

  async createOne(createWorkflowRunDto: CreateWorkflowRunDto): Promise<WorkflowRun> {
    const workflowRun: WorkflowRun = this.repository.create({
      workflowId: createWorkflowRunDto.workflowId,
      status: createWorkflowRunDto.status ?? WorkflowRunStatus.PENDING,
      startedAt: null,
      finishedAt: null,
    });

    return this.repository.save(workflowRun);
  }

  async findAll(): Promise<WorkflowRun[]> {
    return this.repository.find({
      relations: {
        workflow: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneById(id: string): Promise<WorkflowRun | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        workflow: true,
        steps: true,
        auditLogs: true,
      },
    });
  }
}