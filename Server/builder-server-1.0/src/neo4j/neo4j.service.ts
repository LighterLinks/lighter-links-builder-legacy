import { Inject, Injectable } from '@nestjs/common';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { Neo4jConfig, Neo4jScheme } from './neo4j.interface';
import { Driver, session, Session, Result } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getDriver(): string {
    return this.driver.toString();
  }

  getConfig(): string {
    return JSON.stringify(this.config);
  }

  getReadSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.READ,
    });
  }

  getWriteSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.WRITE,
    });
  }

  read(
    cypher: string,
    params: Record<string, any> = {},
    database?: string,
  ): Result {
    const session = this.getReadSession(database);
    return session.run(cypher, params);
  }

  write(
    cypher: string,
    params: Record<string, any> = {},
    database?: string,
  ): Result {
    const session = this.getWriteSession(database);
    return session.run(cypher, params);
  }
}
