import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { Neo4jConfig } from 'src/neo4j/neo4j.constants';
import { BlockController } from './block.controller';

@Module({
  imports: [Neo4jModule.forRoot(Neo4jConfig)],
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
