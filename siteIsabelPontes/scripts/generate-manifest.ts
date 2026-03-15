import { S3Client } from '@aws-sdk/client-s3';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.VITE_R2_PUBLIC_BASE;
const bucket = process.env.CF_BUCKET_NAME;
const accountId = process.env.CF_ACCOUNT_ID;
const accessKeyId = process.env.CF_ACCESS_KEY_ID;
const secretAccessKey = process.env.CF_SECRET_ACCESS_KEY;
const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

interface PhotoEntry {
  key: string;
  url: string;
  tema: string;
  ensaio: string;
  alt: string;
}

async function generate() {
  console.log('Bucket:', bucket);
  console.log('Endpoint:', `https://${accountId}.r2.cloudflarestorage.com`);
  console.log('Public URL:', url);
  const { Contents = [] } = await client.send(
    new ListObjectsCommand({ Bucket: bucket! }),
  );

  console.log(`✓ ${Contents.length} objetos listados do bucket ${bucket}`);

  const photos: PhotoEntry[] = Contents.filter((obj) =>
    obj.Key?.match(/\.(webp|jpg|jpeg|png)$/i),
  ).map((obj) => {
    const key = obj.Key!;
    const parts = key.split('/'); // ["tema", "ensaio", "foto.webp"]
    const tema = parts[0] ?? '';
    const ensaio = parts[1] ?? '';
    const name = parts[2] ?? key;

    return {
      key,
      url: `${url}/${key}`,
      tema,
      ensaio,
      alt: name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    };
  });

  writeFileSync(
    'public/manifest.json',
    JSON.stringify(photos, null, 2),
    'utf-8',
  );

  console.log(`✓ manifest.json gerado com ${photos.length} fotos`);
}

generate().catch(console.error);
