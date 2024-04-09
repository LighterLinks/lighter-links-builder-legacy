import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { StatService } from './stat.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@WebSocketGateway()
export class StatGateway {
  constructor(private readonly statService: StatService) {}

  @SubscribeMessage('createStat')
  create(@MessageBody() createStatDto: CreateStatDto) {
    return this.statService.create(createStatDto);
  }

  @SubscribeMessage('findAllStat')
  findAll() {
    return this.statService.findAll();
  }

  @SubscribeMessage('findOneStat')
  findOne(@MessageBody() id: number) {
    return this.statService.findOne(id);
  }

  @SubscribeMessage('updateStat')
  update(@MessageBody() updateStatDto: UpdateStatDto) {
    return this.statService.update(updateStatDto.id, updateStatDto);
  }

  @SubscribeMessage('removeStat')
  remove(@MessageBody() id: number) {
    return this.statService.remove(id);
  }
}
