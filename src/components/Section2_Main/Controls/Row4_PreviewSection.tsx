import { UISection } from '@/components/UI/UISection';
import { expandPresetsAtom } from '@/store';
import React from 'react'

export function Row4_PreviewSection() {
    return (
        <UISection openAtom={expandPresetsAtom} title={"code"}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem nesciunt molestiae quaerat distinctio iure voluptates fuga itaque modi nostrum quasi qui, voluptatem, dolore nam iusto fugit esse earum et!
            </p>
        </UISection>
    );
}

//TODO: persist expandPresetsAtom
