import { Controller, Get, Logger } from '@nestjs/common';

@Controller('test')
export class TestController {
  private readonly logger = new Logger(TestController.name);

  @Get()
  async getProject(): Promise<{ content: string }> {
    return { content: 'OK' };
  }
}
