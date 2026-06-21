import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { Workflow } from '../entities/workflow.entity';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectRepository(Workflow)
    private readonly repository: Repository<Workflow>,
  ) {}

  async createOne(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow: Workflow = this.repository.create({
      name: createWorkflowDto.name,
      description: createWorkflowDto.description ?? null,
      version: createWorkflowDto.version ?? 1,
      isActive: true,
    });

    return this.repository.save(workflow);
  }

  async findAll(): Promise<Workflow[]> {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneById(id: string): Promise<Workflow | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}