import { execSync } from 'child_process';
import { replacerNest } from './server/template/nest/replacer';
import { generateNginxConfFile } from './nginx/confReplacer';
import { replacerNeo4j } from './database/template/neo4j/replacer';
import { generatorNest } from './server/template/nest/generator';

export async function generateApplicationBaseDirectory({
  appName,
  version,
}: {
  appName: string;
  version: string;
}) {
  const HOST_APP_PATH = process.env.BUILDER_APP_DIR;
  const basePath = `${HOST_APP_PATH}/${appName}/${version}`;

  try {
    execSync(
      `mkdir -p ${basePath}/Server ${basePath}/Web ${basePath}/Database ${basePath}/Storage ${basePath}/Mobile ${basePath}/Desktop`,
    );
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeApplicationBaseDirectory({
  appName,
  version,
}: {
  appName: string;
  version: string;
}) {
  const HOST_APP_PATH = process.env.BUILDER_APP_DIR;
  const basePath = `${HOST_APP_PATH}/${appName}/${version}`;

  try {
    execSync(`rm -rf ${basePath}`);
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeApplicationBaseDirectoryAll({
  appName,
}: {
  appName: string;
}) {
  const HOST_APP_PATH = process.env.BUILDER_APP_DIR;
  const basePath = `${HOST_APP_PATH}/${appName}`;

  try {
    execSync(`rm -rf ${basePath}`);
    return true;
  } catch (e) {
    return false;
  }
}

export async function generateApplicationNetwork({
  appName,
  version,
}: {
  appName: string;
  version: string;
}) {
  try {
    execSync(`docker network create ${appName}-${version}-network`);
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeApplicationNetwork({
  appName,
  version,
}: {
  appName: string;
  version: string;
}) {
  try {
    execSync(`docker network rm ${appName}-${version}-network`);
    return true;
  } catch (e) {
    return false;
  }
}

export async function restartNginx() {
  execSync('systemctl restart nginx');
}

export async function generateAssets({
  appName,
  version,
}: {
  appName: string;
  version: string;
}) {
  replacerNeo4j({
    appName: appName,
    version: version,
    databaseName: `${appName}-database`,
    databaseVolName: `${appName}-database-vol`,
    databaseVolLogsName: `${appName}-database-vol-logs`,
    databaseContainerName: `${appName}-database-container`,
    networkName: `${appName}-${version}-network`,
    databaseExternalPort: 7476,
    databaseExternalPortBolt: 7689,
    databaseAuthID: 'mydbidyeye',
    databaseAuthPassword: 'paaasssswwooorrddd',
  });

  generatorNest();
  replacerNest({
    appName: appName,
    version: version,
    serverName: `${appName}-server`,
    description: 'API Server',
    serverImageName: `${appName}-server-image`,
    serverContainerName: `${appName}-server-container`,
    serverExternalPort: 3000,
    NetworkName: `${appName}-${version}-network`,
  });
}
