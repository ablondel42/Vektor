import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class AuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async createOne(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const auditLog: AuditLog = this.repository.create({
      workflowRunId: createAuditLogDto.workflowRunId,
      level: createAuditLogDto.level,
      message: createAuditLogDto.message,
      metadata: createAuditLogDto.metadata ?? null,
    });

    return this.repository.save(auditLog);
  }

  async findByWorkflowRunId(workflowRunId: string): Promise<AuditLog[]> {
    return this.repository.find({
      where: { workflowRunId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}