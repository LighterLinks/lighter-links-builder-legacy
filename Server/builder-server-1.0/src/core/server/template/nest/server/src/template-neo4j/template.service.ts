import { Inject, Injectable } from '@nestjs/common';
import { Template } from './template.interface';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4jService: Neo4jService,
  ) {}

  // <service_functions>
}
