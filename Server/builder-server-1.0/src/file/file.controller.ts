import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('presignedUrl/:objectName')
  async getPreSignedUrl(@Param('objectName') objectName: string) {
    return this.fileService.getPreSignedUrl(objectName);
  }
}
