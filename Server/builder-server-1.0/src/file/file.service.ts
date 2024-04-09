import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class FileService {
  async getPreSignedUrl(objectName: string) {
    const bucketName = process.env.BUILDER_BUCKET_NAME;
    const MinioClient = new Client({
      endPoint: process.env.BUILDER_MINIO_ENDPOINT,
      // port: parseInt(process.env.MINIO_PORT),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    try {
      return await MinioClient.presignedPutObject(bucketName, objectName);
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new InternalServerErrorException(
        'Failed to generate pre-signed URL',
      );
    }
  }
}
