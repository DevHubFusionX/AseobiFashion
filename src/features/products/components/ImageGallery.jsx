import React, { useState } from 'react';

const ImageGallery = ({ images = [], productName, selectedImage: externalSelectedImage, onImageClick }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });
  const imageList = images.length > 0 ? images : ['/Hero-background.jpeg'];

  React.useEffect(() => {
    if (externalSelectedImage) {
      const index = imageList.indexOf(externalSelectedImage);
      if (index !== -1) {
        setSelectedImage(index);
      }
    }
  }, [externalSelectedImage, imageList]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const nextImage = () => {
    const newIndex = (selectedImage + 1) % imageList.length;
    setSelectedImage(newIndex);
    if (onImageClick) onImageClick(imageList[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (selectedImage - 1 + imageList.length) % imageList.length;
    setSelectedImage(newIndex);
    if (onImageClick) onImageClick(imageList[newIndex]);
  };

  const handleThumbnailClick = (idx) => {
    setSelectedImage(idx);
    if (onImageClick) onImageClick(imageList[idx]);
  };

  return (
    <div className="w-full lg:w-3/5">
      <div
        className="bg-stone-100 rounded-sm overflow-hidden aspect-[4/3] mb-3 sm:mb-4 relative cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle({ transformOrigin: 'center' })}
      >
        <img
          src={imageList[selectedImage]}
          alt={`${productName} main view`}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.8]"
          style={zoomStyle}
        />
        
        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === idx ? 'bg-brand-gold w-6' : 'bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {imageList.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {imageList.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`bg-stone-100 rounded-sm overflow-hidden aspect-square cursor-pointer border-2 transition-all ${
                selectedImage === idx ? 'border-brand-gold' : 'border-transparent hover:border-black/20'
              }`}
            >
              <img
                src={img}
                alt={`${productName} view ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
