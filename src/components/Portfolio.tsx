import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import UploadForm from './UploadForm.tsx';

type Photo = {
  id: number;
  category: string;
  title: string;
  filepath: string;
};

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const categories = [
    { id: 'cross', label: t('portfolio.filter.cross') },
    { id: 'portrait', label: t('portfolio.filter.portrait') },
    { id: 'balkan', label: t('portfolio.filter.balkan') },
    { id: 'luxury', label: t('portfolio.filter.luxury') },
  ];

  const fetchPhotos = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/photos');
      const data = await res.json();
      setPhotos(data || []);
    } catch (err) {
      console.error('Fout bij ophalen van fotos:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Toon alle foto's wanneer geen categorie is geselecteerd
  const displayed = selectedCategory ? photos.filter((p) => p.category === selectedCategory) : photos;

  return (
    <section id="portfolio" className="py-20 bg-automotive-charcoal">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-6">
              {t('portfolio.title')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUpload((s) => !s)}
              className="px-4 py-2 rounded bg-automotive-gold text-automotive-black font-medium"
            >
              {showUpload ? t('portfolio.closeUpload') : t('portfolio.openUpload')}
            </button>
          </div>
        </div>

        {showUpload && (
          <div className="mb-8">
            <UploadForm onUploaded={() => { fetchPhotos(); setShowUpload(false); }} />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-automotive-gold text-automotive-black border-2 border-automotive-gold'
                  : 'bg-automotive-black/50 text-automotive-silver hover:bg-automotive-gold/20 hover:text-automotive-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => setSelectedCategory(null)}
            className="px-6 py-3 rounded-lg font-medium bg-automotive-black/40 text-automotive-silver"
          >
            {t('portfolio.filter.all')}
          </button>
        </div>

        {displayed.length === 0 && (
          <div className="text-center mt-12 text-xl text-automotive-silver">
            {t('portfolio.placeholder')}
          </div>
        )}

        {displayed.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((item, index) => {
              const src = item.filepath && item.filepath.startsWith('http') ? item.filepath : `http://localhost:8080${item.filepath}`;
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl bg-automotive-black animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-w-4 aspect-h-3 w-full">
                    <img
                      src={src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-automotive-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
