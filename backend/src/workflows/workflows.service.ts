import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { WorkflowRepository } from './repositories/workflow.repository';

@Injectable()
export class WorkflowsService {
  constructor(private readonly workflowRepository: WorkflowRepository) {}

  create(createWorkflowDto: CreateWorkflowDto) {
    return this.workflowRepository.createWorkflow(createWorkflowDto);
  }

  findAll() {
    return this.workflowRepository.findAll();
  }
}