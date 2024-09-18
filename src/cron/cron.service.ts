import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { MessageService } from '../message/message.service';

@Injectable()
export class CronService {
  constructor(private readonly messageService: MessageService) {}

  //   @Cron(CronExpression.EVERY_30_SECONDS) // Schedule to run every 30 seconds
  @Interval(7200000)
  handleCron() {
    console.log('Scheduled job running every 2 hrs');
    try {
      this.messageService.archiveMessages();
    } catch (error) {
      console.error('Error executing CRON job:', error);
    }
  }
}
