import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditLogLevel } from '../types/workflow.enums';
import { WorkflowRun } from './workflow-run.entity';
import { JsonObject } from '../types/workflow.types';

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'workflow_run_id', type: 'uuid' })
  workflowRunId!: string;

  @ManyToOne(
    () => WorkflowRun,
    (workflowRun: WorkflowRun) => workflowRun.auditLogs,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'workflow_run_id' })
  workflowRun!: WorkflowRun;

  @Column({
    type: 'enum',
    enum: AuditLogLevel,
  })
  level!: AuditLogLevel;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata!: JsonObject | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}