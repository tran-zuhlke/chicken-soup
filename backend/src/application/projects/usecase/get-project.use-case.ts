import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { mapProjectFromDbEntity, Project } from '../../../domain/Project';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDbEntity } from '../../../persistence/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetProjectUseCase {
  private readonly logger = new Logger(GetProjectUseCase.name);

  constructor(
    @InjectRepository(ProjectDbEntity)
    private projectsRepository: Repository<ProjectDbEntity>
  ) {}

  async invoke(projectId: string): Promise<Project> {
    this.logger.debug(`Invoked ${GetProjectUseCase.name} for projectId ${projectId}`);
    return await this.invokeWithRelations(projectId, ['uploads', 'uploads.images']);
  }

  async invokeWithRelations(projectId: string, relations: string[]): Promise<Project> {
    const projectDbEntity = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: relations,
    });
    if (!projectDbEntity) {
      throw new NotFoundException('Project not found');
    }
    return mapProjectFromDbEntity(projectDbEntity);
  }
}
