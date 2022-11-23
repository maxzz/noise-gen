import React from 'react'
import { expandPresetsAtom } from '@/store';
import { UISection } from '@/components/UI/UISection';
import { Row4_Previews } from './Row4_Previews';

export function Row4_PreviewSection() {
    return (
        <UISection openAtom={expandPresetsAtom} title={"Presets"}>
            <Row4_Previews />
        </UISection>
    );
}

//TODO: persist expandPresetsAtom
