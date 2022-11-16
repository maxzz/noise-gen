import React from 'react';
import { Row2_Sliders } from './Row2_Sliders';
import { Row3_Actions } from './Row3_Actions';
import { Row4_Previews } from './Row4_Previews';

export function Row2_All() {
    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400 select-none shadow">
            <Row2_Sliders />
            <Row3_Actions />
            <Row4_Previews />
        </div>
    );
}
