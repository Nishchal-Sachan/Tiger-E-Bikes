/**
 * Upload an image file to Cloudinary via POST /api/upload.
 * @param {File} file
 * @returns {Promise<string>} secure_url
 */
export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Upload failed');
  }
  return data.secure_url;
}
