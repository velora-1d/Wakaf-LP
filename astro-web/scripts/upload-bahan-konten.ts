import * as Minio from 'minio';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endPoint = 's3.skillage-mart.com';
const accessKey = process.env.MINIO_ACCESS_KEY || '0jo4Ax9bq7Aemvz9bS54';
const secretKey = process.env.MINIO_SECRET_KEY || 'kTePwW5Xm5AVNyOgxkPcC5eo7WGaN1oKSZWoBtQ6';
const bucketName = process.env.MINIO_BUCKET || 'skillage-website';
const publicBaseUrl = process.env.MINIO_PUBLIC_URL || 'https://s3.skillage-mart.com/skillage-website';

const client = new Minio.Client({
  endPoint,
  port: 443,
  useSSL: true,
  accessKey,
  secretKey,
  pathStyle: true,
});

async function main() {
  const baseDir = path.resolve(__dirname, '../bahan-konten');
  console.log('Reading files from:', baseDir);

  function getFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getFiles(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith('.webp') || entry.name.endsWith('.mp4'))) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const files = getFiles(baseDir);
  console.log(`Found ${files.length} WebP files to upload.`);

  for (const filePath of files) {
    const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
    const destKey = `gvf/assets/bahan-konten/${relPath}`;
    const fileBuffer = fs.readFileSync(filePath);

    await client.putObject(bucketName, destKey, fileBuffer, fileBuffer.length, {
      'Content-Type': 'image/webp',
    });

    const publicUrl = `${publicBaseUrl}/${destKey}`;
    console.log(`[UPLOADED] ${relPath} -> ${publicUrl}`);
  }

  console.log('\nAll WebP files successfully uploaded to MinIO S3!');
}

main().catch((err) => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});
