import neo4j from 'neo4j-driver';
import { Neo4jConfig } from './neo4j.interface';

export const createDriver = (config: Neo4jConfig) => {
  const driver = neo4j.driver(
    `${config.scheme}://${config.host}:${config.port}`,
    neo4j.auth.basic(config.username, config.password),
  );
  return driver;
};
