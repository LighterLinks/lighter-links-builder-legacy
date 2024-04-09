import TYPES from '../server/types';

export type databaseType = 'neo4j' | 'mysql' | 'postgres' | 'mongodb';

export interface SchemaItem {
  name: string;
  type: (typeof TYPES)[keyof typeof TYPES];
  primaryKey?: boolean;
  unique?: boolean;
  notNull?: boolean;
  autoIncrement?: boolean;
  default?: any;
  length?: number;
  precision?: number;
  scale?: number;
  enum?: string[];
  foreignKey?: {
    table: string;
    column: string;
  };
  index?: boolean;
}

export interface SchemaNode extends SchemaItem {
  label: string;
  properties?: SchemaItem[];
}

export interface SchemaRelationship {
  type: string;
  startNode: string;
  endNode: string;
  properties?: SchemaItem[];
}

export interface SchemaDocument {
  [key: string]: any;
}

export interface SchemaTimeSeries {
  metric: string;
  tags?: {
    key: string;
    value: string;
  }[];
  dataPoints: {
    timestamp: number;
    value: any;
  }[];
}

export interface DatabaseSchema {
  tables?: {
    name: string;
    columns: SchemaItem[];
    indexes?: {
      name: string;
      columns: string[];
      unique?: boolean;
    }[];
  }[];
  views?: {
    name: string;
    definition: string;
  }[];
  procedures?: {
    name: string;
    parameters?: SchemaItem[];
    definition: string;
  }[];
  nodes?: SchemaNode[];
  relationships?: SchemaRelationship[];
  collections?: {
    name: string;
    documents?: SchemaDocument[];
  }[];
  timeSeries?: {
    metrics?: SchemaItem[];
    retentionPolicies?: {
      name: string;
      duration: string;
      replicationFactor?: number;
      default?: boolean;
    }[];
    continuousQueries?: {
      name: string;
      query: string;
    }[];
  };
}

export interface DatabaseConfig {
  name: string;
  frameworkType: databaseType;
  schema: DatabaseSchema;
}
