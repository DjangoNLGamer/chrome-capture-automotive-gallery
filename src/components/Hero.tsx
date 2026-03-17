import { useEffect, useState, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  const texts = useMemo(() => [
    t('hero.subtitle1'), 
    t('hero.subtitle2'), 
    t('hero.subtitle3'), 
    t('hero.subtitle4')
  ], [t]);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setIndex(0);
    setSubIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    if (!texts || texts.length === 0 || !texts[index]) return;
    const currentText = texts[index];
    const textLength = currentText.length;

    if (subIndex === textLength + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentText.slice(0, subIndex));
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, texts]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 professional-gradient">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Gold ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-gold-dark/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <Camera className="mx-auto mb-6 text-gold" size={64} />

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient">EXOTIC</span>
            <br />
            <span className="gold-gradient">AUTOMOTIVE</span>
          </h1>

          {/* Typer Effect */}
          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {text}
              <span className="text-gold animate-pulse">|</span>
            </p>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#portfolio"
              className="btn-gold px-8 py-4 rounded-lg text-primary-foreground"
            >
              {t('hero.viewPortfolio')}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('hero.bookShoot')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
