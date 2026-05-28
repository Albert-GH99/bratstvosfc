import { useMemo, useRef, useState } from 'react';
import { ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react';
import {
  deleteTenantImage,
  uploadTenantImage,
  validateImageFile,
} from '@/services/storageService';
import SafeImage from '@/components/common/SafeImage';

function toItems(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function imageUrl(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.publicUrl || item.url || item.image_url || '';
}

function imagePath(item) {
  if (!item || typeof item === 'string') return '';
  return item.path || item.image_path || '';
}

export default function ImageUploader({
  tenantId,
  category = 'misc',
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  label = 'Upload image',
  helperText = 'JPG, PNG or WebP. Maximum 5MB.',
  aspectRatio = '16 / 10',
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const items = useMemo(() => toItems(value), [value]);
  const canAddMore = multiple ? items.length < maxFiles : true;

  const emitChange = nextItems => {
    if (!onChange) return;
    onChange(multiple ? nextItems : (nextItems[0] || null));
  };

  const uploadFiles = async fileList => {
    if (disabled || uploading || !canAddMore) return;

    const files = Array.from(fileList || []).slice(0, multiple ? maxFiles - items.length : 1);
    if (!files.length) return;

    setUploading(true);
    setError('');

    try {
      const uploads = [];
      for (const file of files) {
        const validation = validateImageFile(file, category);
        if (!validation.valid) throw new Error(validation.message);
        uploads.push(await uploadTenantImage({ file, tenantId, category }));
      }

      emitChange(multiple ? [...items, ...uploads].slice(0, maxFiles) : uploads);
    } catch (err) {
      setError(err.message || 'Unable to upload image right now.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeItem = async index => {
    if (disabled || uploading) return;
    setUploading(true);
    setError('');

    try {
      const target = items[index];
      const path = imagePath(target);
      if (path) await deleteTenantImage(path);
      emitChange(items.filter((_, itemIndex) => itemIndex !== index));
    } catch (err) {
      setError(err.message || 'Unable to delete image right now.');
    } finally {
      setUploading(false);
    }
  };

  const uploadArea = (
    <button
      type="button"
      disabled={disabled || uploading || !canAddMore}
      onClick={() => inputRef.current?.click()}
      onDragOver={event => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={event => {
        event.preventDefault();
        setDragging(false);
        uploadFiles(event.dataTransfer.files);
      }}
      className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed p-5 text-center transition disabled:cursor-not-allowed disabled:opacity-55"
      style={{
        minHeight: 150,
        aspectRatio,
        background: dragging ? 'var(--c-primary-soft)' : 'var(--c-input-bg)',
        borderColor: dragging ? 'var(--c-accent)' : 'var(--c-border)',
      }}
    >
      <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'var(--c-surface)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
        {uploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={21} />}
      </span>
      <span className="text-sm font-black" style={{ color: 'var(--c-text)' }}>
        {items.length ? 'Change image' : label}
      </span>
      <span className="mt-1 max-w-xs text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>
        {helperText}
      </span>
    </button>
  );

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        className="hidden"
        onChange={event => uploadFiles(event.target.files)}
      />

      <div className={multiple ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-3'}>
        {items.map((item, index) => {
          const url = imageUrl(item);
          return (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-2xl" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <div className="relative" style={{ aspectRatio }}>
                {url ? (
                  <SafeImage src={url} fallbackType={category === 'products' ? 'product' : category} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ color: 'var(--c-muted)' }}>
                    <ImagePlus size={24} />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-3">
                <span className="min-w-0 truncate text-xs font-bold" style={{ color: 'var(--c-muted)' }}>
                  {item.fileName || item.name || 'Uploaded image'}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={disabled || uploading}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl disabled:opacity-50"
                  style={{ background: 'var(--c-surface)', color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
                  aria-label="Remove image"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}

        {(!items.length || multiple) && canAddMore && uploadArea}
      </div>

      {error && (
        <p className="rounded-xl px-3 py-2 text-xs" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
