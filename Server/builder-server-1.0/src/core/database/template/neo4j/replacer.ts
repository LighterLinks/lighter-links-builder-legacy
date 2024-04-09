import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

export function replacerNeo4j({
  appName,
  version,
  databaseName,
  databaseVolName,
  databaseVolLogsName,
  databaseContainerName,
  networkName,
  databaseExternalPort,
  databaseExternalPortBolt,
  databaseAuthID,
  databaseAuthPassword,
}: {
  appName: string;
  version: string;
  databaseName: string;
  databaseVolName: string;
  databaseVolLogsName: string;
  databaseContainerName: string;
  networkName: string;
  databaseExternalPort: number;
  databaseExternalPortBolt: number;
  databaseAuthID: string;
  databaseAuthPassword: string;
}) {
  const templatePath = `./src/core/database/template/neo4j/database`;
  const basePath = `${process.env.BUILDER_APP_DIR}/${appName}/${version}/Database/${databaseName}`;
  execSync(`cp -r ${templatePath} ${basePath}`);

  const replaceContent = [
    {
      filePath: `${basePath}/create_volumes.sh`,
      mapper: [
        {
          token: '<database_vol_name>',
          value: databaseVolName,
        },
        {
          token: '<database_vol_logs_name>',
          value: databaseVolLogsName,
        },
      ],
    },
    {
      filePath: `${basePath}/delete_volumes.sh`,
      mapper: [
        {
          token: '<database_vol_name>',
          value: databaseVolName,
        },
        {
          token: '<database_vol_logs_name>',
          value: databaseVolLogsName,
        },
      ],
    },
    {
      filePath: `${basePath}/run_container.sh`,
      mapper: [
        {
          token: '<database_container_name>',
          value: databaseContainerName,
        },
        {
          token: '<network_name>',
          value: networkName,
        },
        {
          token: '<database_external_port>',
          value: databaseExternalPort.toString(),
        },
        {
          token: '<database_external_port_bolt>',
          value: databaseExternalPortBolt.toString(),
        },
        {
          token: '<database_vol_name>',
          value: databaseVolName,
        },
        {
          token: '<database_vol_logs_name>',
          value: databaseVolLogsName,
        },
        {
          token: '<database_auth_id>',
          value: databaseAuthID,
        },
        {
          token: '<database_auth_password>',
          value: databaseAuthPassword,
        },
      ],
    },
    {
      filePath: `${basePath}/stop_container.sh`,
      mapper: [
        {
          token: '<database_container_name>',
          value: databaseContainerName,
        },
      ],
    },
  ];

  replaceContent.forEach((content) => {
    let fileContent = readFileSync(content.filePath).toString();
    content.mapper.forEach((map) => {
      fileContent = fileContent.replace(new RegExp(map.token, 'g'), map.value);
    });
    writeFileSync(content.filePath, fileContent);
  });
}
