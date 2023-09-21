import { Project } from '../../../domain/Project';
import { ProjectDbEntity } from '../../../persistence/project.entity';
import { Repository } from 'typeorm';
export declare class GetProjectUseCase {
    private projectsRepository;
    private readonly logger;
    constructor(projectsRepository: Repository<ProjectDbEntity>);
    invoke(projectId: string): Promise<Project>;
    invokeWithRelations(projectId: string, relations: string[]): Promise<Project>;
}
