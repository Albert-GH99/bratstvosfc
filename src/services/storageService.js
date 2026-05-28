import { requireSupabase } from '@/lib/supabase';

export const TENANT_ASSETS_BUCKET = 'tenant-assets';

export const IMAGE_CATEGORIES = [
  'logo',
  'banner',
  'products',
  'menu',
  'trips',
  'services',
  'gallery',
  'staff',
  'proof',
  'misc',
];

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

export function sanitizeFilename(filename = 'image') {
  const cleanName = String(filename)
    .trim()
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  return cleanName || 'image';
}

function fileExtension(file) {
  const fromName = String(file?.name || '').split('.').pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;

  const fallback = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  return fallback[file?.type] || 'jpg';
}

function normalizeCategory(category = 'misc') {
  return IMAGE_CATEGORIES.includes(category) ? category : 'misc';
}

export function validateImageFile(file, category = 'misc') {
  if (!file) {
    return { valid: false, message: 'Choose an image to upload.' };
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { valid: false, message: 'Image format must be JPG, PNG or WebP.' };
  }

  if (file.size > DEFAULT_MAX_SIZE) {
    return { valid: false, message: 'Image size must be 5MB or less.' };
  }

  return { valid: true, message: '' };
}

export function getPublicImageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const db = requireSupabase();
  const { data } = db.storage.from(TENANT_ASSETS_BUCKET).getPublicUrl(path);
  return data?.publicUrl || '';
}

export async function uploadTenantImage({ file, tenantId, category = 'misc' }) {
  if (!tenantId) throw new Error('tenantId is required for image upload.');

  const cleanCategory = normalizeCategory(category);
  const validation = validateImageFile(file, cleanCategory);
  if (!validation.valid) throw new Error(validation.message);

  const db = requireSupabase();
  const extension = fileExtension(file);
  const safeName = `${sanitizeFilename(file.name)}.${extension}`;
  const uniqueName = `${Date.now()}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}-${safeName}`;
  const path = `${tenantId}/${cleanCategory}/${uniqueName}`;

  const { error } = await db.storage
    .from(TENANT_ASSETS_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message || 'Unable to upload image. Please try again.');
  }

  return {
    path,
    url: getPublicImageUrl(path),
    publicUrl: getPublicImageUrl(path),
    fileName: safeName,
    size: file.size,
    mimeType: file.type,
  };
}

export async function deleteTenantImage(pathOrOptions) {
  const path = typeof pathOrOptions === 'string' ? pathOrOptions : pathOrOptions?.path;
  if (!path) return { success: true };

  const db = requireSupabase();
  const { error } = await db.storage.from(TENANT_ASSETS_BUCKET).remove([path]);

  if (error) {
    throw new Error(error.message || 'Unable to delete image.');
  }

  return { success: true };
}
