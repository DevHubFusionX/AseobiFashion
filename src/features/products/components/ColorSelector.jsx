import React from 'react';

const ColorSelector = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-black/70">Select Color</span>
        <span className="text-xs sm:text-sm font-medium text-black/50">
          {colors.find(c => c.hex === selectedColor)?.name}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {colors.map(color => (
          <button
            key={color.hex}
            onClick={() => onColorChange(color.hex)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
              selectedColor === color.hex 
                ? 'border-brand-gold scale-110 shadow-lg' 
                : 'border-transparent hover:border-black/20 hover:scale-105'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            <div className="w-full h-full rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-black/10"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
