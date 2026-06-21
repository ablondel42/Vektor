import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { WorkflowRun } from './entities/workflow-run.entity';
import { WorkflowStep } from './entities/workflow-step.entity';
import { Workflow } from './entities/workflow.entity';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { WorkflowRepository } from './repositories/workflow.repository';
import { WorkflowRunRepository } from './repositories/workflow-run.repository';
import { WorkflowStepRepository } from './repositories/workflow-step.repository';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workflow,
      WorkflowRun,
      WorkflowStep,
      AuditLog,
    ]),
  ],
  controllers: [WorkflowsController],
  providers: [
    WorkflowsService,
    WorkflowRepository,
    WorkflowRunRepository,
    WorkflowStepRepository,
    AuditLogRepository,
  ],
  exports: [
    WorkflowRepository,
    WorkflowRunRepository,
    WorkflowStepRepository,
    AuditLogRepository,
  ],
})
export class WorkflowsModule {}