import { Injectable, Logger } from '@nestjs/common';
import { mapProjectFromDbEntity, Project } from '../../../domain/Project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDbEntity } from '../../../persistence/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateProjectUseCase {
  private readonly logger = new Logger(CreateProjectUseCase.name);

  constructor(
    @InjectRepository(ProjectDbEntity)
    private projectsRepository: Repository<ProjectDbEntity>
  ) {}

  async invoke(
    projectId: string,
    tenantId: string,
    propertyId: string,
    companyName: string,
    destinationPath: string
  ): Promise<Project> {
    const projectDbEntity = await this.projectsRepository.save({
      id: projectId,
      tenantId: tenantId,
      propertyId: propertyId,
      companyName: companyName,
      destinationPath: destinationPath,
    });
    this.logger.log(`Created new project with id ${projectId}`);
    return mapProjectFromDbEntity(projectDbEntity);
  }
}
