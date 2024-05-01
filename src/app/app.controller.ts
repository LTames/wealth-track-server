import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  public a() {
    return 'Hello world';
  }
}
