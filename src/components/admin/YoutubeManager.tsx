'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { YoutubeVideo } from '@prisma/client';
import { getYoutubeThumbnail, extractYoutubeId } from '@/lib/utils';

interface Props { initialVideos: YoutubeVideo[] }

export default function YoutubeManager({ initialVideos }: Props) {
  const [videos,  setVideos]  = useState(initialVideos);
  const [form,    setForm]    = useState({ title: '', description: '', youtubeId: '' });
  const [editId,  setEditId]  = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState('');

  const notify  = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };
  const refresh = async () => { const r = await fetch('/api/admin/youtube'); setVideos(await r.json()); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id = extractYoutubeId(form.youtubeId);
    if (!id) { notify('URL YouTube invalide'); setLoading(false); return; }
    const url = editId ? `/api/admin/youtube/${editId}` : '/api/admin/youtube';
    await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, youtubeId: id }),
    });
    setForm({ title: '', description: '', youtubeId: '' });
    setEditId(null);
    await refresh();
    notify(editId ? 'Vidéo mise à jour.' : 'Vidéo ajoutée.');
    setLoading(false);
  };

  const handleEdit = (v: YoutubeVideo) => {
    setEditId(v.id);
    setForm({ title: v.title, description: v.description ?? '', youtubeId: v.youtubeId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette vidéo ?')) return;
    await fetch(`/api/admin/youtube/${id}`, { method: 'DELETE' });
    await refresh();
    notify('Vidéo supprimée.');
  };

  const handleReorder = async (id: string, dir: 'up' | 'down') => {
    await fetch(`/api/admin/youtube/${id}/reorder`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction: dir }),
    });
    await refresh();
  };

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface border border-border p-6 mb-6 space-y-4">
        <h2 className="section-label mb-4">{editId ? 'MODIFIER LA VIDÉO' : 'AJOUTER UNE VIDÉO'}</h2>

        <div>
          <label className="timecode block mb-2">TITRE *</label>
          <input required className="admin-input" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Titre de la vidéo" />
        </div>
        <div>
          <label className="timecode block mb-2">URL OU ID YOUTUBE *</label>
          <input required className="admin-input" value={form.youtubeId}
            onChange={e => setForm(f => ({ ...f, youtubeId: e.target.value }))}
            placeholder="https://youtube.com/watch?v=... ou dQw4w9WgXcQ" />
        </div>
        <div>
          <label className="timecode block mb-2">DESCRIPTION</label>
          <textarea className="admin-input resize-none" rows={2} value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Description courte (optionnel)" />
        </div>

        <div className="flex gap-3 items-center pt-2">
          <button type="submit" disabled={loading} className="btn-signal disabled:opacity-40">
            <span>{loading ? 'CHARGEMENT...' : editId ? 'METTRE À JOUR' : 'AJOUTER'}</span>
          </button>
          {editId && (
            <button type="button"
              onClick={() => { setEditId(null); setForm({ title: '', description: '', youtubeId: '' }); }}
              className="timecode opacity-40 hover:opacity-100 hover:text-red transition-all">
              ANNULER
            </button>
          )}
        </div>
        {msg && <p className="timecode text-red text-[11px]">{msg}</p>}
      </form>

      {/* List */}
      <div className="space-y-px">
        {videos.length === 0 && (
          <div className="border border-border py-12 text-center">
            <p className="timecode opacity-30">Aucune vidéo — ajoutez-en une ci-dessus.</p>
          </div>
        )}
        {videos.map((video, idx) => (
          <div key={video.id} className="bg-surface border border-border p-3 flex items-center gap-4 hover:border-red/30 transition-colors">
            <Image src={getYoutubeThumbnail(video.youtubeId)} alt={video.title}
              width={80} height={45} className="object-cover flex-shrink-0 border border-border" />

            <div className="flex-1 min-w-0">
              <p className="text-sm text-cream font-medium truncate">{video.title}</p>
              <p className="timecode text-[9px] opacity-40 truncate mt-0.5">{video.youtubeId}</p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => handleReorder(video.id, 'up')} disabled={idx === 0}
                className="timecode px-2 py-1 hover:text-red disabled:opacity-20 transition-colors">↑</button>
              <button onClick={() => handleReorder(video.id, 'down')} disabled={idx === videos.length - 1}
                className="timecode px-2 py-1 hover:text-red disabled:opacity-20 transition-colors">↓</button>
              <button onClick={() => handleEdit(video)}
                className="timecode px-3 py-1 hover:text-red transition-colors opacity-50 hover:opacity-100">ÉDITER</button>
              <button onClick={() => handleDelete(video.id)}
                className="timecode px-3 py-1 hover:text-red transition-colors opacity-30 hover:opacity-100">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
