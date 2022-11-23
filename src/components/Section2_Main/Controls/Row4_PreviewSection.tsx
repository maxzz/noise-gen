import React from 'react'
import { openPresetsAtom } from '@/store';
import { UISection } from '@/components/UI/UISection';
import { Row4_Previews } from './Row4_Previews';

export function Row4_PreviewSection() {
    return (
        <UISection openAtom={openPresetsAtom} title={"Presets"}>
            <Row4_Previews />
        </UISection>
    );
}

//TODO: persist expandPresetsAtom
