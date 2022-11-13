import React from 'react';
import { AppBackground } from './components/UI/AppBackground';
import { Section1_Header } from './components/Section1_Header';
import { Section2_Main } from './components/Section2_Main';
import './App.scss';

export function App() {
    return (
        <AppBackground>
            <Section1_Header />
            <Section2_Main />
        </AppBackground>
    );
}
