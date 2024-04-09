import { instance } from "../interceptor";

export async function getPreSignedUrl(fileName: string) {
  const response = await instance.get(`/file/presignedUrl/${fileName}`);
  return response.data as string;
}
