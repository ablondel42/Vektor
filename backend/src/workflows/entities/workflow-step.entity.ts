import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowStepStatus } from '../types/workflow.enums';
import { WorkflowRun } from './workflow-run.entity';
import { JsonObject } from '../types/workflow.types';

@Entity('workflow_step')
export class WorkflowStep {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'workflow_run_id', type: 'uuid' })
  workflowRunId!: string;

  @ManyToOne(
    () => WorkflowRun,
    (workflowRun: WorkflowRun) => workflowRun.steps,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'workflow_run_id' })
  workflowRun!: WorkflowRun;

  @Column({ type: 'text' })
  name!: string;

  @Column({
    type: 'enum',
    enum: WorkflowStepStatus,
    default: WorkflowStepStatus.PENDING,
  })
  status!: WorkflowStepStatus;

  @Column({ name: 'step_order', type: 'int', default: 0 })
  stepOrder!: number;

  @Column({ name: 'input_payload', type: 'jsonb', nullable: true })
  inputPayload!: JsonObject | null;

  @Column({ name: 'output_payload', type: 'jsonb', nullable: true })
  outputPayload!: JsonObject | null;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt!: Date | null;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}