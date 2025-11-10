import { useState } from 'react';

type Props = {
  onUploaded?: () => void;
};

const UploadForm = ({ onUploaded }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('cross');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError('Kies eerst een bestand');

    const form = new FormData();
    form.append('image', file);
    form.append('title', title || file.name);
    form.append('category', category);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Upload mislukt');
      }

      setFile(null);
      setTitle('');
      if (onUploaded) onUploaded();
    } catch (err: any) {
      setError(err.message || 'Fout bij upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-automotive-black/50 p-6 rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Titel</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-automotive-black/30" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Categorie</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded bg-automotive-black/30">
          <option value="cross">Cross</option>
          <option value="portrait">Portrait</option>
          <option value="balkan">Balkan</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="flex gap-4">
        <button disabled={loading} className="px-4 py-2 bg-automotive-gold text-automotive-black rounded">
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
