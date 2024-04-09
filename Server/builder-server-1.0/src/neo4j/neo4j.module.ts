import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j.interface';
import { createDriver } from './neo4j.utils';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

@Module({})
export class Neo4jModule {
  static forRoot(config: object): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            return createDriver(config);
          },
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }
}
