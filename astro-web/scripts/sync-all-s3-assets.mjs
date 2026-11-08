import { S3Client, PutObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3 = new S3Client({
  endpoint: 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || 'nak_live_b98701166c724a16b7c2ad38eb9c1e26',
    secretAccessKey: process.env.MINIO_SECRET_KEY || 'nsk_live_bca0d25c1b4e4458994820674c80b9ffa8e559d0ec2657a76504c8e5cf80591f',
  },
  forcePathStyle: true,
});

const BUCKET = 'gvf-website';

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.webp') return 'image/webp';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.mp4') return 'video/mp4';
  return 'application/octet-stream';
}

async function uploadFile(localPath, s3Key) {
  const fileBuffer = fs.readFileSync(localPath);
  const contentType = getContentType(localPath);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
  console.log(`[UPLOADED] ${s3Key} (${contentType}, ${fileBuffer.length} bytes)`);
}

async function main() {
  const baseFiks = path.resolve(__dirname, '../bahan-konten/bahan konten fiks');
  const publicDir = path.resolve(__dirname, '../public');

  console.log('Uploading essential Zakat beras images...');
  await uploadFile(
    path.join(baseFiks, 'beras-zakat-fitrah-mustahik.webp'),
    'gvf/assets/bahan-konten/beras-zakat-fitrah-mustahik.webp'
  );
  await uploadFile(
    path.join(baseFiks, 'tangan-beras-zakat-pangan.webp'),
    'gvf/assets/bahan-konten/tangan-beras-zakat-pangan.webp'
  );

  console.log('\nUploading masjid dan kelas real images...');
  const masjidDir = path.join(baseFiks, 'masjid dan kelas');
  const masjidFiles = [
    { src: 'sayuran-kangkung.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/sayuran-kangkung.jpeg' },
    { src: 'lahan-kebun.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/lahan-kebun.jpeg' },
    { src: 'kandang-ayam-petelur.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/kandang-ayam-petelur.jpeg' },
    { src: 'tangga-kelas-ke-lt2.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/tangga-kelas-ke-lt2.jpeg' },
    { src: 'mezanine-belum-jadi.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/mezanine-belum-jadi.jpeg' },
    { src: 'pondasi-kelas-lt2.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/pondasi-kelas-lt2.jpeg' },
    { src: 'masjid-tampak-dalam.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam.jpeg' },
    { src: 'masjid-lantai-2-belum-jadi.jpeg', dest: 'gvf/assets/bahan-konten/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg' },
  ];
  for (const item of masjidFiles) {
    const p = path.join(masjidDir, item.src);
    if (fs.existsSync(p)) {
      await uploadFile(p, item.dest);
    }
  }

  console.log('\nUploading asrama putra baru real images...');
  const asramaDir = path.join(baseFiks, 'asrama putra baru');
  const asramaFiles = [
    { src: 'pembangunan-asrama-ikhwan-baru.jpeg', dest: 'gvf/assets/bahan-konten/asrama-putra-baru/pembangunan-asrama-ikhwan-baru.jpeg' },
    { src: 'dalam-asrama-ikhwan-baru.jpeg', dest: 'gvf/assets/bahan-konten/asrama-putra-baru/dalam-asrama-ikhwan-baru.jpeg' },
    { src: 'tampak-depan-asrama-ikhwan-baru.jpeg', dest: 'gvf/assets/bahan-konten/asrama-putra-baru/tampak-depan-asrama-ikhwan-baru.jpeg' },
    { src: 'tampak-samping-asrama-ikhwan-baru.jpeg', dest: 'gvf/assets/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru.jpeg' },
    { src: 'tangga-asrama-ikhwan-baru.jpeg', dest: 'gvf/assets/bahan-konten/asrama-putra-baru/tangga-asrama-ikhwan-baru.jpeg' },
  ];
  for (const item of asramaFiles) {
    const p = path.join(asramaDir, item.src);
    if (fs.existsSync(p)) {
      await uploadFile(p, item.dest);
    }
  }

  console.log('\nUploading design masjid images...');
  const designDir = path.join(baseFiks, 'Design Masjid');
  const designFiles = [
    { src: 'interior-masjid.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/interior-masjid.jpg' },
    { src: 'interior-mesjid-2.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/interior-mesjid-2.jpg' },
    { src: 'learning-studio-workshop.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/learning-studio-workshop.jpg' },
    { src: 'skywalk-learning-room.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/skywalk-learning-room.jpg' },
    { src: 'skywalk-learning-room-2.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/skywalk-learning-room-2.jpg' },
    { src: 'panel-surya.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/panel-surya.jpg' },
    { src: 'tempat-wudu.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/tempat-wudu.jpg' },
    { src: 'belakang masjid.jpg', dest: 'gvf/assets/bahan-konten/design-masjid/belakang-masjid.jpg' },
  ];
  for (const item of designFiles) {
    const p = path.join(designDir, item.src);
    if (fs.existsSync(p)) {
      await uploadFile(p, item.dest);
    }
  }

  console.log('\nUploading aliases and fallback paths...');
  // Drone lahan in fasilitas-dan-infrastruktur AND bahan-konten root
  const droneLahanFiks = path.join(baseFiks, 'fasilitas-dan-infrastruktur/drone-lahan-dan-pemukiman.webp');
  if (fs.existsSync(droneLahanFiks)) {
    await uploadFile(droneLahanFiks, 'gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-dan-pemukiman.webp');
    await uploadFile(droneLahanFiks, 'gvf/assets/bahan-konten/drone-lahan-dan-pemukiman.webp');
  }

  // Drone perkebunan in fasilitas-dan-infrastruktur AND bahan-konten root
  const droneKebunFiks = path.join(baseFiks, 'fasilitas-dan-infrastruktur/drone-lahan-perkebunan.webp');
  if (fs.existsSync(droneKebunFiks)) {
    await uploadFile(droneKebunFiks, 'gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-perkebunan.webp');
    await uploadFile(droneKebunFiks, 'gvf/assets/bahan-konten/drone-lahan-perkebunan.webp');
  }

  // Halaqah santri melingkar alias in kegiatan-dan-prestasi-santri
  const halaqahFiks = path.join(baseFiks, 'kegiatan-dan-prestasi-santri/halaqah-santri-melingkar.webp');
  if (fs.existsSync(halaqahFiks)) {
    await uploadFile(halaqahFiks, 'gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/halaqah-santri-melingkar.webp');
    await uploadFile(halaqahFiks, 'gvf/assets/bahan-konten/halaqah-santri-melingkar.webp');
  }

  // Aliases in media-lp: masjid-tampak-dalam-konstruksi.webp and lorong-asrama-bata-merah.webp
  const masjidKonstruksiLocal = path.join(publicDir, 'media-lp/masjid-tampak-dalam-konstruksi.webp');
  if (fs.existsSync(masjidKonstruksiLocal)) {
    await uploadFile(masjidKonstruksiLocal, 'gvf/assets/media-lp/masjid-tampak-dalam-konstruksi.webp');
  }
  const lorongLocal = path.join(publicDir, 'media-lp/lorong-asrama-bata-merah.webp');
  if (fs.existsSync(lorongLocal)) {
    await uploadFile(lorongLocal, 'gvf/assets/media-lp/lorong-asrama-bata-merah.webp');
  }

  console.log('\nAll sync tasks completed successfully!');
}

main().catch(console.error);
