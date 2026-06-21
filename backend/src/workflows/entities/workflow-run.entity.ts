import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuditLogLevel, JsonObject, WorkflowRunStatus } from '../types/workflow.types';
import { AuditLog } from './audit-log.entity';
import { WorkflowStep } from './workflow-step.entity';
import { Workflow } from './workflow.entity';

@Entity('workflow_run')
export class WorkflowRun {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'workflow_id', type: 'uuid' })
  workflowId!: string;

  @ManyToOne(
    () => Workflow,
    (workflow: Workflow) => workflow.runs,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @Column({
    type: 'enum',
    enum: WorkflowRunStatus,
    default: WorkflowRunStatus.PENDING,
  })
  status!: WorkflowRunStatus;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt!: Date | null;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt!: Date | null;

  @OneToMany(
    () => WorkflowStep,
    (step: WorkflowStep) => step.workflowRun,
  )
  steps!: WorkflowStep[];

  @OneToMany(
    () => AuditLog,
    (log: AuditLog) => log.workflowRun,
  )
  auditLogs!: AuditLog[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}