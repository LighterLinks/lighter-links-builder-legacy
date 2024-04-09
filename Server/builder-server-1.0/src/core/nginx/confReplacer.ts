import { readFileSync, writeFileSync } from 'fs';

const domain_token = '<domain_name>';
const port_token = '<port>';
const block_name_token = '<block_name>';

const templateConfPath = `./src/core/nginx/temp.conf`;

function replaceToken({
  str,
  token,
  value,
}: {
  str: string;
  token: string;
  value: string;
}) {
  return str.replace(new RegExp(token, 'g'), value);
}

function readConfFile(path: string) {
  return readFileSync(path).toString();
}

function writeConfFile({ path, data }: { path: string; data: string }) {
  const originalData = readConfFile(path);
  const newData = originalData + data;
  return writeFileSync(path, newData);
}

function generateConfFile({
  domainName,
  port,
  blockName,
}: {
  domainName: string;
  port: string;
  blockName: string;
}) {
  const conf = readConfFile(templateConfPath);
  const conf1 = replaceToken({
    str: conf,
    token: block_name_token,
    value: blockName,
  });
  const conf2 = replaceToken({
    str: conf1,
    token: domain_token,
    value: domainName,
  });
  const finalConf = replaceToken({
    str: conf2,
    token: port_token,
    value: port,
  });
  return finalConf;
}

export function generateNginxConfFile({
  isAppDNS,
  blockName,
  dnsRecord,
  port,
}: {
  isAppDNS: boolean;
  blockName: string;
  dnsRecord: string;
  port: string;
}) {
  const HOST_NGINX_CONF_DIR = process.env.HOST_NGINX_CONF_DIR;

  const DOMAIN_NAME = isAppDNS
    ? process.env.APP_DOMAIN_2
    : process.env.APP_DOMAIN_1;

  const CONF_FILE_NAME = isAppDNS
    ? process.env.APP_CONF_FILE
    : process.env.API_CONF_FILE;

  const data = generateConfFile({
    domainName: `${dnsRecord}.${DOMAIN_NAME}`,
    port,
    blockName: blockName,
  });

  if (!data) {
    return false;
  }
  writeConfFile({
    path: `${HOST_NGINX_CONF_DIR}/${CONF_FILE_NAME}`,
    data,
  });
  return true;
}
