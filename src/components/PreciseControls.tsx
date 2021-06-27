import React from 'react';
import PreciseControlsSliders from './PreciseControlsSliders';
import PreciseControlsActions from './PreciseControlsActions';
import PreciseControlsPreviews from './PreciseControlsPreviews';

function PreciseControls() {
    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400 select-none shadow">
            <PreciseControlsSliders />
            <PreciseControlsActions />
            <PreciseControlsPreviews />
        </div>
    );
}

export default PreciseControls;
