import React, { useState, useRef } from 'react';

const ImageGallery = ({ images = [], productName, selectedImage: externalSelectedImage, onImageClick }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScale, setModalScale] = useState(1);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
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
    if (window.innerWidth >= 1024) { // Only on desktop
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setZoomStyle({ transformOrigin: `${x}% ${y}%` });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalScale(1);
    setModalPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalScale(1);
    setModalPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const zoomIn = () => {
    setModalScale(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setModalScale(prev => Math.max(prev - 0.25, 1));
    if (modalScale <= 1.25) {
      setModalPosition({ x: 0, y: 0 });
    }
  };

  const resetZoom = () => {
    setModalScale(1);
    setModalPosition({ x: 0, y: 0 });
  };

  // Modal touch handlers
  const handleModalTouchStart = (e) => {
    if (e.touches.length === 1 && modalScale > 1) {
      const touch = e.touches[0];
      setLastTouch({ x: touch.clientX, y: touch.clientY });
      setIsDragging(true);
    }
  };

  const handleModalTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging && modalScale > 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      
      setModalPosition(prev => ({
        x: Math.max(-300, Math.min(300, prev.x + deltaX)),
        y: Math.max(-300, Math.min(300, prev.y + deltaY))
      }));
      
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleModalTouchEnd = () => {
    setIsDragging(false);
  };

  // Modal mouse handlers for desktop
  const handleModalMouseDown = (e) => {
    if (modalScale > 1) {
      setIsDragging(true);
      setLastTouch({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleModalMouseMove = (e) => {
    if (isDragging && modalScale > 1) {
      const deltaX = e.clientX - lastTouch.x;
      const deltaY = e.clientY - lastTouch.y;
      
      setModalPosition(prev => ({
        x: Math.max(-300, Math.min(300, prev.x + deltaX)),
        y: Math.max(-300, Math.min(300, prev.y + deltaY))
      }));
      
      setLastTouch({ x: e.clientX, y: e.clientY });
    }
  };

  const handleModalMouseUp = () => {
    setIsDragging(false);
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

  const nextModalImage = () => {
    const newIndex = (selectedImage + 1) % imageList.length;
    setSelectedImage(newIndex);
    resetZoom();
    if (onImageClick) onImageClick(imageList[newIndex]);
  };

  const prevModalImage = () => {
    const newIndex = (selectedImage - 1 + imageList.length) % imageList.length;
    setSelectedImage(newIndex);
    resetZoom();
    if (onImageClick) onImageClick(imageList[newIndex]);
  };

  return (
    <>
      <div className="w-full lg:w-3/5">
        <div
          className="bg-stone-100 rounded-sm overflow-hidden aspect-[4/3] mb-3 sm:mb-4 relative group cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomStyle({ transformOrigin: 'center' })}
        >
          <img
            src={imageList[selectedImage]}
            alt={`${productName} main view`}
            className="w-full h-full object-cover transition-transform duration-200 lg:hover:scale-[1.8]"
            style={zoomStyle}
          />
          
          {/* Zoom Button */}
          <button
            onClick={openModal}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all z-10 group/zoom"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="absolute -bottom-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/zoom:opacity-100 transition-opacity whitespace-nowrap">
              View larger
            </span>
          </button>
          
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
                className="absolute right-4 bottom-1/2 translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
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

      {/* Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <button
                onClick={zoomIn}
                disabled={modalScale >= 3}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={zoomOut}
                disabled={modalScale <= 1}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                </svg>
              </button>
              <button
                onClick={resetZoom}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Navigation Arrows */}
            {imageList.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                <button
                  onClick={prevModalImage}
                  className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextModalImage}
                  className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Image Container */}
            <div 
              className={`relative max-w-full max-h-full overflow-hidden select-none ${
                modalScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
              onTouchStart={handleModalTouchStart}
              onTouchMove={handleModalTouchMove}
              onTouchEnd={handleModalTouchEnd}
              onMouseDown={handleModalMouseDown}
              onMouseMove={handleModalMouseMove}
              onMouseUp={handleModalMouseUp}
              onMouseLeave={handleModalMouseUp}
            >
              <img
                src={imageList[selectedImage]}
                alt={`${productName} zoomed view`}
                className="max-w-none max-h-none transition-transform duration-300"
                style={{
                  transform: `scale(${modalScale}) translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                  maxWidth: modalScale === 1 ? '90vw' : 'none',
                  maxHeight: modalScale === 1 ? '90vh' : 'none'
                }}
                draggable={false}
              />
            </div>

            {/* Image Counter */}
            {imageList.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} / {imageList.length}
              </div>
            )}

            {/* Zoom Level Indicator */}
            {modalScale > 1 && (
              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {Math.round(modalScale * 100)}% - Drag to pan
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
