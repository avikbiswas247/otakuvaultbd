import cloudinary from "@/lib/mediastorage/cloudinary";

export async function uploadMultipleImages(
  files: File[]
) {
  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      return new Promise<{
        url: string;
        publicId: string;
      }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "products",
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }

              resolve({
                url: result!.secure_url,
                publicId: result!.public_id,
              });
            }
          )
          .end(buffer);
      });
    })
  );

  return uploads;
}