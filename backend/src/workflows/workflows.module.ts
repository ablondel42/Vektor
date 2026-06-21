import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';
import { Workflow } from './entities/workflow.entity';
import { WorkflowRepository } from './repositories/workflow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow])],
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowRepository],
  exports: [WorkflowRepository],
})
export class WorkflowsModule {}