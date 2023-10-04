import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Controller('health')
export class HealthController {
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  getHealth(): { content: string } {
    return { content: 'OK' };
  }
}
