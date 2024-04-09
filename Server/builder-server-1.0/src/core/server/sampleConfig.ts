import { methodType, serverConfig } from './interface';
import TYPES from './types';

const sampleRoutes = [
  {
    name: 'createUser',
    comment: 'Create a new user',
    moduleType: 'user',
    method: 'Post' as methodType,
    endpoint: '',
    returnType: 'User',
    queryParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
      {
        attribute: 'subId',
        type: TYPES.NUMBER,
      },
    ],
    bodyType: [
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'email',
        type: TYPES.STRING,
      },
      {
        attribute: 'password',
        type: TYPES.STRING,
      },
    ],
    serviceFunction: 'createUser',
    serviceFunctionParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'email',
        type: TYPES.STRING,
      },
      {
        attribute: 'password',
        type: TYPES.STRING,
      },
    ],
  },
  {
    name: 'getUser',
    comment: 'Get a user by id',
    moduleType: 'user',
    method: 'Get' as methodType,
    endpoint: '/:id',
    returnType: 'User',
    queryParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
    bodyType: [],
    serviceFunction: 'getUser',
    serviceFunctionParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
  },
  {
    name: 'updateUser',
    comment: 'Update a user by id',
    moduleType: 'user',
    method: 'Patch' as methodType,
    endpoint: '/:id',
    returnType: 'User',
    queryParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
    bodyType: [
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'email',
        type: TYPES.STRING,
      },
      {
        attribute: 'password',
        type: TYPES.STRING,
      },
    ],
    serviceFunction: 'updateUser',
    serviceFunctionParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'email',
        type: TYPES.STRING,
      },
      {
        attribute: 'password',
        type: TYPES.STRING,
      },
    ],
  },
  {
    name: 'deleteUser',
    comment: 'Delete a user by id',
    moduleType: 'user',
    method: 'Delete' as methodType,
    endpoint: '/:id',
    returnType: 'User',
    queryParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
    bodyType: [],
    serviceFunction: 'deleteUser',
    serviceFunctionParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
  },
  {
    name: 'createItem',
    comment: 'Create a new item',
    moduleType: 'item',
    method: 'Post' as methodType,
    endpoint: '',
    returnType: 'Item',
    queryParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
    ],
    bodyType: [
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'price',
        type: TYPES.NUMBER,
      },
    ],
    serviceFunction: 'createItem',
    serviceFunctionParams: [
      {
        attribute: 'id',
        type: TYPES.NUMBER,
      },
      {
        attribute: 'name',
        type: TYPES.STRING,
      },
      {
        attribute: 'price',
        type: TYPES.NUMBER,
      },
    ],
  },
];

export const sampleServerConfig: serverConfig = {
  name: 'water-server',
  modules: [
    {
      name: 'user',
      databaseType: 'neo4j',
      interfaces: [
        {
          attribute: 'id',
          type: TYPES.NUMBER,
        },
        {
          attribute: 'name',
          type: TYPES.STRING,
        },
        {
          attribute: 'email',
          type: TYPES.STRING,
        },
        {
          attribute: 'password',
          type: TYPES.STRING,
        },
      ],
    },
    {
      name: 'item',
      databaseType: 'neo4j',
      interfaces: [
        {
          attribute: 'id',
          type: TYPES.NUMBER,
        },
        {
          attribute: 'name',
          type: TYPES.STRING,
        },
        {
          attribute: 'price',
          type: TYPES.NUMBER,
        },
      ],
    },
  ],
  routes: sampleRoutes,
};
