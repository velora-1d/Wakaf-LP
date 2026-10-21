// src/lib/storage.ts
import * as Minio from 'minio';
import { Buffer } from 'node:buffer';
import process from 'node:process';

const rawEndpoint = process.env.MINIO_ENDPOINT || 'https://s3.skillage-mart.com';
const endPoint = rawEndpoint
  .replace(/^https?:\/\//, '')
  .replace(/\/.*$/, '')
  .trim();

const accessKey = process.env.MINIO_ACCESS_KEY || '0jo4Ax9bq7Aemvz9bS54';
const secretKey = process.env.MINIO_SECRET_KEY || 'kTePwW5Xm5AVNyOgxkPcC5eo7WGaN1oKSZWoBtQ6';
const bucketName = process.env.MINIO_BUCKET || 'skillage-website';
const useSSL = process.env.MINIO_USE_SSL !== 'false';
const publicBaseUrl = process.env.MINIO_PUBLIC_URL || `https://${endPoint}/${bucketName}`;
const pathStyle = process.env.MINIO_USE_PATH_STYLE_ENDPOINT === 'true';

export const minioClient = new Minio.Client({
  endPoint,
  port: useSSL ? 443 : 80,
  useSSL,
  accessKey,
  secretKey,
  pathStyle,
});

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

/**
 * Uploads a file buffer directly to MinIO / S3 bucket
 */
export async function uploadFileToMinio(
  fileBuffer: Buffer | Uint8Array,
  originalFilename: string,
  contentType: string,
  folder = 'kabar'
): Promise<UploadResult> {
  try {
    // Bersihkan nama file dan buat nama unik
    const ext = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanBase = originalFilename
      .substring(0, originalFilename.lastIndexOf('.') !== -1 ? originalFilename.lastIndexOf('.') : originalFilename.length)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const uniqueKey = `${folder}/${Date.now()}-${cleanBase}.${ext}`;

    const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);

    await minioClient.putObject(bucketName, uniqueKey, buffer, buffer.length, {
      'Content-Type': contentType,
    });

    // Bangun URL Publik
    const trimmedBase = publicBaseUrl.replace(/\/+$/, '');
    const publicUrl = `${trimmedBase}/${uniqueKey}`;

    return {
      success: true,
      url: publicUrl,
      key: uniqueKey,
    };
  } catch (err: any) {
    console.error('[MinIO Storage] Error uploading file:', err);
    return {
      success: false,
      error: err.message || 'Gagal mengunggah berkas ke penyimpanan MinIO',
    };
  }
}
