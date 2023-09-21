import { Project } from '../../../domain/Project';
import { ProjectDbEntity } from '../../../persistence/project.entity';
import { Repository } from 'typeorm';
export declare class CreateProjectUseCase {
    private projectsRepository;
    private readonly logger;
    constructor(projectsRepository: Repository<ProjectDbEntity>);
    invoke(projectId: string, tenantId: string, propertyId: string, companyName: string, destinationPath: string): Promise<Project>;
}
