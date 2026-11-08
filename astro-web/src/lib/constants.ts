// src/lib/constants.ts
// Global Neon S3 Bucket Asset URL for Global Village Fund (GVF)

export const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

export function s3Asset(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${S3_BASE}${cleanPath}`;
}
