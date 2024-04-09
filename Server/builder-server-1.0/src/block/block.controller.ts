import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlockService } from './block.service';
import { Block } from './block.interface';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get('info/:blockId')
  async readBlock(@Param('blockId') blockId: string) {
    return this.blockService.readBlock(blockId);
  }

  @Get('app/:applicationId/v/:version')
  async readBlocksByApplicationIdAndVersion(
    @Param('applicationId') applicationId: string,
    @Param('version') version: string,
  ) {
    return this.blockService.readBlocksByApplicationIdAndVersion({
      applicationId: applicationId,
      version: version,
    });
  }

  @Post()
  async createBlock(
    @Body('applicationId') applicationId: string,
    @Body('blockData') blockData: Block,
  ) {
    return this.blockService.createBlock({
      applicationId: applicationId,
      blockData: blockData,
    });
  }

  @Post(':blockId/description')
  async updateBlockDescription(
    @Param('blockId') blockId: string,
    @Body('description') description: string,
  ) {
    return this.blockService.updateBlockDescription({
      id: blockId,
      description,
    });
  }

  @Post(':blockId/isActive')
  async updateBlockIsActive(
    @Param('blockId') blockId: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.blockService.updateBlockIsActive({ id: blockId, isActive });
  }

  @Post(':blockId/config')
  async updateBlockConfig(
    @Param('blockId') blockId: string,
    @Body('config') config: object,
  ) {
    return this.blockService.updateBlockConfig({ id: blockId, config });
  }

  @Post(':blockId/isExternal')
  async updateBlockIsExternal(
    @Param('blockId') blockId: string,
    @Body('isExternal') isExternal: boolean,
  ) {
    return this.blockService.updateBlockIsExternal({
      id: blockId,
      isExternal,
    });
  }

  @Post(':blockId/delete')
  async deleteBlock(@Param('blockId') blockId: string) {
    return this.blockService.deleteBlock(blockId);
  }
}
