import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { serverConfig } from '../../interface';
import { sampleServerConfig } from '../../sampleConfig';
import { Neo4jQueryBuilder } from 'src/core/database/queryBuilder';

const toInitialCap = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const controllerTemplate = `
@<method>('<endpoint><querys_endpoint>')
async <service_function>(
    <controller_args>
): Promise<<return_type>> {
    return this.<module_type>Service.<service_function>(<service_args>);
}
`;

const serviceReadTemplate = `
async <service_function>(
    <service_args>
): Promise<<return_type>> {
  const result = await this.neo4jService.read(
    '<query>',
    { <query_args> }
  );
  return result.records.map((record) => record.get('n').properties)[0] as <return_type>;
}
`;

const serviceWriteTemplate = `
async <service_function>(
    <service_args>
): Promise<<return_type>> {
  const result = await this.neo4jService.write(
    '<query>'
  );
  return result.records.map((record) => record.get('n').properties)[0] as <return_type>;
}
`;

export function generateServer(config: serverConfig) {
  const templatePath = 'src/core/server/template/nest/server';
  execSync(
    `cp -r ${templatePath} src/core/server/template/nest/${config.name}`,
  );

  const newAppModulePath = `src/core/server/template/nest/${config.name}/src/app.module.ts`;
  const moduleImportsToken = '<module_imports>';
  const modulesToken = '<modules>';

  const appModuleContent = readFileSync(newAppModulePath, 'utf-8');
  const moduleImports = config.modules
    .map(
      (module) =>
        `import { ${toInitialCap(module.name)}Module } from './${module.name}/${module.name}.module';`,
    )
    .join('\n');
  const modules = config.modules
    .map((module) => `${toInitialCap(module.name)}Module`)
    .join(', ');

  const newAppModuleContent = appModuleContent
    .replace(moduleImportsToken, moduleImports)
    .replace(modulesToken, modules);

  writeFileSync(newAppModulePath, newAppModuleContent, 'utf-8');
}

export function generateModule(config: serverConfig) {
  const basePath = `src/core/server/template/nest/${config.name}/src`;

  for (const module of config.modules) {
    const templatePath = `${basePath}/template-${module.databaseType}`;
    const newModulePath = `${basePath}/${module.name}`;
    const newModuleModulePath = `${basePath}/${module.name}/${module.name}.module.ts`;
    const newModuleControllerPath = `${basePath}/${module.name}/${module.name}.controller.ts`;
    const newModuleServicePath = `${basePath}/${module.name}/${module.name}.service.ts`;
    const newModuleInterfacePath = `${basePath}/${module.name}/${module.name}.interface.ts`;

    execSync(`cp -r ${templatePath} ${newModulePath}`);
    execSync(`mv ${newModulePath}/template.module.ts ${newModuleModulePath}`);
    execSync(
      `mv ${newModulePath}/template.controller.ts ${newModuleControllerPath}`,
    );
    execSync(`mv ${newModulePath}/template.service.ts ${newModuleServicePath}`);
    execSync(
      `mv ${newModulePath}/template.interface.ts ${newModuleInterfacePath}`,
    );

    const moduleModuleContent = readFileSync(newModuleModulePath, 'utf-8');
    const moduleControllerContent = readFileSync(
      newModuleControllerPath,
      'utf-8',
    );
    const moduleServiceContent = readFileSync(newModuleServicePath, 'utf-8');
    const moduleInterfaceContent = readFileSync(
      newModuleInterfacePath,
      'utf-8',
    );

    const newModuleModuleContent = moduleModuleContent
      .replace(/template/g, module.name)
      .replace(/Template/g, toInitialCap(module.name));
    const newModuleControllerContent = moduleControllerContent
      .replace(/template/g, module.name)
      .replace(/Template/g, toInitialCap(module.name));
    const newModuleServiceContent = moduleServiceContent
      .replace(/template/g, module.name)
      .replace(/Template/g, toInitialCap(module.name));
    const newModuleInterfaceContent = moduleInterfaceContent
      .replace(/template/g, module.name)
      .replace(/Template/g, toInitialCap(module.name));

    writeFileSync(newModuleModulePath, newModuleModuleContent, 'utf-8');
    writeFileSync(newModuleControllerPath, newModuleControllerContent, 'utf-8');
    writeFileSync(newModuleServicePath, newModuleServiceContent, 'utf-8');
    writeFileSync(newModuleInterfacePath, newModuleInterfaceContent, 'utf-8');
  }

  // delete template folder
  execSync(`rm -r ${basePath}/template-*`);
}

export function generateInterface(config: serverConfig) {
  for (const module of config.modules) {
    const interfaceContent = `
export interface ${toInitialCap(module.name)} {
  ${module.interfaces.map((i) => `${i.attribute}: ${i.type.JS};`).join('\n  ')}
}
`;
    const interfacePath = `src/core/server/template/nest/${config.name}/src/${module.name}/${module.name}.interface.ts`;
    writeFileSync(interfacePath, interfaceContent, 'utf-8');
  }
}

