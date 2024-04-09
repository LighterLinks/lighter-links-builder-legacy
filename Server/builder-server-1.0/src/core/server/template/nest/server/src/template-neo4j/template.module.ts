import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { Neo4jConfig } from 'src/neo4j/neo4j.constants';

@Module({
  imports: [Neo4jModule.forRoot(Neo4jConfig)],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
