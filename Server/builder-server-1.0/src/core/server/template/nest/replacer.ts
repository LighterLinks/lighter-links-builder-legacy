import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

export function replacerNest({
  appName,
  version,
  serverName,
  description,
  serverImageName,
  serverContainerName,
  serverExternalPort,
  NetworkName,
}: {
  appName: string;
  version: string;
  serverName: string;
  description: string;
  serverImageName: string;
  serverContainerName: string;
  serverExternalPort: number;
  NetworkName: string;
}) {
  const templatePath = `./src/core/server/template/nest/${serverName}`;
  const basePath = `${process.env.BUILDER_APP_DIR}/${appName}/${version}/Server/${serverName}`;
  execSync(`cp -r ${templatePath} ${basePath}`);
  execSync(`rm -r ${templatePath}`);

  const replaceContent = [
    {
      filePath: `${basePath}/package.json`,
      mapper: [
        {
          token: '<server_name>',
          value: serverName,
        },
      ],
    },
    {
      filePath: `${basePath}/package-lock.json`,
      mapper: [
        {
          token: '<server_name>',
          value: serverName,
        },
      ],
    },
    {
      filePath: `${basePath}/README.md`,
      mapper: [
        {
          token: '<server_name>',
          value: serverName,
        },
        {
          token: '<description>',
          value: description,
        },
      ],
    },
    {
      filePath: `${basePath}/run_container.sh`,
      mapper: [
        {
          token: '<server_image_name>',
          value: serverImageName,
        },
        {
          token: '<server_container_name>',
          value: serverContainerName,
        },
        {
          token: '<server_external_port>',
          value: serverExternalPort.toString(),
        },
        {
          token: '<network_name>',
          value: NetworkName,
        },
      ],
    },
    {
      filePath: `${basePath}/stop_container.sh`,
      mapper: [
        {
          token: '<server_image_name>',
          value: serverImageName,
        },
        {
          token: '<server_container_name>',
          value: serverContainerName,
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
