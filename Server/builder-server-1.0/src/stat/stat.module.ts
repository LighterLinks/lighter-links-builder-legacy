import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatGateway } from './stat.gateway';

@Module({
  providers: [StatGateway, StatService],
})
export class StatModule {}
