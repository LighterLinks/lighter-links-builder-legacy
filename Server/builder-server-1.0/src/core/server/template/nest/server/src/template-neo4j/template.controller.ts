import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from './template.interface';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  // <controller_functions>
}
