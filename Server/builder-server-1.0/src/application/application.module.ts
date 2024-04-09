import { Module } from '@nestjs/common';
import { Neo4jConfig } from 'src/neo4j/neo4j.constants';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
  imports: [Neo4jModule.forRoot(Neo4jConfig)],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
