import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Ve cómo funciona
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Descubre lo fácil que es compartir suscripciones y ahorrar dinero con nuestra plataforma.
          </p>
        </div>

        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* Video Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
            {/* Video Placeholder Image */}
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=675&fit=crop&q=80"
              alt="Video preview"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black bg-opacity-30 transition-all duration-300 ${isHovered ? 'bg-opacity-20' : 'bg-opacity-30'}`} />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`flex items-center justify-center w-20 h-20 bg-white bg-opacity-90 rounded-full shadow-xl transform transition-all duration-300 ${isHovered ? 'scale-110 bg-opacity-100' : 'scale-100'} ${isPlaying ? 'scale-95' : ''}`}>
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-[#0A0A0A] ml-0" />
                ) : (
                  <Play className="w-8 h-8 text-[#0A0A0A] ml-1" />
                )}
              </div>
            </div>

            {/* Video Duration Badge */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
              2:34
            </div>

            {/* Loading Ring Animation */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Floating Elements */}
          <div className={`absolute -top-6 -left-6 w-12 h-12 bg-[#059669] bg-opacity-10 rounded-full transform transition-all duration-500 ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100'}`}>
            <div className="w-full h-full bg-[#059669] rounded-full animate-pulse opacity-60"></div>
          </div>
          
          <div className={`absolute -bottom-6 -right-6 w-8 h-8 bg-[#10B981] bg-opacity-20 rounded-full transform transition-all duration-700 ${isHovered ? 'scale-125 translate-y-2' : 'scale-100'}`}>
            <div className="w-full h-full bg-[#10B981] rounded-full animate-bounce opacity-40"></div>
          </div>
        </div>

        {/* Video Stats */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-8 text-sm text-[#4A4A4A]">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#059669] rounded-full mr-2"></div>
              <span>2.1M visualizaciones</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#10B981] rounded-full mr-2"></div>
              <span>98% satisfacción</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;