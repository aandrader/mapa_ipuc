"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(id: string, formData: any) {
  const image = formData.get("file") as File;

  const buffer = await image.arrayBuffer();
  const webpImage = await sharp(buffer).webp().toBuffer();

  const params = {
    Bucket: process.env.BUCKET_NAME!,
    Key: id + ".webp",
    Body: webpImage,
  };

  await s3Client.send(new PutObjectCommand(params));
}
