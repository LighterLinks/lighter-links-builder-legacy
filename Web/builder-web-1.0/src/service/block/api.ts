import { instance } from "../interceptor";
import { Block } from "./interface";

export async function getBlock(blockId: string) {
  const result = await instance.get(`/block/info/${blockId}`);
  return result.data as Block;
}

export async function getBlocksByApplicationIdAndVersion({
  applicationId,
  version,
}: {
  applicationId: string;
  version: string;
}) {
  const result = await instance.get(`/block/app/${applicationId}/v/${version}`);
  return result.data as Block[];
}

export async function createBlock({
  applicationId,
  blockData,
}: {
  applicationId: string;
  blockData: Block;
}) {
  const result = await instance.post("/block", {
    applicationId,
    blockData,
  });
  return result.data as Block;
}

export async function updateBlockDescription({
  blockId,
  description,
}: {
  blockId: string;
  description: string;
}) {
  const result = await instance.post(`/block/${blockId}/description`, {
    description,
  });
  return result.data as Block;
}

export async function updateBlockIsActive({
  blockId,
  isActive,
}: {
  blockId: string;
  isActive: boolean;
}) {
  const result = await instance.post(`/block/${blockId}/isActive`, {
    isActive,
  });
  return result.data as Block;
}

export async function updateBlockConfig({
  blockId,
  config,
}: {
  blockId: string;
  config: object;
}) {
  const result = await instance.post(`/block/${blockId}/config`, {
    config,
  });
  return result.data as Block;
}

export async function deleteBlock(blockId: string) {
  const result = await instance.post(`/block/${blockId}/delete`, {});
  return result.data as Block;
}
