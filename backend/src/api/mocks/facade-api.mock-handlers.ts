import { rest } from 'msw';
import { HttpStatus } from '@nestjs/common';
import { NotifyProjectUploadCompletionResponse, ProjectDetailsResponse } from '../facadeApi/facade-api.dtos';
import { ProjectDetails } from '../../application/projects/dtos/project-details.dto';

export const projectDetails: ProjectDetails = {
  companyName: 'Tüv Süd',
  propertyId: 'BLK001',
  projectId: 'BLK001BAT00000',
  tenantId: 'TUVSUD',
};

export const facadeApiMockHandlers = [
  rest.post(`${process.env.FACADE_API_BASE_URL}/temp-login`, (req, res, ctx) => {
    const response: ProjectDetailsResponse = {
      status: 'success',
      message: {
        status: true,
        companyName: projectDetails.companyName,
        blockId: projectDetails.propertyId,
        batchId: projectDetails.projectId,
      },
    };
    return res(ctx.status(HttpStatus.OK), ctx.json(response));
  }),

  rest.post(`${process.env.FACADE_API_BASE_URL}/notify-image-upload`, (req, res, ctx) => {
    const response: NotifyProjectUploadCompletionResponse = {
      message: 'Successfully completed project upload phase',
      status: true,
    };
    return res(ctx.status(HttpStatus.OK), ctx.json(response));
  }),
];
