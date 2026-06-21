import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from '../entities/workflow.entity';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectRepository(Workflow)
    private readonly repository: Repository<Workflow>,
  ) {}

  async createWorkflow(data: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.repository.create({
      name: data.name,
      description: data.description,
      version: data.version ?? 1,
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

  async findById(id: string): Promise<Workflow | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}