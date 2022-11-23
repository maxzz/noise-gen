import { UISection } from '@/components/UI/UISection';
import { expandPresetsAtom } from '@/store';
import React from 'react'
import { Row4_Previews } from './Row4_Previews';

export function Row4_PreviewSection() {
    return (
        <UISection openAtom={expandPresetsAtom} title={"code"}>
            <Row4_Previews />
        </UISection>
    );
}

//TODO: persist expandPresetsAtom
