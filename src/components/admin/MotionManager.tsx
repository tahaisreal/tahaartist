'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { MotionDesign } from '@prisma/client';

interface Props { initialMotions: MotionDesign[] }

export default function MotionManager({ initialMotions }: Props) {
  const [motions,        setMotions]        = useState(initialMotions);
  const [form,           setForm]           = useState({ title: '', description: '' });
  const [file,           setFile]           = useState<File | null>(null);
  const [editId,         setEditId]         = useState<string | null>(null);
  const [loading,        setLoading]        = useState(false);
  const [msg,            setMsg]            = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const notify  = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 4000); };
  const refresh = async () => { const r = await fetch('/api/admin/motion'); setMotions(await r.json()); };

  const onDrop = useCallback((accepted: File[]) => { if (accepted[0]) setFile(accepted[0]); }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/mp4': ['.mp4'], 'video/quicktime': ['.mov'] },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId && !file) { notify('Sélectionnez un fichier vidéo.'); return; }
    setLoading(true);
    setUploadProgress(0);

    if (file) {
      const fd  = new FormData();
      fd.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
      };
      const uploadResult = await new Promise<{ filename: string; thumbnail?: string }>((resolve, reject) => {
        xhr.onload  = () => xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject(new Error('Upload failed'));
        xhr.onerror = reject;
        xhr.open('POST', '/api/admin/upload');
        xhr.send(fd);
      });
      const url = editId ? `/api/admin/motion/${editId}` : '/api/admin/motion';
      await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...uploadResult }),
      });
    } else if (editId) {
      await fetch(`/api/admin/motion/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ title: '', description: '' });
    setFile(null); setEditId(null); setUploadProgress(0);
    await refresh();
    notify(editId ? 'Motion mis à jour.' : 'Motion ajouté.');
    setLoading(false);
  };

  const handleEdit   = (m: MotionDesign) => {
    setEditId(m.id);
    setForm({ title: m.title, description: m.description ?? '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleDelete = async (id: string, filename: string) => {
    if (!confirm('Supprimer ce motion ? Le fichier sera effacé.')) return;
    await fetch(`/api/admin/motion/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename }) });
    await refresh(); notify('Motion supprimé.');
  };
  const handleReorder = async (id: string, dir: 'up' | 'down') => {
    await fetch(`/api/admin/motion/${id}/reorder`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ direction: dir }) });
    await refresh();
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface border border-border p-6 mb-6 space-y-4">
        <h2 className="section-label mb-4">{editId ? 'MODIFIER LE MOTION' : 'AJOUTER UN MOTION'}</h2>

        <div>
          <label className="timecode block mb-2">TITRE *</label>
          <input required className="admin-input" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Titre du motion design" />
        </div>
        <div>
          <label className="timecode block mb-2">DESCRIPTION</label>
          <textarea className="admin-input resize-none" rows={2} value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Description courte (optionnel)" />
        </div>

        {/* Dropzone */}
        <div>
          <label className="timecode block mb-2">
            FICHIER VIDÉO {!editId && '*'} — MP4 / MOV · MAX 500MB
          </label>
          <div {...getRootProps()}
            className={`border-2 border-dashed p-10 text-center transition-colors ${
              isDragActive ? 'border-red bg-red/5' : 'border-border hover:border-dim'
            }`}
            style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            {file ? (
              <div>
                <p className="text-sm text-red font-mono">{file.name}</p>
                <p className="timecode opacity-40 mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            ) : isDragActive ? (
              <p className="timecode text-red">DÉPOSEZ ICI...</p>
            ) : (
              <div>
                <p className="timecode opacity-50">Glissez un fichier MP4 / MOV</p>
                <p className="timecode opacity-30 mt-1 text-[9px]">ou cliquez pour sélectionner</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {loading && uploadProgress > 0 && (
          <div className="h-px bg-border overflow-hidden">
            <div className="h-full bg-red transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}

        <div className="flex gap-3 items-center pt-2">
          <button type="submit" disabled={loading} className="btn-signal disabled:opacity-40">
            <span>{loading ? `UPLOAD ${uploadProgress}%` : editId ? 'METTRE À JOUR' : 'AJOUTER'}</span>
          </button>
          {editId && (
            <button type="button"
              onClick={() => { setEditId(null); setForm({ title: '', description: '' }); setFile(null); }}
              className="timecode opacity-40 hover:opacity-100 hover:text-red transition-all">
              ANNULER
            </button>
          )}
        </div>
        {msg && <p className="timecode text-red text-[11px]">{msg}</p>}
      </form>

      {/* List */}
      <div className="space-y-px">
        {motions.length === 0 && (
          <div className="border border-border py-12 text-center">
            <p className="timecode opacity-30">Aucun motion design — ajoutez-en un ci-dessus.</p>
          </div>
        )}
        {motions.map((m, idx) => (
          <div key={m.id} className="bg-surface border border-border p-3 flex items-center gap-4 hover:border-red/30 transition-colors">
            <div className="w-20 h-12 bg-bg flex-shrink-0 flex items-center justify-center border border-border overflow-hidden">
              {m.thumbnail
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={`/uploads/${m.thumbnail}`} alt="" className="w-full h-full object-cover" />
                : <span className="timecode text-[9px] opacity-30">MP4</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-cream font-medium truncate">{m.title}</p>
              <p className="timecode text-[9px] opacity-40 truncate mt-0.5">{m.filename}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => handleReorder(m.id, 'up')} disabled={idx === 0}
                className="timecode px-2 py-1 hover:text-red disabled:opacity-20 transition-colors">↑</button>
              <button onClick={() => handleReorder(m.id, 'down')} disabled={idx === motions.length - 1}
                className="timecode px-2 py-1 hover:text-red disabled:opacity-20 transition-colors">↓</button>
              <button onClick={() => handleEdit(m)}
                className="timecode px-3 py-1 hover:text-red transition-colors opacity-50 hover:opacity-100">ÉDITER</button>
              <button onClick={() => handleDelete(m.id, m.filename)}
                className="timecode px-3 py-1 hover:text-red transition-colors opacity-30 hover:opacity-100">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
