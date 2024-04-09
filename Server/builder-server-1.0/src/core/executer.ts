import { execSync } from 'child_process';
import { Block } from 'src/block/block.interface';

export type blockAction = 'run' | 'stop' | 'createDatabase' | 'deleteDatabase';

export function executeBlock({
  block,
  appName,
  type,
}: {
  block: Block;
  appName: string;
  type: blockAction;
}) {
  const basePath = `${process.env.BUILDER_APP_DIR}/${appName}/${block.version}/${block.type}/${block.name}`;
  switch (type) {
    case 'run':
      execSync(`sh ${basePath}/run_container.sh`);
      break;
    case 'stop':
      execSync(`sh ${basePath}/stop_container.sh`);
      break;
    case 'createDatabase':
      execSync(`sh ${basePath}/create_volumes.sh`);
      break;
    case 'deleteDatabase':
      execSync(`sh ${basePath}/delete_volumes.sh`);
      break;
  }
}