export function generateControllerFunctions(config: serverConfig) {
  for (const route of config.routes) {
    let controller_args = route.bodyType.map(
      (arg) => `@Body('${arg.attribute}') ${arg.attribute}: ${arg.type.JS}`,
    );
    controller_args = controller_args.concat(
      route.queryParams.map(
        (arg) => `@Param('${arg.attribute}') ${arg.attribute}: ${arg.type.JS}`,
      ),
    );
    const service_args = route.serviceFunctionParams.map(
      (arg) => arg.attribute,
    );
    const querys_endpoint = route.queryParams.length
      ? `/:${route.queryParams.map((arg) => arg.attribute).join('/:')}`
      : '';
    const newControllerFunction = controllerTemplate
      .replace(/<method>/g, route.method)
      .replace(/<endpoint>/g, route.endpoint)
      .replace(/<querys_endpoint>/g, querys_endpoint)
      .replace(/<service_function>/g, route.serviceFunction)
      .replace(/<return_type>/g, route.returnType)
      .replace(/<controller_args>/g, controller_args.join(', '))
      .replace(/<module_type>/g, route.moduleType)
      .replace(/<service_args>/g, service_args.join(', '));

    const controllerPath = `src/core/server/template/nest/${config.name}/src/${route.moduleType}/${route.moduleType}.controller.ts`;
    const controllerContent = readFileSync(controllerPath, 'utf-8');
    const newControllerContent = controllerContent.replace(
      /\/\/ <controller_functions>/g,
      newControllerFunction + '\n// <controller_functions>',
    );
    writeFileSync(controllerPath, newControllerContent, 'utf-8');
  }
}

export function generateServiceFunctions(config: serverConfig) {
  for (const route of config.routes) {
    const templateForUse =
      route.method === 'Get' ? serviceReadTemplate : serviceWriteTemplate;
    const service_args = route.serviceFunctionParams.map(
      (arg) => `${arg.attribute}: ${arg.type.JS}`,
    );

    const queryBuilder = new Neo4jQueryBuilder();
    if (route.method === 'Get') {
      queryBuilder.matchNode({
        label: toInitialCap(route.moduleType),
        properties: route.queryParams.reduce((acc, arg) => {
          acc[arg.attribute] = `$${arg.attribute}`;
          return acc;
        }, {}),
        variable: 'n',
      });
    } else if (route.method === 'Post') {
      queryBuilder.createNode({
        label: toInitialCap(route.moduleType),
        properties: route.bodyType.reduce((acc, arg) => {
          acc[arg.attribute] = `$${arg.attribute}`;
          return acc;
        }, {}),
        variable: 'n',
      });
    } else if (route.method === 'Patch') {
      queryBuilder.matchNode({
        label: toInitialCap(route.moduleType),
        properties: route.queryParams.reduce((acc, arg) => {
          acc[arg.attribute] = `$${arg.attribute}`;
          return acc;
        }, {}),
        variable: 'n',
      });
      queryBuilder.updateNode({
        label: toInitialCap(route.moduleType),
        variable: 'n',
        properties: route.bodyType.reduce((acc, arg) => {
          acc[arg.attribute] = `$${arg.attribute}`;
          return acc;
        }, {}),
      });
    } else if (route.method === 'Delete') {
      queryBuilder.matchNode({
        label: toInitialCap(route.moduleType),
        properties: route.queryParams.reduce((acc, arg) => {
          acc[arg.attribute] = `$${arg.attribute}`;
          return acc;
        }, {}),
        variable: 'n',
      });
      queryBuilder.deleteNode({ variable: 'n' });
    }
    queryBuilder.returnNode({ variable: 'n' });

    const query = queryBuilder.getQuery();

    const query_args = route.serviceFunctionParams
      .map((arg) => `${arg.attribute}: ${arg.attribute}`)
      .join(', ');

    const newServiceFunction = templateForUse
      .replace(/<service_function>/g, route.serviceFunction)
      .replace(/<service_args>/g, service_args.join(', '))
      .replace(/<query>/g, query)
      .replace(/<query_args>/g, query_args)
      .replace(/<return_type>/g, route.returnType);

    // write to file
    const servicePath = `src/core/server/template/nest/${config.name}/src/${route.moduleType}/${route.moduleType}.service.ts`;
    const serviceContent = readFileSync(servicePath, 'utf-8');
    const newServiceContent = serviceContent.replace(
      /\/\/ <service_functions>/g,
      newServiceFunction + '\n// <service_functions>',
    );
    writeFileSync(servicePath, newServiceContent, 'utf-8');
  }
}

export function generatorNest() {
  generateServer(sampleServerConfig);
  generateModule(sampleServerConfig);
  generateInterface(sampleServerConfig);
  generateControllerFunctions(sampleServerConfig);
  generateServiceFunctions(sampleServerConfig);
}
