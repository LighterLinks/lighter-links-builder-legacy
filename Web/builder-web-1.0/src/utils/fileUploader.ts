import { getPreSignedUrl } from "@/service/file/api";

export async function uploadFileAndGetUrl(file: File) {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_ENDPOINT;
  const fileName = `${Date.now()}-${file.name}`;
  const presignedUrl = await getPreSignedUrl(fileName);
  await fetch(presignedUrl, {
    method: "PUT",
    body: file,
  });
  return `https://${storageUrl}/${fileName}`;
}
