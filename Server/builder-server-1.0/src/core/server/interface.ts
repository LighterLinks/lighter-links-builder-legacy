import { databaseType } from '../database/interface';
import TYPES from './types';

export type methodType = 'Get' | 'Post' | 'Put' | 'Delete' | 'Patch';
export type serverType = 'nestjs' | 'spring' | 'django' | 'axum';

interface DataSource {
  name: string;
  type: databaseType;
  config: {
    [key: string]: any;
  };
}

interface Entity {
  name: string;
  fields: {
    [key: string]: {
      type: (typeof TYPES)[keyof typeof TYPES];
      required?: boolean;
    };
  };
}

interface Endpoint {
  name: string;
  method: methodType;
  path: string;
  requestBody?: {
    [key: string]: {
      type: (typeof TYPES)[keyof typeof TYPES];
      required?: boolean;
    };
  };
  query: string;
  queryParams?: {
    [key: string]: {
      type: (typeof TYPES)[keyof typeof TYPES];
      required?: boolean;
    };
  };
  responseBody?: {
    [key: string]: {
      type: (typeof TYPES)[keyof typeof TYPES];
    };
  };
  middleware?: string[];
}

interface Module {
  name: string;
  description?: string;
  dataSource: string;
  entities?: Entity[];
  endpoints: Endpoint[];
}

export interface ServerConfig {
  name: string;
  frameworkType: serverType;
  dataSources: DataSource[];
  modules: Module[];
}
