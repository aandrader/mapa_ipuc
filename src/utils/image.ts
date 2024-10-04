export function getImgUrl(templeId: string | false) {
  return templeId
    ? "https://" + process.env.NEXT_PUBLIC_MEDIA_URL + "/" + templeId + ".webp"
    : "/logo_ipuc.webp";
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = (event.target as any).result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function resizeImage(file: File, newWidth: number) {
  const img = await loadImage(file);

  // Get original dimensions
  const originalWidth = img.width;
  const originalHeight = img.height;

  if (originalHeight > originalWidth)
    throw new Error("Foto vertical no admitida, tomar una foto horizontal de la fachada del templo.");

  const scaleFactor = newWidth / originalWidth;
  const newHeight = originalHeight * scaleFactor;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = newWidth;
  canvas.height = newHeight;

  if (!ctx) throw new Error("2D context is not supported");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject("Error generando blob");
        return;
      }
      resolve(blob);
    }, "image/webp");
  });
}
