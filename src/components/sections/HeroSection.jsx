import { useTranslation } from 'react-i18next';

/**
 * HeroSection - Landing/Hero Section Component
 * 
 * Modern redesign with:
 * - Multilingual support (ID/EN)
 * - Enhanced animations and gradients
 * - Responsive design for all screen sizes
 */

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Fixed Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-1000"
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
      ></div>
      
      {/* Enhanced Gradient Overlay with Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 animate-fade-in"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
        <div className="text-center max-w-6xl mx-auto space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 text-sm font-medium">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            September 9-11, 2025
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-200 font-light max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
