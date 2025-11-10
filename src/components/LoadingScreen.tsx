
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient tracking-tight">
            EXOTIC
          </h1>
          <h1 className="font-display text-5xl md:text-7xl font-bold gold-gradient tracking-tight">
            AUTOMOTIVE
          </h1>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-80 max-w-[90vw] mx-auto space-y-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold-gradient rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Text */}
          <p className="text-muted-foreground text-sm font-medium tracking-wider">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
