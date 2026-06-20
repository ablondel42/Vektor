import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('make')
  handleMakeWebhook(@Body() body: any) {
    console.log('Make payload:', body);

    return {
      ok: true,
      received: body,
    };
  }
}