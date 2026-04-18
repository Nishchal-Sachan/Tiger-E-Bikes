'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import { uploadImageToCloudinary } from './uploadClient';
import { FEATURE_ICON_OPTIONS } from '@/lib/featureIcons';

export default function FeaturesTab() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    image: '',
    icon: '',
    order: 0,
  });
  const [adding, setAdding] = useState(false);
  const [uploadingNew, setUploadingNew] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [uploadingEdit, setUploadingEdit] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/features', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load features');
      const list = [...(data.features || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      setFeatures(list);
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e) {
    e.preventDefault();
    setAdding(true);
    setMessage(null);
    try {
      const res = await fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: newFeature.title,
          description: newFeature.description,
          image: newFeature.image,
          icon: newFeature.icon,
          order: Number(newFeature.order),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add feature');
      setNewFeature({
        title: '',
        description: '',
        image: '',
        icon: '',
        order: features.length,
      });
      setMessage({ type: 'success', text: 'Feature created.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this feature?')) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/features/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setMessage({ type: 'success', text: 'Feature deleted.' });
      if (editingId === id) {
        setEditingId(null);
        setEditDraft(null);
      }
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  function startEdit(f) {
    setEditingId(f._id);
    setEditDraft({
      title: f.title,
      description: f.description,
      image: f.image,
      icon: f.icon ?? '',
      order: f.order,
    });
  }

  async function saveEdit() {
    if (!editingId || !editDraft) return;
    setSavingEdit(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/features/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: editDraft.title,
          description: editDraft.description,
          image: editDraft.image,
          icon: editDraft.icon,
          order: Number(editDraft.order),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setEditingId(null);
      setEditDraft(null);
      setMessage({ type: 'success', text: 'Feature updated.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleOrderBlur(id, raw) {
    const order = Number(raw);
    if (Number.isNaN(order)) return;
    try {
      const res = await fetch(`/api/features/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ order }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order update failed');
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  function onDragStart(index) {
    setDragIndex(index);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function onDrop(dropIndex) {
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      return;
    }
    const next = [...features];
    const [removed] = next.splice(dragIndex, 1);
    next.splice(dropIndex, 0, removed);
    setDragIndex(null);
    setFeatures(next);

    const updates = next.map((f, i) => ({ id: f._id, order: i }));
    try {
      await Promise.all(
        updates.map((u) =>
          fetch(`/api/features/${u.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ order: u.order }),
          }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Reorder failed');
          })
        )
      );
      setMessage({ type: 'success', text: 'Order updated.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
      await load();
    }
  }

  async function uploadNewImage(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingNew(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setNewFeature((prev) => ({ ...prev, image: url }));
      setMessage({ type: 'success', text: 'Image uploaded.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingNew(false);
    }
  }

  async function uploadEditImage(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingEdit(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setEditDraft((prev) => ({ ...prev, image: url }));
      setMessage({ type: 'success', text: 'Image uploaded.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingEdit(false);
    }
  }

  useEffect(() => {
    setNewFeature((prev) => ({ ...prev, order: features.length }));
  }, [features.length]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading features…
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {message && (
        <div
          role="status"
          className={
            message.type === 'error'
              ? 'rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'
              : 'rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'
          }
        >
          {message.text}
        </div>
      )}

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">Add feature</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Title"
            value={newFeature.title}
            onChange={(v) => setNewFeature((p) => ({ ...p, title: v }))}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-white/80">
              Icon (optional)
            </label>
            <select
              value={newFeature.icon}
              onChange={(e) =>
                setNewFeature((p) => ({ ...p, icon: e.target.value }))
              }
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            >
              <option value="">None</option>
              {FEATURE_ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-white/80">Order</label>
            <input
              type="number"
              value={newFeature.order}
              onChange={(e) =>
                setNewFeature((p) => ({ ...p, order: e.target.value }))
              }
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-white/80">Description</label>
            <textarea
              value={newFeature.description}
              onChange={(e) =>
                setNewFeature((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
              <Upload className="h-4 w-4" />
              {uploadingNew ? 'Uploading…' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingNew}
                onChange={uploadNewImage}
              />
            </label>
            {newFeature.image ? (
              <span className="truncate text-sm text-cyan-400 max-w-md">{newFeature.image}</span>
            ) : (
              <span className="text-sm text-white/40">No image</span>
            )}
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={adding}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
            >
              {adding && <Loader2 className="h-4 w-4 animate-spin" />}
              <Plus className="h-4 w-4" />
              Add feature
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-medium text-white">All features</h2>
        <p className="mb-4 text-sm text-white/50">
          Drag rows to reorder, or edit the order number and blur the field to save.
        </p>
        <ul className="space-y-3">
          {features.map((f, index) => (
            <li
              key={f._id}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(index)}
              className="rounded-xl border border-white/15 bg-white/[0.03] p-4"
            >
              {editingId === f._id && editDraft ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Title"
                      value={editDraft.title}
                      onChange={(v) => setEditDraft((d) => ({ ...d, title: v }))}
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white/80">
                        Icon (optional)
                      </label>
                      <select
                        value={editDraft.icon}
                        onChange={(e) =>
                          setEditDraft((d) => ({ ...d, icon: e.target.value }))
                        }
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                      >
                        <option value="">None</option>
                        {FEATURE_ICON_OPTIONS.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white/80">Order</label>
                      <input
                        type="number"
                        value={editDraft.order}
                        onChange={(e) =>
                          setEditDraft((d) => ({ ...d, order: e.target.value }))
                        }
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-sm font-medium text-white/80">Description</label>
                      <textarea
                        value={editDraft.description}
                        onChange={(e) =>
                          setEditDraft((d) => ({ ...d, description: e.target.value }))
                        }
                        rows={3}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                        <Upload className="h-4 w-4" />
                        {uploadingEdit ? 'Uploading…' : 'Replace image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingEdit}
                          onChange={uploadEditImage}
                        />
                      </label>
                      {editDraft.image && (
                        <span className="truncate text-xs text-cyan-400/90 max-w-sm">{editDraft.image}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={saveEdit}
                      disabled={savingEdit}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
                    >
                      {savingEdit && <Loader2 className="h-4 w-4 animate-spin" />}
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditDraft(null);
                      }}
                      className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-start gap-3">
                  <div
                    className="mt-1 cursor-grab text-white/40 active:cursor-grabbing"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-white">{f.title}</span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                        order:{' '}
                        <input
                          key={`ord-${f._id}-${f.order}`}
                          type="number"
                          defaultValue={f.order}
                          className="w-12 rounded border border-white/20 bg-black/40 px-1 py-0.5 text-xs text-white"
                          onBlur={(e) => handleOrderBlur(f._id, e.target.value)}
                        />
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/60 line-clamp-2">{f.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(f)}
                      className="rounded-lg border border-white/20 p-2 text-white/80 hover:bg-white/10"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(f._id)}
                      className="rounded-lg border border-red-500/40 p-2 text-red-300 hover:bg-red-500/10"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {features.length === 0 && (
          <p className="text-sm text-white/40">No features yet.</p>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-white/80">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
      />
    </div>
  );
}
