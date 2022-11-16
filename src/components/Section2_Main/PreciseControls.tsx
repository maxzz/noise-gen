import React from 'react';
import { PreciseControlsSliders } from './PreciseControlsSliders';
import { PreciseControlsActions } from './PreciseControlsActions';
import { Previews } from './Previews';

export function PreciseControls() {
    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400 select-none shadow">
            <PreciseControlsSliders />
            <PreciseControlsActions />
            <Previews />
        </div>
    );
}
