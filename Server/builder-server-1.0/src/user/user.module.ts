import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { Neo4jConfig } from 'src/neo4j/neo4j.constants';
import { UserController } from './user.controller';

@Module({
  imports: [Neo4jModule.forRoot(Neo4jConfig)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
