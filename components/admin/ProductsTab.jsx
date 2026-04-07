'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { uploadImageToCloudinary } from './uploadClient';

const CATEGORIES = ['scooter', 'motorcycle'];

const emptyProduct = {
  name: '',
  category: 'scooter',
  image: '',
  power: '',
  topSpeed: '',
  range: '',
  isFeatured: false,
};

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [newProduct, setNewProduct] = useState(emptyProduct);
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
      const res = await fetch('/api/products', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load products');
      setProducts(data.products || []);
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
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          image: newProduct.image,
          power: newProduct.power,
          topSpeed: newProduct.topSpeed,
          range: newProduct.range,
          isFeatured: newProduct.isFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add product');
      setNewProduct(emptyProduct);
      setMessage({ type: 'success', text: 'Product created.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setMessage({ type: 'success', text: 'Product deleted.' });
      if (editingId === id) {
        setEditingId(null);
        setEditDraft(null);
      }
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  function startEdit(p) {
    setEditingId(p._id);
    setEditDraft({
      name: p.name,
      category: p.category,
      image: p.image,
      power: p.power,
      topSpeed: p.topSpeed,
      range: p.range,
      isFeatured: !!p.isFeatured,
    });
  }

  async function saveEdit() {
    if (!editingId || !editDraft) return;
    setSavingEdit(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editDraft.name,
          category: editDraft.category,
          image: editDraft.image,
          power: editDraft.power,
          topSpeed: editDraft.topSpeed,
          range: editDraft.range,
          isFeatured: editDraft.isFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setEditingId(null);
      setEditDraft(null);
      setMessage({ type: 'success', text: 'Product updated.' });
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSavingEdit(false);
    }
  }

  async function uploadNewImage(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingNew(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setNewProduct((prev) => ({ ...prev, image: url }));
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

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading products…
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
        <h2 className="mb-4 text-lg font-medium text-white">Add product</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            value={newProduct.name}
            onChange={(v) => setNewProduct((p) => ({ ...p, name: v }))}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-white/80">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, category: e.target.value }))
              }
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Power"
            value={newProduct.power}
            onChange={(v) => setNewProduct((p) => ({ ...p, power: v }))}
          />
          <Field
            label="Top speed"
            value={newProduct.topSpeed}
            onChange={(v) => setNewProduct((p) => ({ ...p, topSpeed: v }))}
          />
          <Field
            label="Range"
            value={newProduct.range}
            onChange={(v) => setNewProduct((p) => ({ ...p, range: v }))}
            className="sm:col-span-2"
          />
          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={newProduct.isFeatured}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, isFeatured: e.target.checked }))
              }
              className="rounded border-white/30 bg-white/5"
            />
            <span className="text-sm text-white/80">Featured</span>
          </label>
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
            {newProduct.image ? (
              <span className="truncate text-sm text-cyan-400 max-w-md">{newProduct.image}</span>
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
              Add product
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-white">All products</h2>
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p._id}
              className="rounded-xl border border-white/15 bg-white/[0.03] p-4"
            >
              {editingId === p._id && editDraft ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={editDraft.name}
                      onChange={(v) => setEditDraft((d) => ({ ...d, name: v }))}
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white/80">Category</label>
                      <select
                        value={editDraft.category}
                        onChange={(e) =>
                          setEditDraft((d) => ({ ...d, category: e.target.value }))
                        }
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} className="bg-zinc-900">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Field
                      label="Power"
                      value={editDraft.power}
                      onChange={(v) => setEditDraft((d) => ({ ...d, power: v }))}
                    />
                    <Field
                      label="Top speed"
                      value={editDraft.topSpeed}
                      onChange={(v) =>
                        setEditDraft((d) => ({ ...d, topSpeed: v }))
                      }
                    />
                    <Field
                      label="Range"
                      value={editDraft.range}
                      onChange={(v) => setEditDraft((d) => ({ ...d, range: v }))}
                      className="sm:col-span-2"
                    />
                    <label className="flex items-center gap-2 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={editDraft.isFeatured}
                        onChange={(e) =>
                          setEditDraft((d) => ({
                            ...d,
                            isFeatured: e.target.checked,
                          }))
                        }
                        className="rounded border-white/30 bg-white/5"
                      />
                      <span className="text-sm text-white/80">Featured</span>
                    </label>
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
                <div className="flex flex-wrap items-start gap-4">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-lg object-cover bg-white/10"
                    />
                  ) : (
                    <div className="h-16 w-24 shrink-0 rounded-lg bg-white/10" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-white">{p.name}</span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-xs capitalize text-white/70">
                        {p.category}
                      </span>
                      {p.isFeatured && (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-200">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-white/50">
                      {p.power} · {p.topSpeed} · {p.range}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="rounded-lg border border-white/20 p-2 text-white/80 hover:bg-white/10"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p._id)}
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
        {products.length === 0 && (
          <p className="text-sm text-white/40">No products yet.</p>
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
