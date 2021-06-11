import React from 'react';

function ColorBgPicker() {
    return (
        <div className="w-8 h-8 border border-gray-500 rounded">
            <div className="p-1 h-full flex items-center justify-between">
                <div className="w-1.5 h-1/2 bg-white"></div>
                <div className="w-1.5 h-1/2 bg-black"></div>
                <div className="w-1.5 h-1/2 border border-gray-500"></div>
            </div>
        </div>
    );
}

export default ColorBgPicker;
